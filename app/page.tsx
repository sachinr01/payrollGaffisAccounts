"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>You are logged in successfully.</p>
    </div>
  );
}
