create type "auth"."one_time_token_type" as enum ('confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token');

create table "auth"."one_time_tokens" (
    "id" uuid not null,
    "user_id" uuid not null,
    "token_type" auth.one_time_token_type not null,
    "token_hash" text not null,
    "relates_to" text not null,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);


CREATE UNIQUE INDEX one_time_tokens_pkey ON auth.one_time_tokens USING btree (id);

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);

alter table "auth"."one_time_tokens" add constraint "one_time_tokens_pkey" PRIMARY KEY using index "one_time_tokens_pkey";

alter table "auth"."one_time_tokens" add constraint "one_time_tokens_token_hash_check" CHECK ((char_length(token_hash) > 0)) not valid;

alter table "auth"."one_time_tokens" validate constraint "one_time_tokens_token_hash_check";

alter table "auth"."one_time_tokens" add constraint "one_time_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "auth"."one_time_tokens" validate constraint "one_time_tokens_user_id_fkey";

grant delete on table "auth"."one_time_tokens" to "dashboard_user";

grant insert on table "auth"."one_time_tokens" to "dashboard_user";

grant references on table "auth"."one_time_tokens" to "dashboard_user";

grant select on table "auth"."one_time_tokens" to "dashboard_user";

grant trigger on table "auth"."one_time_tokens" to "dashboard_user";

grant truncate on table "auth"."one_time_tokens" to "dashboard_user";

grant update on table "auth"."one_time_tokens" to "dashboard_user";

grant delete on table "auth"."one_time_tokens" to "postgres";

grant insert on table "auth"."one_time_tokens" to "postgres";

grant references on table "auth"."one_time_tokens" to "postgres";

grant select on table "auth"."one_time_tokens" to "postgres";

grant trigger on table "auth"."one_time_tokens" to "postgres";

grant truncate on table "auth"."one_time_tokens" to "postgres";

grant update on table "auth"."one_time_tokens" to "postgres";


create policy "Anyone can update their own avatar."
on "storage"."objects"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = owner))
with check ((bucket_id = 'avatars'::text));


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));



