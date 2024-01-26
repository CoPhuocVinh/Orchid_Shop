import Wallet from "../wallet/page";

function RightSection() {
  return (
    <section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 2xl:w-[400px] 2xl:flex-col 2xl:space-x-0">
      <Wallet />
    </section>
  );
}

export default RightSection;
