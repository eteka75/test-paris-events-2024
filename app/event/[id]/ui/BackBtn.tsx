"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const MiniLinkBack = () => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <button
      onClick={handleBackClick}
      className="hidden md:flex hover:text-blue-600 mt-1"
    >
      <ChevronLeft /> <span className="sr-only">Retour</span>
    </button>
  );
};
export const BottomBack = () => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <button
      onClick={handleBackClick}
      className=" w-full text-blue-700 dark:text-white dark:border-gray-700 border-blue-700 md:w-32 my-4 border  justify-center rounded-md shadow-sm flex whitespace-nowrap md:py-2 py-4 px-5 hover:text-white hover:bg-blue-500 "
    >
      <ChevronLeft /> Retour
    </button>
  );
};
