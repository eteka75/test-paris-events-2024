// SkeletonCard.tsx
interface SkeletonCardProps {
  nb: number;
}

export default function SkeletonCard({ nb = 4 }: SkeletonCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Array.from({ length: nb }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse border rounded-lg p-4 bg-gray-200"
        >
          <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}
