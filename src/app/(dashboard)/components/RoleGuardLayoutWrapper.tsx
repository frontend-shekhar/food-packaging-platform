"use client";

import { getLocalStorage } from "@/lib/useLocalStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string[];
}) {
  const router = useRouter();
  const storedUser = getLocalStorage("user") as { userRoles: string[] } | null;

  useEffect(() => {
    if (
      !storedUser ||
      !storedUser.userRoles.some((userRole: string) => role.includes(userRole))
    ) {
      router.replace("/unauthorized");
    }
  }, [storedUser, router, role]);

  if (
    !storedUser ||
    !storedUser.userRoles.some((userRole: string) => role.includes(userRole))
  )
    return null;

  return <>{children}</>;
}
