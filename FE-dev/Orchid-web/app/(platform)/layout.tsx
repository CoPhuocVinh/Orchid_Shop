import ThemePlatformProvider from "../_components/theme-platform";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemePlatformProvider>{children}</ThemePlatformProvider>
    </>
  );
}
