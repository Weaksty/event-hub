-- Delete events after their registration deadline has passed.
-- Paste this into Supabase SQL Editor.

create or replace function public.delete_expired_events()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  delete from public.events_list
  where deadline is not null
    and deadline < current_date;

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.delete_expired_events() from public;

-- Run once manually:
select public.delete_expired_events();

-- Optional daily automation.
-- If pg_cron is enabled in your Supabase project, uncomment this block.
--
-- create extension if not exists pg_cron with schema extensions;
--
-- select cron.schedule(
--   'delete-expired-events-daily',
--   '10 0 * * *',
--   $$select public.delete_expired_events();$$
-- );
