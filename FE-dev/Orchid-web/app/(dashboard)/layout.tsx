import React from "react";
import ThemeDashboardProvider from "../_components/theme-dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeDashboardProvider>{children}</ThemeDashboardProvider>;
}
