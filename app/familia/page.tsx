import type { Metadata } from "next";
import { HubFamilyScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Minha Família | HUB Family",
  description: "Mock mobile da família HUB Family carregado por JSON local.",
};

export default function FamilyPage() {
  return <HubFamilyScreen data={getHubFamilyAppMock()} />;
}
