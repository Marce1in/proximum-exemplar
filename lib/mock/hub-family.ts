import "server-only";

import mockPayload from "@/data/hub-family.mock.json";

export type HubFamilyBrand = {
  name: string;
  tagline: string;
  primaryColor: string;
};

export type HubFamilyNavigationItem = {
  label: string;
  href: string;
  icon: "dashboard" | "family" | "health" | "profile";
};

export type FamilyMember = {
  id: string;
  name: string;
  relationship: string;
  age: string;
  avatarUrl: string;
  status: string;
  statusTone: "authorized" | "pending" | "dependent";
  href: string;
};

export type ProfileAction = {
  label: string;
  href: string;
  tone: "primary" | "secondary" | "danger";
  icon: "calendar" | "history" | "emergency";
};

export type Medication = {
  name: string;
  instructions: string;
};

export type MonitoringDevice = {
  name: string;
  description: string;
  status: string;
  statusTone: "connected" | "disconnected";
  detail?: string;
  actionLabel?: string;
  icon: "sensor" | "watch";
};

export type MonitoringRecord = {
  label: string;
  value: string;
  unit: string;
  trend: string;
  progress?: number;
  description: string;
  icon: "glucose" | "activity";
};

export type PermissionItem = {
  label: string;
  description: string;
  checked: boolean;
  icon:
    | "history"
    | "medication"
    | "allergy"
    | "monitoring"
    | "emergency"
    | "doctor"
    | "hospital";
};

export type PermissionSection = {
  title: string;
  items: PermissionItem[];
};

export type DoctorMetric = {
  label: string;
  value: string;
  description: string;
  tone: "primary" | "danger" | "neutral";
  icon: "groups" | "warning" | "family";
};

export type DoctorPatient = {
  name: string;
  id: string;
  initials: string;
  familyGroup: string;
  lastMeasurement: string;
  measurementDetail: string;
  status: string;
  statusTone: "attention" | "stable";
};

export type HubFamilyMock = {
  brand: HubFamilyBrand;
  start: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    helperText: string;
  };
  navigation: HubFamilyNavigationItem[];
  family: {
    title: string;
    description: string;
    members: FamilyMember[];
  };
  profile: {
    id: string;
    name: string;
    age: string;
    role: string;
    avatarUrl: string;
    actions: ProfileAction[];
    conditions: string[];
    allergies: string[];
    medications: Medication[];
    emergencyContact: {
      name: string;
      relationship: string;
      phoneLabel: string;
      messageLabel: string;
    };
    referenceDoctor: {
      name: string;
      specialty: string;
    };
  };
  monitoring: {
    title: string;
    description: string;
    devices: MonitoringDevice[];
    records: MonitoringRecord[];
    notice: string;
  };
  permissions: {
    requester: string;
    title: string;
    description: string;
    sections: PermissionSection[];
    buttonLabel: string;
    footnote: string;
  };
  accessRequest: {
    title: string;
    description: string;
    buttonLabel: string;
    backLabel: string;
    securityLabel: string;
  };
  emergency: {
    exitLabel: string;
    title: string;
    subtitle: string;
    patient: {
      name: string;
      age: string;
      avatarUrl: string;
      status: string;
    };
    conditions: string[];
    allergies: string[];
    medications: string[];
    emergencyContact: {
      name: string;
      relationship: string;
      phoneLabel: string;
      messageLabel: string;
    };
  };
  doctorDashboard: {
    provider: {
      name: string;
      role: string;
      avatarUrl: string;
    };
    title: string;
    description: string;
    searchPlaceholder: string;
    metrics: DoctorMetric[];
    tableTitle: string;
    tableSubtitle: string;
    patients: DoctorPatient[];
    paginationSummary: string;
  };
};

const hubFamilyMock = mockPayload as HubFamilyMock;

export function getHubFamilyMock() {
  return hubFamilyMock;
}

export function getHubFamilyStartMock() {
  return {
    brand: hubFamilyMock.brand,
    start: hubFamilyMock.start,
  };
}

export function getHubFamilyAppMock() {
  return {
    brand: hubFamilyMock.brand,
    navigation: hubFamilyMock.navigation,
    family: hubFamilyMock.family,
    profile: hubFamilyMock.profile,
    monitoring: hubFamilyMock.monitoring,
    permissions: hubFamilyMock.permissions,
    accessRequest: hubFamilyMock.accessRequest,
    emergency: hubFamilyMock.emergency,
  };
}

export function getDoctorDashboardMock() {
  return {
    brand: hubFamilyMock.brand,
    navigation: hubFamilyMock.navigation,
    dashboard: hubFamilyMock.doctorDashboard,
  };
}
