import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PatientRecordScreen } from "@/components/hub-family/hub-family-dashboard";
import {
  getPatientRecordMock,
  getPatientRecordStaticParams,
} from "@/lib/mock/hub-family";

type PatientRecordPageProps = {
  params: Promise<{
    patientId: string;
  }>;
};

export function generateStaticParams() {
  return getPatientRecordStaticParams();
}

export async function generateMetadata({
  params,
}: PatientRecordPageProps): Promise<Metadata> {
  const { patientId } = await params;
  const data = getPatientRecordMock(patientId);

  if (!data) {
    return {
      title: "Paciente não encontrado | Hub Family",
    };
  }

  return {
    title: `${data.patient.name} | Hub Family`,
    description: `Mock do prontuário clínico de ${data.patient.name}.`,
  };
}

export default async function PatientRecordPage({
  params,
}: PatientRecordPageProps) {
  const { patientId } = await params;
  const data = getPatientRecordMock(patientId);

  if (!data) {
    notFound();
  }

  return <PatientRecordScreen data={data} />;
}
