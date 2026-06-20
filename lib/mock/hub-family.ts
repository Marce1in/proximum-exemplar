import mockPayload from "@/data/hub-family.mock.json";

export type PatientStatusTone = "stable" | "attention";

export type HubFamilyProvider = {
  name: string;
  role: string;
  avatarUrl: string;
};

export type DirectoryPatient = {
  id: string;
  slug: string;
  name: string;
  initials: string;
  age: number;
  status: string;
  statusTone: PatientStatusTone;
  heartRate: number;
  heartRateLabel: string;
  glucose: number;
  glucoseLabel: string;
  avatarUrl?: string;
  actionLabel?: string;
};

export type PatientVital = {
  id: "heart-rate" | "glucose";
  label: string;
  value: string;
  unit: string;
  status: string;
  trend: "down" | "stable";
  rangeLabel: string;
  chart: number[];
};

export type TimelineEvent = {
  type: "check" | "lab" | "therapy";
  title: string;
  description: string;
  time: string;
  attachment?: string;
};

export type FamilyAccess = {
  name: string;
  relationship: string;
  avatarUrl: string;
};

export type Medication = {
  name: string;
  instructions: string;
  tone: "lime" | "green";
};

export type PatientRecord = {
  slug: string;
  name: string;
  id: string;
  status: string;
  avatarUrl: string;
  demographics: {
    age: string;
    gender: string;
    bloodType: string;
    location: string;
  };
  searchPlaceholder: string;
  vitals: PatientVital[];
  timeline: TimelineEvent[];
  familyAccess: FamilyAccess[];
  medications: Medication[];
  nextSession: {
    label: string;
    date: string;
    time: string;
    doctor: string;
    specialty: string;
  };
};

export type HubFamilyMock = {
  brand: {
    name: string;
    subtitle: string;
    primaryColor: string;
  };
  directoryProvider: HubFamilyProvider;
  recordProvider: HubFamilyProvider;
  directory: {
    title: string;
    description: string;
    searchPlaceholder: string;
    familyToggleLabel: string;
    metrics: {
      totalPatients: {
        label: string;
        value: string;
        description: string;
      };
      attention: {
        label: string;
        value: string;
        tags: string[];
      };
      wellbeing: {
        label: string;
        value: number;
      };
    };
    patients: DirectoryPatient[];
    pagination: {
      summary: string;
      pages: number[];
      activePage: number;
    };
    recordPreviewSlug: string;
  };
  patientRecord: PatientRecord;
};

const hubFamilyMock = mockPayload as HubFamilyMock;

export function getHubFamilyBrand() {
  return hubFamilyMock.brand;
}

export function getDirectoryMock() {
  return {
    brand: hubFamilyMock.brand,
    provider: hubFamilyMock.directoryProvider,
    directory: hubFamilyMock.directory,
  };
}

export function getPatientRecordMock(patientId: string) {
  if (patientId !== hubFamilyMock.patientRecord.slug) {
    return null;
  }

  return {
    brand: hubFamilyMock.brand,
    provider: hubFamilyMock.recordProvider,
    patient: hubFamilyMock.patientRecord,
  };
}

export function getPatientRecordStaticParams() {
  return [{ patientId: hubFamilyMock.patientRecord.slug }];
}
