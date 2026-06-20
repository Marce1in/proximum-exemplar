import type { Metadata } from "next";
import { HubFamilyStartScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyStartMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "HUB Family | Início",
  description: "Mock mobile do início HUB Family carregado por JSON local.",
};

export default function Home() {
  return <HubFamilyStartScreen data={getHubFamilyStartMock()} />;
}
