import { useEffect, useState } from "react";
import { createClient } from "../client";
import { User } from "@supabase/supabase-js";

/**
 * A React hook that manages and provides the current authenticated user's state.
 * It fetches the initial user session on mount and subscribes to any subsequent
 * authentication state changes (e.g., login, logout, token refresh).
 *
 * @returns An object containing:
 * - `user`: The current Supabase `User` object, or `null` if the user is not authenticated.
 * - `isLoading`: A boolean indicating whether the initial user fetch is still in progress.
 */
export function useCurrentUser() {
  // Track if we are currently making the initial request for the user's session
  const [isLoading, setIsLoading] = useState(true);

  // Store the current user object, starting as null
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Create a Supabase client instance
    const supabase = createClient();

    // 1. Fetch the user's profile immediately when the hook mounts.
    // This is necessary because onAuthStateChange doesn't always fire immediately on load
    // if the user is already authenticated.
    supabase.auth
      .getUser()
      .then(({ data }) => setUser(data.user))
      .finally(() => {
        // Once the initial fetch completes (success or failure), we are no longer loading
        setIsLoading(false);
      });

    // 2. Set up a listener for any subsequent authentication events.
    // This ensures our local state stays in sync if the user logs in or out elsewhere in the app.
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      // Update the user state based on the new session
      setUser(session?.user ?? null);
    });

    // 3. Cleanup function: when the component using this hook unmounts,
    // we must unsubscribe from the auth listener to prevent memory leaks.
    return () => {
      data.subscription.unsubscribe();
    };
  }, []); // Empty dependency array means this effect only runs once when the component mounts

  // Note: consider returning `isLoading` as well if the UI needs to show a loading spinner!
  return { user, isLoading };
}
