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



