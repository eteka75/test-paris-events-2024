interface SkeletonCardProps {
  nb: number;
}

export default function SkeletonCard({ nb = 4 }: SkeletonCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
      {Array.from({ length: nb }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse border rounded-lg p-4 bg-gray-200 dark:border-gray-900 dark:bg-gray-800"
        >
          <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-4 w-2/6"></div>

          <div className="pt-8 mt-4 flex gap-8">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-5/6"></div>

            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-5/6"></div>

            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
