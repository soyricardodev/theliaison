
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE SCHEMA IF NOT EXISTS "stripe";

ALTER SCHEMA "stripe" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "hypopg" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "index_advisor" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";

CREATE TYPE "public"."app_permission" AS ENUM (
    'gifts.delete',
    'gifts.edit'
);

ALTER TYPE "public"."app_permission" OWNER TO "postgres";

CREATE TYPE "public"."app_role" AS ENUM (
    'admin'
);

ALTER TYPE "public"."app_role" OWNER TO "postgres";

CREATE TYPE "public"."gender" AS ENUM (
    'female',
    'male',
    'other'
);

ALTER TYPE "public"."gender" OWNER TO "postgres";

CREATE TYPE "public"."gift_payment_status" AS ENUM (
    'pending',
    'paid',
    'failed'
);

ALTER TYPE "public"."gift_payment_status" OWNER TO "postgres";

CREATE TYPE "public"."gift_status" AS ENUM (
    'awaiting_recipient_confirmation',
    'awaiting_invoice_payment',
    'preparing_gift',
    'shipped',
    'delivered',
    'cancelled'
);

ALTER TYPE "public"."gift_status" OWNER TO "postgres";

CREATE TYPE "public"."marital_status" AS ENUM (
    'single',
    'married',
    'divorced',
    'widowed',
    'separated',
    'loving relationship'
);

ALTER TYPE "public"."marital_status" OWNER TO "postgres";

CREATE TYPE "public"."pricing_plan_interval" AS ENUM (
    'day',
    'week',
    'month',
    'year'
);

ALTER TYPE "public"."pricing_plan_interval" OWNER TO "postgres";

CREATE TYPE "public"."pricing_type" AS ENUM (
    'one_time',
    'recurring'
);

ALTER TYPE "public"."pricing_type" OWNER TO "postgres";

CREATE TYPE "public"."product_type" AS ENUM (
    'gift',
    'subscription'
);

ALTER TYPE "public"."product_type" OWNER TO "postgres";

CREATE TYPE "public"."subscription_status" AS ENUM (
    'trialing',
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid',
    'paused'
);

ALTER TYPE "public"."subscription_status" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") RETURNS boolean
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  bind_permissions int;
  user_role public.app_role;
begin
  -- Fetch user role once and store it to reduce number of calls
  select (auth.jwt() ->> 'user_role')::public.app_role into user_role;

  select count(*)
  into bind_permissions
  from public.role_permissions
  where role_permissions.permission = requested_permission
    and role_permissions.role = user_role;

  return bind_permissions > 0;
end;
$$;

ALTER FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."custom_access_token_hook"("event" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    AS $$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Fetch the user role in the user_roles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;

ALTER FUNCTION "public"."custom_access_token_hook"("event" "jsonb") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."downvote_comment"("p_comment_id" integer) RETURNS TABLE("downvotes" integer)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE comments
    SET downvotes = downvotes + 1
    WHERE id = p_comment_id
    RETURNING downvotes;
END;
$$;

ALTER FUNCTION "public"."downvote_comment"("p_comment_id" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_poll"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$declare
  subscription subscriptions%ROWTYPE;
  can_make_polls int;
begin
  select *
  into subscription
  from subscriptions
  where user_id = auth.uid();

  if (subscription is null or subscription.status != 'active') then
    raise exception 'user is not suscribed';
  end if;

  select can_make_poll
  into can_make_polls
  from rules
  where rules.product_id = (
    select prices.product_id
    from prices
    where prices.id = subscription.price_id
  );

  if (can_make_polls = 0) then
    raise exception 'This User can not make polls';
  end if; 

  return new;
end;$$;

ALTER FUNCTION "public"."handle_new_poll"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_subscription_action"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$declare
  subscription subscriptions%ROWTYPE;
begin
  select *
  into subscription
  from subscriptions
  where user_id = auth.uid();

  if (subscription is null or subscription.status != 'active') then
    raise exception 'user is not suscribed';
  end if; 

  return new;
end;$$;

ALTER FUNCTION "public"."handle_subscription_action"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."prevent_duplicated_votes"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  IF EXISTS (
    SELECT * FROM votes
        WHERE user_id = NEW.user_id AND poll_id = NEW.poll_id
    ) THEN
        RAISE EXCEPTION 'Ya existe un voto para esta opción en esta encuesta';
    ELSE
        RETURN NEW;
    END IF;
END;$$;

ALTER FUNCTION "public"."prevent_duplicated_votes"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."search_gifts"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) RETURNS TABLE("id" "text", "name" "text", "description" "text", "image" "text", "similarity" double precision, "unit_amount" double precision)
    LANGUAGE "plpgsql"
    AS $$ 
begin 
    return query 
    WITH ranked_products AS (
        SELECT
            p.id,
            p.name,
            p.description,
            p.image,
            p.embedding, 
            1 - (p.embedding <=> query_embedding) AS similarity
        FROM products p
    )
    SELECT
        rp.id,
        rp.name,
        rp.description,
        rp.image,
        rp.similarity,
        pr.unit_amount::float -- Cast unit_amount to float
    FROM ranked_products rp
    INNER JOIN prices pr ON rp.id = pr.product_id
    where 1 - (rp.embedding <=> query_embedding) > similarity_threshold
    order by rp.embedding <=> query_embedding
    limit match_count; 
end; 
$$;

ALTER FUNCTION "public"."search_gifts"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."search_polls"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) RETURNS TABLE("id" "text", "question" "text", "image" "text", "similarity" double precision)
    LANGUAGE "plpgsql"
    AS $$
