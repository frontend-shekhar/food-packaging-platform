import RoleGuardLayoutWrapper from "@/app/(dashboard)/components/RoleGuardLayoutWrapper";
import { ROLES } from "@/constants/common.constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGuardLayoutWrapper role={[ROLES.SUPER_ADMIN]}>
      {children}
    </RoleGuardLayoutWrapper>
  );
}
