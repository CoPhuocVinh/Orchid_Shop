import { Skeleton } from "../ui/skeleton";


export const WalletSkeleton = () => {
    return (
      <div className="bg-gray-200 rounded-lg px-4 py-2 flex items-center">
        <div className="mr-2">
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="font-semibold">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    );
  };