begin
  return query
  select
    polls.id,
    polls.question,
    polls.image,
    1 - (polls.embedding <=> query_embedding) as similarity
  from polls
  where 1 - (polls.embedding <=> query_embedding) > similarity_threshold
  order by polls.embedding <=> query_embedding
  limit match_count;
end;
$$;

ALTER FUNCTION "public"."search_polls"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."upvote_comment"("p_comment_id" integer) RETURNS TABLE("upvotes" integer)
    LANGUAGE "plpgsql"
    AS $$ BEGIN UPDATE comments SET upvotes = comments.upvotes + 1 WHERE id = p_comment_id RETURNING comments.upvotes; RETURN QUERY SELECT comments.upvotes FROM comments WHERE id = p_comment_id; END; $$;

ALTER FUNCTION "public"."upvote_comment"("p_comment_id" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."categories" OWNER TO "postgres";

ALTER TABLE "public"."categories" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."comments" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "poll_id" "text" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "parent_comment_id" integer,
    "upvotes" numeric DEFAULT '0'::numeric NOT NULL,
    "downvotes" numeric DEFAULT '0'::numeric NOT NULL
);

ALTER TABLE "public"."comments" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."comments_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."comments_id_seq" OWNED BY "public"."comments"."id";

CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "stripe_customer_id" "text"
);

ALTER TABLE "public"."customers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."documents" (
    "id" bigint NOT NULL,
    "content" "text" NOT NULL,
    "embedding" "public"."vector"(1536) NOT NULL
);

ALTER TABLE "public"."documents" OWNER TO "postgres";

ALTER TABLE "public"."documents" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."documents_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."follows" (
    "id" bigint NOT NULL,
    "follower_id" "uuid" NOT NULL,
    "following_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."follows" OWNER TO "postgres";

ALTER TABLE "public"."follows" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."follows_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."gift_payments" (
    "id" bigint NOT NULL,
    "gift_id" bigint,
    "delivery_fee" double precision,
    "service_fee" numeric,
    "total_price" numeric,
    "invoice_link" "text",
    "payment_status" "public"."gift_payment_status" DEFAULT 'pending'::"public"."gift_payment_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."gift_payments" OWNER TO "postgres";

ALTER TABLE "public"."gift_payments" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."gift_payments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."gift_recipient_addresses" (
    "id" bigint NOT NULL,
    "recipient_id" "uuid" NOT NULL,
    "address_line_1" "text" NOT NULL,
    "city" "text",
    "appartment" "text",
    "postal_code" "text",
    "country" "text" DEFAULT 'US'::"text" NOT NULL,
    "is_private" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "address_line_2" "text"
);

