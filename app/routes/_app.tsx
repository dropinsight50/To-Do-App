import { Outlet } from "@remix-run/react";
import { AppLayout } from "~/components/Layout";

export default function AppRouteLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
