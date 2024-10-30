import { ChevronLeft, ChevronRight } from "lucide-react"; // Vérifiez le chemin
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  loading: boolean;
  onItemsPerPageChange: (items: number) => void;
}

/**
 * Composant de pagination
 *
 * @param PaginationProps
 * @returns Vue de pagination
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  loading,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  if (isNaN(currentPage)) {
    currentPage = 1;
  }
  // en cours de chargement ou pas de résultat
  if (loading || !(totalPages > 0 && totalPages >= currentPage)) {
    return;
  }
  return (
    <div className="grid  lg:flex gap-2 md:justify-center items-center mt-4">
      <label className="border dark:border-gray-800  dark:bg-gray-800 flex justify-center gap-1 rounded-md py-2 px-4">
        Afficher par page:
        <select
          className="ml-2 bg-white  dark:bg-gray-800 right-0 rounded focus:ring-1 focus:ring-gray-500"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </label>
      <div className="grid lg:flex gap-4 items-center text-sm">
        <>
          <div className="text-center mt-2 md:mt-0 lg:text-start">
            Page {currentPage} sur {totalPages}
          </div>
          <div className="flex  gap-2">
            <button
              className="border justify-center dark:border-gray-800  dark:bg-gray-800 w-full md:w-auto flex whitespace-nowrap disabled:cursor-default disabled:opacity-50 items-center cursor-pointer rounded-md px-4 py-4 md:py-2"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft /> Précédent
            </button>
            <button
              className="border justify-center dark:border-gray-800  dark:bg-gray-800 w-full md:w-auto flex whitespace-nowrap disabled:cursor-default disabled:opacity-50 items-center cursor-pointer rounded-md px-4 py-4 md:py-2"
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Suivant <ChevronRight />
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Pagination;
