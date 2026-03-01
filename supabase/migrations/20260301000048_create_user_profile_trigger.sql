-- Create a function to handle the new user insertion
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer -- Used security definer because the trigger needs to bypass RLS to insert into a public table when called by auth schema
set search_path = ''
as $$
begin
  insert into public.user_profiles (id, created_at, updated_at)
  values (new.id, now(), now());
  
  return new;
end;
$$;

-- Create the trigger that calls the function whenever a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
