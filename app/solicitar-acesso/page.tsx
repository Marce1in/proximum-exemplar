import type { Metadata } from "next";
import { AccessRequestScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Solicitar Acesso | HUB Family",
  description: "Mock mobile para solicitar acesso aos dados de saúde.",
};

export default function AccessRequestPage() {
  return <AccessRequestScreen data={getHubFamilyAppMock()} />;
}
