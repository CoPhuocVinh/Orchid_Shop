import React from "react";

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px] dark:bg-darkblack-700 overflow-x-auto">
      <div className="2xl:flex 2xl:space-x-[48px]">{children}</div>
    </main>
  );
}
