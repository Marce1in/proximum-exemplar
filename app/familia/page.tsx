import type { Metadata } from "next";
import { HubFamilyScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Minha família | HUB Família",
  description:
    "Protótipo mobile da família HUB Família carregado por JSON local.",
};

export default function FamilyPage() {
  return <HubFamilyScreen data={getHubFamilyAppMock()} />;
}
