
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

CREATE TYPE "public"."gender" AS ENUM (
    'female',
    'male',
    'other'
);

ALTER TYPE "public"."gender" OWNER TO "postgres";

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
    raise exception 'use cannot make poll';
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
    "poll_id" integer NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
    "id" "uuid" NOT NULL,
    "stripe_customer_id" "text"
);

ALTER TABLE "public"."customers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."options" (
    "id" integer NOT NULL,
    "text" "text" NOT NULL,
    "poll_id" integer NOT NULL
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
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "question" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "image" "text"
);

ALTER TABLE "public"."polls" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."polls_categories" (
    "poll_id" bigint NOT NULL,
    "categorie_id" bigint NOT NULL
);

ALTER TABLE "public"."polls_categories" OWNER TO "postgres";

ALTER TABLE "public"."polls" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."polls_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

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
    "metadata" "jsonb"
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "billing_address" "jsonb",
    "payment_method" "jsonb",
    "country" "text",
    "city" "text",
    "gender" "public"."gender",
    "marital_status" "public"."marital_status",
    "birthday_date" "date",
    "instagram" "text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

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

CREATE TABLE IF NOT EXISTS "public"."votes" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "option_id" integer NOT NULL,
    "poll_id" bigint NOT NULL
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

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "option_unique" UNIQUE ("poll_id", "text");

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "options_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."polls_categories"
    ADD CONSTRAINT "polls_categories_pkey" PRIMARY KEY ("poll_id", "categorie_id");

ALTER TABLE ONLY "public"."polls"
    ADD CONSTRAINT "polls_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."prices"
    ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."rules"
    ADD CONSTRAINT "rules_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."rules"
    ADD CONSTRAINT "rules_product_id_key" UNIQUE ("product_id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "unique_vote" UNIQUE ("user_id", "poll_id", "option_id");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "unique_vote_per_poll_and_user" UNIQUE ("user_id", "poll_id");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "vote_unique" UNIQUE ("user_id", "option_id");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_pkey" PRIMARY KEY ("id");

CREATE INDEX "idx_comments_poll_id" ON "public"."comments" USING "btree" ("poll_id");

CREATE INDEX "idx_options_poll_id" ON "public"."options" USING "btree" ("poll_id");

CREATE INDEX "idx_votos_user_id" ON "public"."votes" USING "btree" ("user_id");

CREATE OR REPLACE TRIGGER "on_insert_comment" BEFORE INSERT ON "public"."comments" FOR EACH STATEMENT EXECUTE FUNCTION "public"."handle_subscription_action"();

CREATE OR REPLACE TRIGGER "on_insert_poll" BEFORE INSERT ON "public"."polls" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_poll"();

CREATE OR REPLACE TRIGGER "on_insert_vote" BEFORE INSERT ON "public"."votes" FOR EACH STATEMENT EXECUTE FUNCTION "public"."handle_subscription_action"();

CREATE OR REPLACE TRIGGER "on_insert_vote_prevent_duplicated" BEFORE INSERT ON "public"."votes" FOR EACH STATEMENT EXECUTE FUNCTION "public"."prevent_duplicated_votes"();

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id");

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "options_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id");

ALTER TABLE ONLY "public"."polls_categories"
    ADD CONSTRAINT "polls_categories_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id");

ALTER TABLE ONLY "public"."polls_categories"
    ADD CONSTRAINT "polls_categories_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id");

ALTER TABLE ONLY "public"."polls"
    ADD CONSTRAINT "polls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."prices"
    ADD CONSTRAINT "prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."rules"
    ADD CONSTRAINT "rules_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "public"."prices"("id");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "public"."options"("id");

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "public"."polls"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."votes"
    ADD CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

CREATE POLICY "Allow public read-only access." ON "public"."prices" FOR SELECT USING (true);

CREATE POLICY "Allow public read-only access." ON "public"."products" FOR SELECT USING (true);

CREATE POLICY "Can only view own subs data." ON "public"."subscriptions" FOR SELECT USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."comments" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."options" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."polls" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."polls_categories" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."votes" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."polls" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."polls_categories" FOR SELECT USING (true);

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ecs" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "everyone can see comments" ON "public"."comments" FOR SELECT USING (true);

CREATE POLICY "everyone can see options of polls" ON "public"."options" FOR SELECT USING (true);

ALTER TABLE "public"."options" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."polls" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."polls_categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."prices" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."rules" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select eve" ON "public"."votes" FOR SELECT USING (true);

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "update" ON "public"."votes" FOR UPDATE USING (true);

ALTER TABLE "public"."votes" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."comments";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."prices";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."products";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_poll"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_poll"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_poll"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_subscription_action"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_subscription_action"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_subscription_action"() TO "service_role";

GRANT ALL ON FUNCTION "public"."prevent_duplicated_votes"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_duplicated_votes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_duplicated_votes"() TO "service_role";

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

GRANT ALL ON SEQUENCE "public"."polls_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."polls_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."polls_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."prices" TO "anon";
GRANT ALL ON TABLE "public"."prices" TO "authenticated";
GRANT ALL ON TABLE "public"."prices" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."rules" TO "anon";
GRANT ALL ON TABLE "public"."rules" TO "authenticated";
GRANT ALL ON TABLE "public"."rules" TO "service_role";

GRANT ALL ON SEQUENCE "public"."rules_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."rules_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."rules_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";

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
