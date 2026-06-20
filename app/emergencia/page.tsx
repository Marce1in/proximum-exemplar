import type { Metadata } from "next";
import { EmergencyScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Modo Emergência | HUB Family",
  description: "Mock mobile do resumo emergencial HUB Family.",
};

export default function EmergencyPage() {
  return <EmergencyScreen data={getHubFamilyAppMock()} />;
}