ALTER TABLE "public"."gift_recipient_addresses" OWNER TO "postgres";

ALTER TABLE "public"."gift_recipient_addresses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."gift_recipient_addresses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."gift_recipient_contacts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recipient_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "social_media_platform" character varying,
    "social_media_handle" character varying,
    "phone_number" character varying,
    "email" character varying,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."gift_recipient_contacts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."gift_recipients" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying NOT NULL,
    "provided_contact" boolean DEFAULT false NOT NULL,
    "knows_address" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."gift_recipients" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."gifts" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "recipient_id" "uuid" NOT NULL,
    "status" "public"."gift_status" DEFAULT 'awaiting_recipient_confirmation'::"public"."gift_status" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "gift_link" "text",
    "gift_link_specifications" "text"
);

ALTER TABLE "public"."gifts" OWNER TO "postgres";

ALTER TABLE "public"."gifts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."gifts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."gifts_products" (
    "id" bigint NOT NULL,
    "product_id" "text" NOT NULL,
    "quantity" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "gift_id" bigint NOT NULL
);

ALTER TABLE "public"."gifts_products" OWNER TO "postgres";

ALTER TABLE "public"."gifts_products" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."gifts_products_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."number_test" (
    "id" bigint NOT NULL,
    "int8" bigint,
    "float8" double precision,
    "numeric" numeric
);

ALTER TABLE "public"."number_test" OWNER TO "postgres";

ALTER TABLE "public"."number_test" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."number_test_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."options" (
    "id" integer NOT NULL,
    "text" "text" NOT NULL,
    "poll_id" "text" NOT NULL
);

ALTER TABLE "public"."options" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."options_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."options_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."options_id_seq" OWNED BY "public"."options"."id";

CREATE TABLE IF NOT EXISTS "public"."polls" (
    "id" "text" NOT NULL,
    "question" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "image" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "embedding" "public"."vector"(1536),
    "is_featured" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."polls" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."polls_categories" (
    "poll_id" "text" NOT NULL,
    "categorie_id" bigint NOT NULL
);

ALTER TABLE "public"."polls_categories" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."prices" (
    "id" "text" NOT NULL,
    "product_id" "text",
    "active" boolean,
    "description" "text",
    "unit_amount" bigint,
    "currency" "text",
    "type" "public"."pricing_type",
    "interval" "public"."pricing_plan_interval",
    "interval_count" integer,
    "trial_period_days" integer,
    "metadata" "jsonb",
    CONSTRAINT "prices_currency_check" CHECK (("char_length"("currency") = 3))
);

ALTER TABLE "public"."prices" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "text" NOT NULL,
    "active" boolean,
    "name" "text",
    "description" "text",
    "image" "text",
    "metadata" "jsonb",
    "type" "public"."product_type" DEFAULT 'gift'::"public"."product_type" NOT NULL,
    "embedding" "public"."vector"
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."role_permissions" (
    "id" bigint NOT NULL,
    "role" "public"."app_role" NOT NULL,
    "permission" "public"."app_permission" NOT NULL
);

ALTER TABLE "public"."role_permissions" OWNER TO "postgres";

COMMENT ON TABLE "public"."role_permissions" IS 'Application permissions for each role.';

ALTER TABLE "public"."role_permissions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."role_permissions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."rules" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "product_id" "text" NOT NULL,
    "can_make_poll" smallint NOT NULL
);

ALTER TABLE "public"."rules" OWNER TO "postgres";

ALTER TABLE "public"."rules" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."rules_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "status" "public"."subscription_status",
    "metadata" "jsonb",
    "price_id" "text",
    "quantity" integer,
    "cancel_at_period_end" boolean,
    "created" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "current_period_start" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "current_period_end" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "ended_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "cancel_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "canceled_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "trial_start" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()),
    "trial_end" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"())
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_roles" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role" "public"."app_role" NOT NULL
);

ALTER TABLE "public"."user_roles" OWNER TO "postgres";

COMMENT ON TABLE "public"."user_roles" IS 'Application roles for each user.';

