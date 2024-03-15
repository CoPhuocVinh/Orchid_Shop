import { getAuctionByID, getProducts } from "@/lib/actions";
import { AuctionForm } from "./_components/auction-form";

import { IProductForm } from "@/types/dashboard";

const AuctionDashboardPage = async ({
  params,
}: {
  params: { auctionId: string };
}) => {

  // limit 100 product actived
  const searchParams = { page: "1", per_page: "100", active: "true" };

  const products = await getProducts(searchParams);

  const auction = await getAuctionByID(params.auctionId);

  const fotmatProducts: IProductForm[] = products.data.map((item) => ({
    productID: item.id,
    productName: item.productName,
  }));

  return (
    <div className="w-full min-h-screen xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[20px] dark:bg-darkblack-700 pt-[10px]">
      <div className="">
        <AuctionForm initialData={auction?.data} products={fotmatProducts} />
      </div>
    </div>
  );
};

export default AuctionDashboardPage;
