"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { checkAndAddUser } from "../actions";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  const navLinks = [
    {
      href: "/",
      label: "Factures",
    },
    {
      href: "/test",
      label: "tt",
    },
  ];

      useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress && user.fullName) {
          checkAndAddUser(
            user?.primaryEmailAddress?.emailAddress,
            user.fullName,
          );
        }
      }, [user]);

  const isActiveLink = (href: string) => pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

  const renderLinks = (className: string) =>
    navLinks.map(({ href, label }) => (
      <Link
        href={href}
        key={href}
        className={`btn-sm ${className} ${isActiveLink(href) ? "btn-accent" : ""}`}>
        {label}
      </Link>
    ));

  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-accent-content text-accent  rounded-full p-2">
            <Layers className="h-6 w-6" />
          </div>
          <span className="ml-3 font-bold text-2xl italic">
            In<span className="text-accent">Voicepp</span>
          </span>
        </div>

        <div className="flex  space-x-4 items-center">
          {renderLinks("btn")}
          <UserButton />
        </div>
      </div>

      <div></div>
    </div>
  );

}
