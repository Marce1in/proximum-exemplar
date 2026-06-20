import type { Metadata } from "next";
import { DoctorDashboardScreen } from "@/components/hub-family/hub-family-dashboard";
import { getDoctorDashboardMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Dashboard Médico | HUB Family",
  description: "Mock desktop do dashboard médico HUB Family.",
};

export default function DoctorDashboardPage() {
  return <DoctorDashboardScreen data={getDoctorDashboardMock()} />;
}
