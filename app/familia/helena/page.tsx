import type { Metadata } from "next";
import { HelenaProfileScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Perfil Helena | HUB Família",
  description: "Protótipo mobile do perfil de saúde de Helena.",
};

export default function HelenaProfilePage() {
  return <HelenaProfileScreen data={getHubFamilyAppMock()} />;
}
