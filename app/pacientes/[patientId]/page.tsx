import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [{ patientId: "helena" }, { patientId: "camila-soares" }];
}

export default function LegacyPatientPage() {
  redirect("/medico");
}
