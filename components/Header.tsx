'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, signOut } from "../lib/actions";
import UCButton from "./ui/button";
import { Session } from "next-auth";

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
        <div>
          {/* <Link href="/">
            <span className="mx-4 text-white">Dashboard</span>
          </Link> */}
          {/* <Link href="/login">
            <span className="text-white">Login</span>
          </Link> */}
          {session?.user &&  <UCButton onClick={handleClick}>
            Logout
          </UCButton>}
        </div>
      </div>
    </nav>
  );
};

export default Header;
