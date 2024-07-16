alter table "public"."users" add column "zip_code" bigint;

create policy "Enable insert for authenticated users only"
on "public"."users"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."users"
as permissive
for update
to public
using (((( SELECT auth.jwt() AS jwt) ->> 'email'::text) = email))
with check (((( SELECT auth.jwt() AS jwt) ->> 'email'::text) = email));


create policy "ever"
on "public"."users"
as permissive
for all
to public
using (true);



