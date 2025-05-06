import AuthLayoutWrapper from "./components/AuthLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
