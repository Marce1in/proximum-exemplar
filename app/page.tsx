import type { Metadata } from "next";
import { HubFamilyStartScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyStartMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "HUB Família | Início",
  description:
    "Protótipo mobile do início HUB Família carregado por JSON local.",
};

export default function Home() {
  return <HubFamilyStartScreen data={getHubFamilyStartMock()} />;
}
