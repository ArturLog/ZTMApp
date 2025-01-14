"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LoginForm } from "../auth/LoginForm";
import { RegisterForm } from "../auth/RegisterForm";

export function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("");
	const router = useRouter();

	const checkAuth = async () => {
		try {
			const response = await fetch("http://localhost:3001/auth/me", {
				method: "GET",
				credentials: "include",
			});
			if (response.ok) {
				const user = await response.json();
				setIsLoggedIn(true);
				setUserName(user.name || user.email.split("@")[0]);
			} else {
				setIsLoggedIn(false);
				setUserName("");
			}
		} catch (error) {
			console.error("Failed to verify authentication:", error);
			setIsLoggedIn(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	const handleLogin = () => {
		setIsLoggedIn(true);
		// Fetch user details (optional)
	};

	const handleRegister = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = async () => {
		try {
			await fetch("http://localhost:3001/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			setIsLoggedIn(false);
			setUserName("");
			router.push("/");
		} catch (error) {
			console.error("Failed to log out", error);
		}
	};

	return (
		<nav className="flex items-center justify-between p-4 bg-gray-100 h-[7vh]">
			<Link href="/" className="text-xl font-bold">
				ZTM App
			</Link>
			<div className="space-x-2">
				{isLoggedIn ? (
					<>
						<Button
							variant="ghost"
							onClick={() => router.push("/my-stops")}
						>
							My Stops
						</Button>
						<Button
							variant="ghost"
							onClick={() => router.push("/profile")}
						>
							Profile
						</Button>
						<Button variant="outline" onClick={handleLogout}>
							Logout
						</Button>
					</>
				) : (
					<>
						<LoginForm onLogin={handleLogin} />
						<RegisterForm onRegister={handleRegister} />
					</>
				)}
			</div>
		</nav>
	);
}
