import type { Metadata } from "next";
import { DoctorDashboardScreen } from "@/components/hub-family/hub-family-dashboard";
import { getDoctorDashboardMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Diretório de pacientes | HUB Família",
  description:
    "Protótipo desktop do diretório médico HUB Família carregado por JSON local.",
};

export default function Home() {
  return <DoctorDashboardScreen data={getDoctorDashboardMock()} />;
}
