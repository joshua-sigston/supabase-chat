import { createClient } from "../server";

/**
 * Retrieves the currently authenticated user from the Supabase session.
 * Designed to be used in Server Components, Server Actions, and Route Handlers.
 *
 * @returns The Supabase User object if logged in, otherwise null.
 */
export async function getCurrentUser() {
  // 1. Create a Supabase server client instance
  // Note: This relies on cookies() from next/headers, so it must be called in a server context
  const supabase = await createClient();

  // 2. Fetch and return the user object from the current auth session
  return (await supabase.auth.getUser()).data.user;
}
