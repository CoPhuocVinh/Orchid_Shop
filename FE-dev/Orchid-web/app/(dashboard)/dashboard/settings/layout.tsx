import React from "react";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px]">
    <div className="grid grid-cols-1 xl:grid-cols-12 bg-white dark:bg-darkblack-600 rounded-xl">
      {children}
    </div>
  </main>
  );
}
