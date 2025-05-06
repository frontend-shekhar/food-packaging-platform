import UserContextProvider from "@/utils/userContext";
import DashboardLayout from "./components/DashboardLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </UserContextProvider>
  );
}
