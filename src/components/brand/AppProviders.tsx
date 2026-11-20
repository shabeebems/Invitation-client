"use client";

import { Suspense, type ReactNode } from "react";
import NavigationProgress from "@/components/brand/NavigationProgress";

/** Client chrome shared by every route (nav progress, future toasts, etc.). */
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      {children}
    </>
  );
}
