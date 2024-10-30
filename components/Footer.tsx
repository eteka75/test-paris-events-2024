import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-wrap text-sm justify-center gap-6 py-4 mt-4">
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
        <p>&copy; {new Date().getFullYear()} Beebs Event.</p>
      </div>
    </>
  );
};

export default Footer;
