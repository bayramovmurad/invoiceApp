"use client"

import { SignUp } from "@clerk/react";

export default function page() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <SignUp />
        </div>
      </div>
    </div>
  );
}