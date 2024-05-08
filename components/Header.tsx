'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, signOut } from "../lib/actions";
import { Session } from "next-auth";
import { PowerIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      return await auth();
    }

    getSession().then((s) => setSession(s))

  }, []);

  const handleClick = async () => {
    await signOut();
  }

  return (
    <nav className="bg-blue-950/90 dark:bg-teal-600">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-white text-3xl p-2 pl-1">
          REALM
          <p className="text-xs font-thin tracking-wide">your playground...!</p>
        </div>
        <div className="flex flex-row gap-1 text-white">
          {session?.user && <span className="italic">{session?.user.name}</span>}
          {session?.user && <PowerIcon className="w-6 h-6 cursor-pointer" onClick={handleClick}>
          </PowerIcon>}
        </div>

      </div>
    </nav>
  );
};

export default Header;
