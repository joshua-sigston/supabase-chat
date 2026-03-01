-- Update the function to pull preferred_username from the auth user's raw_user_meta_data
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (id, name, "image-url")
  values (
    new.id,
    new.raw_user_meta_data->>'preferred_username',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  return new;
end;
$$;