ALTER TABLE "public"."user_roles" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."user_roles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text" NOT NULL,
    "full_name" "text" NOT NULL,
    "avatar_url" "text",
    "billing_address" "jsonb",
    "payment_method" "jsonb",
    "country" "text",
    "city" "text",
    "gender" "public"."gender",
    "relationship_status" "public"."marital_status",
    "birthday_date" "date",
    "instagram_username" "text",
    "data_verified" boolean DEFAULT false,
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."votes" (
    "id" integer NOT NULL,
    "option_id" integer NOT NULL,
    "poll_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "is_ai" boolean DEFAULT false NOT NULL,
    "is_theliaison" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."votes" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."votes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."votes_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."votes_id_seq" OWNED BY "public"."votes"."id";

ALTER TABLE ONLY "public"."comments" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."comments_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."options" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."options_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."votes" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."votes_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."follows"
    ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."gift_payments"
    ADD CONSTRAINT "gift_payments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."gift_recipient_addresses"
    ADD CONSTRAINT "gift_recipient_addresses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."gift_recipient_contacts"
    ADD CONSTRAINT "gift_recipient_contacts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."gift_recipients"
    ADD CONSTRAINT "gift_recipients_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."gifts"
    ADD CONSTRAINT "gifts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."gifts_products"
    ADD CONSTRAINT "gifts_products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."number_test"
    ADD CONSTRAINT "number_test_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "option_unique" UNIQUE ("poll_id", "text");

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "options_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."polls_categories"
    ADD CONSTRAINT "polls_categories_pkey" PRIMARY KEY ("poll_id", "categorie_id");

ALTER TABLE ONLY "public"."polls"
    ADD CONSTRAINT "polls_image_key" UNIQUE ("image");

ALTER TABLE ONLY "public"."polls"
    ADD CONSTRAINT "polls_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."prices"
    ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_role_permission_key" UNIQUE ("role", "permission");

ALTER TABLE ONLY "public"."rules"
    ADD CONSTRAINT "rules_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."rules"
    ADD CONSTRAINT "rules_product_id_key" UNIQUE ("product_id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_user_id_role_key" UNIQUE ("user_id", "role");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_pkey" PRIMARY KEY ("id");

CREATE INDEX "documents_embedding_idx" ON "public"."documents" USING "hnsw" ("embedding" "public"."vector_ip_ops");

CREATE INDEX "idx_comments_poll_id" ON "public"."comments" USING "btree" ("poll_id");

CREATE INDEX "idx_options_poll_id" ON "public"."options" USING "btree" ("poll_id");

CREATE INDEX "polls_embedding_idx" ON "public"."polls" USING "ivfflat" ("embedding" "public"."vector_cosine_ops") WITH ("lists"='100');

CREATE INDEX "polls_id_idx" ON "public"."polls" USING "btree" ("id");

CREATE INDEX "polls_user_id_idx" ON "public"."polls" USING "btree" ("user_id");

CREATE OR REPLACE TRIGGER "on_insert_comment" BEFORE INSERT ON "public"."comments" FOR EACH STATEMENT EXECUTE FUNCTION "public"."handle_subscription_action"();

CREATE OR REPLACE TRIGGER "on_insert_vote" BEFORE INSERT ON "public"."votes" FOR EACH STATEMENT EXECUTE FUNCTION "public"."handle_subscription_action"();

CREATE OR REPLACE TRIGGER "on_insert_vote_prevent_duplicated" BEFORE INSERT ON "public"."votes" FOR EACH STATEMENT EXECUTE FUNCTION "public"."prevent_duplicated_votes"();

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."follows"
    ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."follows"
    ADD CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."gift_payments"
    ADD CONSTRAINT "gift_payments_gift_id_fkey" FOREIGN KEY ("gift_id") REFERENCES "public"."gifts"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."gift_recipient_addresses"
    ADD CONSTRAINT "gift_recipient_addresses_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."gift_recipients"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."gift_recipient_contacts"
    ADD CONSTRAINT "gift_recipient_contacts_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."gift_recipients"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."gifts_products"
    ADD CONSTRAINT "gifts_products_gift_id_fkey" FOREIGN KEY ("gift_id") REFERENCES "public"."gifts"("id");

ALTER TABLE ONLY "public"."gifts_products"
    ADD CONSTRAINT "gifts_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."gifts"
    ADD CONSTRAINT "gifts_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."gift_recipients"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."gifts"
    ADD CONSTRAINT "gifts_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "options_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."polls_categories"
    ADD CONSTRAINT "polls_categories_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id");

ALTER TABLE ONLY "public"."polls_categories"
    ADD CONSTRAINT "polls_categories_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."polls"
    ADD CONSTRAINT "polls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."prices"
    ADD CONSTRAINT "prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."rules"
    ADD CONSTRAINT "rules_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "public"."prices"("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "public"."options"("id");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Allow auth admin to read user roles" ON "public"."user_roles" FOR SELECT TO "supabase_auth_admin" USING (true);

CREATE POLICY "Allow authorized delete access" ON "public"."gifts" FOR DELETE USING (( SELECT "public"."authorize"('gifts.delete'::"public"."app_permission") AS "authorize"));

CREATE POLICY "Allow authorized edit access" ON "public"."gifts" FOR UPDATE USING (( SELECT "public"."authorize"('gifts.edit'::"public"."app_permission") AS "authorize"));

CREATE POLICY "Allow public read-only access." ON "public"."prices" FOR SELECT USING (true);

CREATE POLICY "Allow public read-only access." ON "public"."products" FOR SELECT USING (true);

CREATE POLICY "Can only view own subs data." ON "public"."subscriptions" FOR SELECT USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."comments" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."gift_recipients" TO "authenticated" USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."options" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."polls" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."polls_categories" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."votes" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."polls" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."polls_categories" FOR SELECT USING (true);

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."users" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."users" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));

