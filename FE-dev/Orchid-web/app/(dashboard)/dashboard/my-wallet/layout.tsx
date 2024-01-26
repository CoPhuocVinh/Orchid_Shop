import React from "react";

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
          <div className="2xl:flex 2xl:space-x-[48px]">{children}</div>
        </main>
      );
}
