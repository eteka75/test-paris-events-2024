"use client";
import { useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const MiniLinkBack = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBackClick = useCallback(() => {
    const targetPath = `/?${searchParams.toString()}`;
    router.push(targetPath);
  }, [router, searchParams]);

  return (
    <button
      onClick={handleBackClick}
      className="hidden md:flex hover:text-blue-600 px-1  py-0.5 rounded-md shadow-sm border border-opacity-55 dark:border-gray-600 dark:hover:text-blue-400 "
    >
      <ChevronLeft /> <span className="sr-only">Retour</span>
    </button>
  );
};
export const BottomBack = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBackClick = useCallback(() => {
    const targetPath = `/?${searchParams.toString()}`;
    router.push(targetPath);
  }, [router, searchParams]);

  return (
    <button
      onClick={handleBackClick}
      className=" w-full text-blue-700 dark:text-white dark:border-gray-700 border-blue-700 md:w-32 my-4 border  justify-center rounded-md shadow-sm flex whitespace-nowrap md:py-2 py-4 px-5 hover:text-white hover:bg-blue-500 "
    >
      <ChevronLeft /> Retour
    </button>
  );
};
