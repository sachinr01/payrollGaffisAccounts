"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");

    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      router.replace("/dashboard");
    }
  }, [router]);

  return null;
}
