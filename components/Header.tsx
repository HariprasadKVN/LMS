import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="bg-blue-950/90 dark:bg-teal-600">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-white text-3xl p-2 pl-1">
          REALM
          <p className="text-xs font-thin tracking-wide">your playground...!</p>
        </div>
        <div>
          <Link href="/">
            <span className="mx-4 text-white">Dashboard</span>
          </Link>
          <Link href="/login">
            <span className="text-white">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
