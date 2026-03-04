"use client";

import { ReactNode } from "react";
import { LocaleProvider } from "../context/LocaleContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
