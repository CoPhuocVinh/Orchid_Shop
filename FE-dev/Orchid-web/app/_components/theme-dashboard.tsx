"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

const ThemeDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  useLayoutEffect(() => {
    const isDarkTheme = resolvedTheme === "light";

    if (isDarkTheme) {
      setTheme("dark");
      router.refresh();
    }
  }, [setTheme, resolvedTheme, router]);

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default ThemeDashboardProvider;
