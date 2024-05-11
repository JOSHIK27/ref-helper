// app/providers.tsx
"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { ClerkProvider } from "@clerk/nextjs";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ClerkProvider>{children}</ClerkProvider>
    </RecoilRoot>
  );
}
