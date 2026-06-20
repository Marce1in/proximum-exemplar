import type { Metadata } from "next";
import { AccessRequestScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Solicitar acesso | HUB Família",
  description: "Protótipo mobile para solicitar acesso aos dados de saúde.",
};

export default function AccessRequestPage() {
  return <AccessRequestScreen data={getHubFamilyAppMock()} />;
}
