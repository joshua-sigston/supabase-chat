-- Update the function to point to public.user_profile (singular) instead of user_profiles
-- Also add COALESCE to the name column since it is NOT NULL and preferred_username might be missing for some oauth providers
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profile (id, name, "image-url")
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'preferred_username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name', 'Unknown'),
    new.raw_user_meta_data->>'avatar_url'
  );
  
  return new;
end;
$$;
