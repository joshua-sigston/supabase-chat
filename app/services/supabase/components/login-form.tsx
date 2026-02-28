"use client";

import { useState } from "react";

import { cn } from "@/app/services/supabase/lib/utils";
import { createClient } from "@/app/services/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * LoginForm provides the user interface for authenticating with the application.
 * Currently configured to use GitHub OAuth via Supabase.
 */
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // Track any authentication errors to display to the user
  const [error, setError] = useState<string | null>(null);
  // Track loading state to disable the submit button during the auth flow
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the OAuth login process.
   * Prevents default form submission and triggers Supabase signInWithOAuth.
   */
  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Initialize the Supabase client for the browser
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // Initiate OAuth login with GitHub.
      // redirectTo ensures the user is sent back to our app's OAuth callback route
      // which will handle exchanging the auth code for a session.
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      // Capture and display any errors that occur during the sign-in initiation
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome!</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSocialLogin}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-destructive-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Continue with GitHub"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