CREATE POLICY "Users can update own profile." ON "public"."users" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));

CREATE POLICY "all" ON "public"."customers" USING (true);

CREATE POLICY "all" ON "public"."gifts" USING (true);

CREATE POLICY "all" ON "public"."gifts_products" USING (true);

CREATE POLICY "asd" ON "public"."gift_recipient_contacts" USING (true);

CREATE POLICY "asdd" ON "public"."gift_payments" USING (true);

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."documents" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ecs" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "everyone can see comments" ON "public"."comments" FOR SELECT USING (true);

CREATE POLICY "everyone can see options of polls" ON "public"."options" FOR SELECT USING (true);

ALTER TABLE "public"."follows" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gift_payments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gift_recipient_addresses" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gift_recipient_contacts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gift_recipients" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gifts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gifts_products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."number_test" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."options" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."polls" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."polls_categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."prices" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."role_permissions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."rules" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select eve" ON "public"."votes" FOR SELECT USING (true);

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "temp remove it" ON "public"."gift_recipient_addresses" USING (true);

CREATE POLICY "update" ON "public"."votes" FOR UPDATE USING (true);

ALTER TABLE "public"."user_roles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."votes" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."comments";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."prices";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."products";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT USAGE ON SCHEMA "public" TO "supabase_auth_admin";

GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") TO "anon";
GRANT ALL ON FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") TO "authenticated";
GRANT ALL ON FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") TO "service_role";

GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "service_role";

REVOKE ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "service_role";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "supabase_auth_admin";

