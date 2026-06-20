import type { Metadata } from "next";
import { DoctorDashboardScreen } from "@/components/hub-family/hub-family-dashboard";
import { getDoctorDashboardMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Painel médico | HUB Família",
  description: "Protótipo desktop do painel médico HUB Família.",
};

export default function DoctorDashboardPage() {
  return <DoctorDashboardScreen data={getDoctorDashboardMock()} />;
}
