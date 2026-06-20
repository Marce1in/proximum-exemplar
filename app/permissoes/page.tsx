import type { Metadata } from "next";
import { PermissionsScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Permissões | HUB Família",
  description: "Protótipo mobile de permissões de acesso HUB Família.",
};

export default function PermissionsPage() {
  return <PermissionsScreen data={getHubFamilyAppMock()} />;
}
