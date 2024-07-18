CREATE UNIQUE INDEX gifts_stripe_session_id_key ON public.gifts USING btree (stripe_session_id);

alter table "public"."gifts" add constraint "gifts_stripe_session_id_key" UNIQUE using index "gifts_stripe_session_id_key";


