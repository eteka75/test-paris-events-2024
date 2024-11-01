import { Home, WifiOff } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col  max-w-screen-sm  items-center justify-center  text-center">
      <div className="p-8 rounded-lg dark:hover:bg-gray-800/80 hover:bg-gray-50  dark:bg-gray-800 dark:border-gray-800 ">
        <h1 className="text-4xl font-bold text-center">
          <WifiOff className="h-32 w-32 opacity-30 text-bleu-400 mx-auto" />
        </h1>
        <h2 className="mt-4 text-2xl">404, Page Not Found</h2>
        <p className="mt-2 text-lg">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="mt-6 flex w-3/5 mx-auto gap-2 justify-center items-center px-6 py-2 rounded-md bg-blue-500 text-white  border-0 shadow-sm"
        >
          <Home className="h-4 w-4" /> Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
