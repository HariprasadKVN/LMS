import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-bold text-white">

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
