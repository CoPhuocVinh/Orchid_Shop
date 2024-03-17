// import TransparentHeader from '@/components/header/transparent';
// import MobileNav from '@/components/ui/mobile-nav';
// import Footer from '@/components/footer/footer';

import Footer from "@/components/platform/footer/footer";
import TransparentHeader from "@/components/platform/header/transparent";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TransparentHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
      {/* <MobileNav /> */}
    </>
  );
}
