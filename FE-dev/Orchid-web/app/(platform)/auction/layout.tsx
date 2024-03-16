import BreadCrumb from "@/components/platform/bread-crumb";
import Footer from "@/components/platform/footer/footer";
import AuctionHeader from "@/components/platform/header/auction-header";

export default function ListingDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <ListingDetailsHeader /> */}
      <AuctionHeader />

      <main className="flex-grow">{children}</main>
      <Footer className="pb-0 3xl:px-12 4xl:px-12" />
      {/* <ReserveBottomMenu /> */}
    </>
  );
}
