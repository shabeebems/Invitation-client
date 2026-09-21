"use client";

import { createContext, useContext } from "react";
import type { AdminUser } from "@/lib/api";

type AdminContextValue = {
  user: AdminUser | null;
  loading: boolean;
};

export const AdminContext = createContext<AdminContextValue>({
  user: null,
  loading: true,
});

export function useAdmin() {
  return useContext(AdminContext);
}
