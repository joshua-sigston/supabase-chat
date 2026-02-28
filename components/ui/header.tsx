"use client";

import { useCurrentUser } from "@/app/services/supabase/hooks/useCurrentUser";
import Link from "next/link";
import { Button } from "./button";
import { LogoutButton } from "@/app/services/supabase/components/logout-button";

export default function Header() {
  const { user, isLoading } = useCurrentUser();

  return (
    <div className="fixed w-full top-0 z-50">
      <nav className="text-white flex items-center justify-between bg-black/70 p-4 font-bold">
        <Link href="/" className="text-xl">
          Supachat
        </Link>
        {isLoading || user == null ? (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        ) : (
          <div className=" flex items-center gap-4">
            <span className="">
              {user.user_metadata?.preferred_username || user.email}
            </span>
            <LogoutButton />
          </div>
        )}
      </nav>
    </div>
  );
}
