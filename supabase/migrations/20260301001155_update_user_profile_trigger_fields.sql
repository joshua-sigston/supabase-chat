-- Update the function to pull name and image URL from the auth user's raw_user_meta_data
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (id, created_at, updated_at, name, "image-url")
  values (
    new.id,
    now(),
    now(),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  return new;
end;
$$;
