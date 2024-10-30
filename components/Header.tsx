import Link from "next/link";
import React from "react";

const Header = ({ title }: { title?: string }) => {
  return (
    <header>
      <Link href="/">
        <h1 className="uppercase truncate whitespace-nowrap text-ellipsis bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text text-2xl xl:text-3xl text-center font-bold">
          {title}
        </h1>
      </Link>
    </header>
  );
};

export default Header;
