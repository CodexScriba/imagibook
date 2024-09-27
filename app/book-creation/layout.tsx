// app/book-creation/layout.tsx

"use client";

import type React from "react";
import { FormDataProvider } from "../context/FormContext";
import Navbar from "../components/Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function BookCreationLayout({ children }: LayoutProps) {
  return (
    <FormDataProvider>
      <Navbar />
      <div className="mt-10 w-full flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </FormDataProvider>
  );
}
