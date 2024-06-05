"use client";
import React, { useContext } from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import LMSContext from "@/store/lmsContext";

const Header: React.FC = () => {
  const { user, signOut } = useContext(LMSContext);
  return (
    <nav className="bg-blue-950/90 dark:bg-teal-600">
      <div className="container mx-auto flex items-center justify-between">
        <div className="p-2 pl-1 text-3xl font-bold text-white">
          REALM
          <p className="text-xs font-thin tracking-wide">your playground...!</p>
        </div>
        {user && (
          <div className="flex flex-row gap-1 text-white">
            <span className="italic">{user.name}</span>
            <PowerIcon
              className="h-6 w-6 cursor-pointer"
              onClick={signOut}
            ></PowerIcon>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
