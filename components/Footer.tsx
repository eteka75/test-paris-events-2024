import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-wrap gap-x-4 gap-y-2 text-sm justify-center md:gap-5 md:pt-4 mt-4">
        <Link className="hover:underline" href={"/"}>
          Accueil
        </Link>
        <Link className="hover:underline" href={"#"}>
          À propos
        </Link>
        <Link className="hover:underline" href={"#"}>
          Conditions
        </Link>
        <Link className="hover:underline" href={"#"}>
          Les événements sur Paris
        </Link>
        <Link className="hover:underline" href={"#"}>
          Autres événements
        </Link>
      </footer>
      <div className="my-2 text-center text-xs opacity-70">
        <div className="text-center flex justify-center mb-2">
          <ThemeSwitcher />
        </div>
        <p>&copy; {new Date().getFullYear()} Beebs Event.</p>
      </div>
    </>
  );
};

export default Footer;