GRANT ALL ON FUNCTION "public"."downvote_comment"("p_comment_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."downvote_comment"("p_comment_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."downvote_comment"("p_comment_id" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_poll"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_poll"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_poll"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_subscription_action"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_subscription_action"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_subscription_action"() TO "service_role";

GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "service_role";

GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "service_role";

GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."prevent_duplicated_votes"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_duplicated_votes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_duplicated_votes"() TO "service_role";

GRANT ALL ON FUNCTION "public"."search_gifts"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."search_gifts"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_gifts"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."search_polls"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."search_polls"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_polls"("query_embedding" "public"."vector", "similarity_threshold" double precision, "match_count" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."upvote_comment"("p_comment_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."upvote_comment"("p_comment_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."upvote_comment"("p_comment_id" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "service_role";

GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."comments" TO "anon";
GRANT ALL ON TABLE "public"."comments" TO "authenticated";
GRANT ALL ON TABLE "public"."comments" TO "service_role";

GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";

GRANT ALL ON TABLE "public"."documents" TO "anon";
GRANT ALL ON TABLE "public"."documents" TO "authenticated";
GRANT ALL ON TABLE "public"."documents" TO "service_role";

GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."follows" TO "anon";
GRANT ALL ON TABLE "public"."follows" TO "authenticated";
GRANT ALL ON TABLE "public"."follows" TO "service_role";

GRANT ALL ON SEQUENCE "public"."follows_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."follows_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."follows_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."gift_payments" TO "anon";
GRANT ALL ON TABLE "public"."gift_payments" TO "authenticated";
GRANT ALL ON TABLE "public"."gift_payments" TO "service_role";

GRANT ALL ON SEQUENCE "public"."gift_payments_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."gift_payments_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."gift_payments_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."gift_recipient_addresses" TO "anon";
GRANT ALL ON TABLE "public"."gift_recipient_addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."gift_recipient_addresses" TO "service_role";

GRANT ALL ON SEQUENCE "public"."gift_recipient_addresses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."gift_recipient_addresses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."gift_recipient_addresses_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."gift_recipient_contacts" TO "anon";
GRANT ALL ON TABLE "public"."gift_recipient_contacts" TO "authenticated";
GRANT ALL ON TABLE "public"."gift_recipient_contacts" TO "service_role";

GRANT ALL ON TABLE "public"."gift_recipients" TO "anon";
GRANT ALL ON TABLE "public"."gift_recipients" TO "authenticated";
GRANT ALL ON TABLE "public"."gift_recipients" TO "service_role";

GRANT ALL ON TABLE "public"."gifts" TO "anon";
GRANT ALL ON TABLE "public"."gifts" TO "authenticated";
GRANT ALL ON TABLE "public"."gifts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."gifts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."gifts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."gifts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."gifts_products" TO "anon";
GRANT ALL ON TABLE "public"."gifts_products" TO "authenticated";
GRANT ALL ON TABLE "public"."gifts_products" TO "service_role";

GRANT ALL ON SEQUENCE "public"."gifts_products_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."gifts_products_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."gifts_products_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."number_test" TO "anon";
GRANT ALL ON TABLE "public"."number_test" TO "authenticated";
GRANT ALL ON TABLE "public"."number_test" TO "service_role";

GRANT ALL ON SEQUENCE "public"."number_test_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."number_test_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."number_test_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."options" TO "anon";
GRANT ALL ON TABLE "public"."options" TO "authenticated";
GRANT ALL ON TABLE "public"."options" TO "service_role";

GRANT ALL ON SEQUENCE "public"."options_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."options_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."options_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."polls" TO "anon";
GRANT ALL ON TABLE "public"."polls" TO "authenticated";
GRANT ALL ON TABLE "public"."polls" TO "service_role";

GRANT ALL ON TABLE "public"."polls_categories" TO "anon";
GRANT ALL ON TABLE "public"."polls_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."polls_categories" TO "service_role";

GRANT ALL ON TABLE "public"."prices" TO "anon";
GRANT ALL ON TABLE "public"."prices" TO "authenticated";
GRANT ALL ON TABLE "public"."prices" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."role_permissions" TO "anon";
GRANT ALL ON TABLE "public"."role_permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."role_permissions" TO "service_role";

GRANT ALL ON SEQUENCE "public"."role_permissions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."role_permissions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."role_permissions_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."rules" TO "anon";
GRANT ALL ON TABLE "public"."rules" TO "authenticated";
GRANT ALL ON TABLE "public"."rules" TO "service_role";

GRANT ALL ON SEQUENCE "public"."rules_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."rules_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."rules_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";

GRANT ALL ON TABLE "public"."user_roles" TO "service_role";
GRANT ALL ON TABLE "public"."user_roles" TO "supabase_auth_admin";

GRANT ALL ON SEQUENCE "public"."user_roles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_roles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_roles_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."votes" TO "anon";
GRANT ALL ON TABLE "public"."votes" TO "authenticated";
GRANT ALL ON TABLE "public"."votes" TO "service_role";

GRANT ALL ON SEQUENCE "public"."votes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."votes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."votes_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
