"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace("/login");
  };

  return logout;
}
