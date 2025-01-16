"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginForm } from "../auth/LoginForm";
import { RegisterForm } from "../auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  const handleLogin = (id : string) => {
    router.push(`/${id}`);
  };

  // @ts-ignore
  return (
    <nav className="sticky top-0 z-10 bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            ZTM App
          </Link>
          <div className="space-x-2">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push(`/${user.id}`)}
                >
                  My Stops
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/profile")}
                >
                  Profile
                </Button>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LoginForm onLogin={handleLogin} />
                <RegisterForm />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
