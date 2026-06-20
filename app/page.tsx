import type { Metadata } from "next";
import { PatientDirectory } from "@/components/hub-family/hub-family-dashboard";
import { getDirectoryMock } from "@/lib/mock/hub-family";

export const metadata: Metadata = {
  title: "Diretório de Pacientes | Hub Family",
  description: "Mock do diretório clínico Hub Family carregado por JSON local.",
};

export default function Home() {
  return <PatientDirectory data={getDirectoryMock()} />;
}
