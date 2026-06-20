import type { Metadata } from "next";
import { MonitoringScreen } from "@/components/hub-family/hub-family-dashboard";
import { getHubFamilyAppMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Monitoramento | HUB Family",
  description: "Mock mobile de dispositivos e monitoramento HUB Family.",
};

export default function MonitoringPage() {
  return <MonitoringScreen data={getHubFamilyAppMock()} />;
}
