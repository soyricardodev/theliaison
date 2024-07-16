drop policy "Public profiles are viewable by everyone." on "public"."users";

drop policy "Users can insert their own profile." on "public"."users";

drop policy "Users can update own profile." on "public"."users";

alter table "public"."comments" drop constraint "comments_user_id_fkey1";

alter table "public"."follows" drop constraint "follows_follower_id_fkey";

alter table "public"."follows" drop constraint "follows_following_id_fkey";

alter table "public"."gifts" drop constraint "gifts_sender_id_fkey";

alter table "public"."polls" drop constraint "polls_user_id_fkey";

alter table "public"."user_roles" drop constraint "user_roles_user_id_fkey";

alter table "public"."users" drop constraint "profiles_id_fkey";

alter table "public"."users" drop constraint "profiles_username_key";

alter table "public"."users" drop constraint "username_length";

alter table "public"."votes" drop constraint "votes_user_id_fkey";

alter table "public"."users" drop constraint "profiles_pkey";

drop index if exists "public"."profiles_pkey";

drop index if exists "public"."profiles_username_key";

alter table "public"."users" drop column "birthday_date";

alter table "public"."users" drop column "data_verified";

alter table "public"."users" drop column "instagram_username";

alter table "public"."users" drop column "updated_at";

alter table "public"."users" drop column "username";

alter table "public"."users" add column "email" text;

alter table "public"."users" add column "state" text;

alter table "public"."users" alter column "full_name" drop not null;

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  SELECT
    new.id,
    new.email,
    jsonb_extract_path_text(new.raw_user_meta_data, 'full_name'),
    COALESCE(jsonb_extract_path_text(new.raw_user_meta_data, 'picture'), jsonb_extract_path_text(new.raw_user_meta_data, 'avatar_url'), NULL)
  END;

  RETURN new;
END;$function$
;


