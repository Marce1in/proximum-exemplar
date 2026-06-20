import type { Metadata } from "next";
import { EmergencyScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Modo emergência | HUB Família",
  description: "Protótipo mobile do resumo emergencial HUB Família.",
};

export default function EmergencyPage() {
  return <EmergencyScreen data={getHubFamilyAppMock()} />;
}
