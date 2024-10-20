// app/not-found/page.tsx

import { Home } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col  max-w-screen-sm  items-center justify-center md:min-h-screen text-center">
      <div className="p-8 rounded-lg hover:bg-gray-50  shadow border">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="mt-4 text-2xl">Page Not Found</h2>
        <p className="mt-2 text-lg">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="mt-6 flex gap-2 justify-center items-center px-6 py-2 bg-blue-500 text-white rounded-full border-0 shadow-sm"
        >
          <Home className="h-4 w-4" /> Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
