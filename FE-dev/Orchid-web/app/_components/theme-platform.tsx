"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function ThemePlatformProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  useLayoutEffect(() => {
    const isDarkTheme = resolvedTheme === "dark";

    if (isDarkTheme) {
      setTheme("light");
      router.refresh();
    }
  }, [setTheme, resolvedTheme, router]);

  return (
    <div className="flex min-h-full flex-col">
      {children}
    </div>
  );
}
