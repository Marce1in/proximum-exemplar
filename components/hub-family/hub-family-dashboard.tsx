import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BellIcon,
  CakeIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  DropletIcon,
  EyeIcon,
  FileTextIcon,
  FlaskConicalIcon,
  HeartPulseIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MapPinIcon,
  MessageCircleIcon,
  MoreVerticalIcon,
  PillIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShieldPlusIcon,
  StethoscopeIcon,
  TrendingUpIcon,
  UserPlusIcon,
  UsersIcon,
  VenusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  DirectoryPatient,
  HubFamilyMock,
  HubFamilyProvider,
  Medication,
  PatientRecord,
  PatientVital,
  TimelineEvent,
} from "@/lib/mock/hub-family";

type HubFamilyBrand = HubFamilyMock["brand"];
type DirectoryData = HubFamilyMock["directory"];

type DirectoryPageData = {
  brand: HubFamilyBrand;
  provider: HubFamilyProvider;
  directory: DirectoryData;
};

type PatientRecordPageData = {
  brand: HubFamilyBrand;
  provider: HubFamilyProvider;
  patient: PatientRecord;
};

const surface = {
  page: "bg-[#F8F9FA]",
  sidebar: "bg-[#F3F4F5]",
  low: "bg-[#F3F4F5]",
  high: "bg-[#E7E8E9]",
  border: "border-[#E1E3E4]",
  textMuted: "text-[#3E4A41]",
  lime: "bg-[#C0F063]",
};

function HubFamilyShell({
  brand,
  provider,
  searchPlaceholder,
  children,
}: {
  brand: HubFamilyBrand;
  provider: HubFamilyProvider;
  searchPlaceholder: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-h-screen text-[#191C1D]", surface.page)}>
      <aside
        className={cn(
          "border-b lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-b-0",
          surface.border,
          surface.sidebar,
        )}
      >
        <div className="flex h-full flex-col gap-4 px-4 py-4 lg:px-6 lg:py-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#2B985E] text-white">
              <ShieldPlusIcon aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="block text-sm leading-none font-extrabold text-[#2B985E]">
                {brand.name}
              </span>
              <span className="block text-xs font-medium text-[#6E7A70]">
                {brand.subtitle}
              </span>
            </span>
          </Link>

          <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-1 lg:flex-col lg:overflow-visible lg:pt-4">
            <span className="flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-[#3E4A41] opacity-60">
              <LayoutDashboardIcon aria-hidden="true" className="size-4" />
              Painel
            </span>
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 rounded-md border-r-0 border-[#2B985E] bg-[#C0F063]/35 px-3 py-2 text-xs font-bold text-[#2B985E] lg:border-r-4"
            >
              <UsersIcon
                aria-hidden="true"
                className="size-4 fill-[#2B985E]/10"
              />
              Pacientes
            </Link>
          </nav>

          <div className="hidden space-y-2 lg:block">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2B985E] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#237C4D]">
              <PlusIcon aria-hidden="true" className="size-4" />
              Novo Paciente
            </button>
            <a
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-[#3E4A41] transition hover:bg-[#C0F063]/30"
            >
              <CircleHelpIcon aria-hidden="true" className="size-4" />
              Central de Ajuda
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-[#3E4A41] transition hover:bg-[#C0F063]/30"
            >
              <LogOutIcon aria-hidden="true" className="size-4" />
              Sair
            </a>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header
          className={cn(
            "sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur lg:px-6",
            surface.border,
            surface.page,
          )}
        >
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6E7A70]"
            />
            <input
              className="h-10 w-full rounded-full border-0 bg-[#EDEEEF] pr-4 pl-10 text-sm ring-[#2B985E]/0 transition outline-none placeholder:text-[#6E7A70] focus:ring-2 focus:ring-[#2B985E]"
              placeholder={searchPlaceholder}
              type="search"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              aria-label="Notificações"
              className="relative hidden size-9 items-center justify-center rounded-full text-[#3E4A41] transition hover:bg-[#EDEEEF] sm:flex"
            >
              <BellIcon aria-hidden="true" className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-[#BA1A1A]" />
            </button>
            <button
              aria-label="Configurações"
              className="hidden size-9 items-center justify-center rounded-full text-[#3E4A41] transition hover:bg-[#EDEEEF] sm:flex"
            >
              <SettingsIcon aria-hidden="true" className="size-4" />
            </button>
            <div className="hidden h-8 w-px bg-[#BDCABE] sm:block" />
            <div className="flex items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-[#EDEEEF]">
              <Image
                alt={`Avatar de ${provider.name}`}
                src={provider.avatarUrl}
                width={40}
                height={40}
                className="size-9 rounded-full border-2 border-[#2B985E] object-cover"
                priority
              />
              <div className="hidden text-right lg:block">
                <p className="text-xs leading-tight font-bold">
                  {provider.name}
                </p>
                <p className="text-[10px] font-medium text-[#6E7A70] uppercase">
                  {provider.role}
                </p>
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

function PatientAvatar({
  name,
  initials,
  avatarUrl,
  size = "sm",
  priority = false,
}: {
  name: string;
  initials: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}) {
  const sizes = {
    sm: { className: "size-10 text-sm", image: 40 },
    md: { className: "size-12 text-base", image: 48 },
    lg: { className: "size-24 text-2xl", image: 96 },
  }[size];

  if (avatarUrl) {
    return (
      <Image
        alt={`Avatar de ${name}`}
        src={avatarUrl}
        width={sizes.image}
        height={sizes.image}
        className={cn(
          "shrink-0 rounded-lg border-2 border-white object-cover shadow-sm",
          sizes.className,
        )}
        priority={priority}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-[#E1E3E4] font-bold text-[#2B985E]",
        sizes.className,
      )}
    >
      {initials}
    </span>
  );
}

function StatusPill({ patient }: { patient: DirectoryPatient }) {
  const stable = patient.statusTone === "stable";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold",
        stable
          ? "bg-[#C0F063]/30 text-[#4D6C00]"
          : "bg-[#FFDAD6] text-[#93000A]",
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          stable ? "bg-[#496800]" : "animate-pulse bg-[#BA1A1A]",
        )}
      />
      {patient.status}
    </span>
  );
}

function MetricCards({ directory }: { directory: DirectoryData }) {
  const { totalPatients, attention, wellbeing } = directory.metrics;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="relative overflow-hidden rounded-lg bg-[#2B985E] p-6 text-white shadow-sm">
        <div className="relative z-10">
          <p className="mb-2 text-xs font-semibold tracking-widest uppercase opacity-80">
            {totalPatients.label}
          </p>
          <p className="text-4xl font-bold tracking-normal">
            {totalPatients.value}
          </p>
          <p className="mt-2 flex items-center gap-1 text-sm font-medium">
            <TrendingUpIcon aria-hidden="true" className="size-4" />
            {totalPatients.description}
          </p>
        </div>
        <UsersIcon
          aria-hidden="true"
          className="absolute -right-6 -bottom-8 size-32 text-white/10"
        />
      </article>

      <article className="rounded-lg border border-[#E1E3E4] bg-white p-6 shadow-sm">
        <p className="mb-2 text-xs font-semibold tracking-widest text-[#6E7A70] uppercase">
          {attention.label}
        </p>
        <p className="text-4xl font-bold tracking-normal text-[#BA1A1A]">
          {attention.value}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {attention.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#FFDAD6] px-2 py-1 text-[10px] font-bold text-[#93000A]"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>

      <article className="rounded-lg border border-[#496800]/10 bg-[#C0F063] p-6 shadow-sm">
        <p className="mb-2 text-xs font-semibold tracking-widest text-[#4D6C00] uppercase">
          {wellbeing.label}
        </p>
        <p className="text-4xl font-bold tracking-normal text-[#496800]">
          {wellbeing.value}%
        </p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/45">
          <div
            className="h-full rounded-full bg-[#496800]"
            style={{ width: `${wellbeing.value}%` }}
          />
        </div>
      </article>
    </section>
  );
}

function PatientRow({
  patient,
  recordPreviewSlug,
}: {
  patient: DirectoryPatient;
  recordPreviewSlug: string;
}) {
  const attention = patient.statusTone === "attention";

  return (
    <article
      className={cn(
        "grid gap-4 border-b border-[#EDEEEF] p-4 transition last:border-b-0 hover:-translate-y-0.5 hover:bg-white hover:shadow-md lg:grid-cols-12 lg:items-center lg:p-5",
        attention && "bg-[#FFDAD6]/15",
      )}
    >
      <div className="flex min-w-0 items-center gap-3 lg:col-span-4">
        <PatientAvatar
          name={patient.name}
          initials={patient.initials}
          avatarUrl={patient.avatarUrl}
        />
        <div className="min-w-0">
          <p className="truncate text-base font-bold">{patient.name}</p>
          <p className="text-xs font-medium text-[#6E7A70]">
            ID: {patient.id} - Idade: {patient.age}
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <StatusPill patient={patient} />
      </div>

      <div
        className={cn(
          "flex items-baseline justify-between gap-2 lg:col-span-2 lg:justify-center",
          attention && "text-[#BA1A1A]",
        )}
      >
        <span className="text-xs font-semibold text-[#6E7A70] lg:hidden">
          Batimentos
        </span>
        <span className="text-lg font-semibold">
          {patient.heartRate}{" "}
          <span className="text-xs font-normal text-[#6E7A70]">
            {patient.heartRateLabel}
          </span>
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-2 lg:col-span-2 lg:justify-center">
        <span className="text-xs font-semibold text-[#6E7A70] lg:hidden">
          Glicose
        </span>
        <span className="text-lg font-semibold">
          {patient.glucose}{" "}
          <span className="text-xs font-normal text-[#6E7A70]">
            {patient.glucoseLabel}
          </span>
        </span>
      </div>

      <div className="flex items-center justify-end gap-2 lg:col-span-2">
        {patient.actionLabel ? (
          <Link
            href={`/pacientes/${recordPreviewSlug}`}
            className="rounded-md bg-[#2B985E] px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#237C4D]"
          >
            {patient.actionLabel}
          </Link>
        ) : (
          <Link
            href={`/pacientes/${recordPreviewSlug}`}
            aria-label={`Abrir prontuário de ${patient.name}`}
            className="flex size-9 items-center justify-center rounded-md text-[#2B985E] transition hover:bg-[#EDEEEF]"
          >
            <EyeIcon aria-hidden="true" className="size-4" />
          </Link>
        )}
        <button
          aria-label={`Mais ações para ${patient.name}`}
          className="flex size-9 items-center justify-center rounded-md text-[#3E4A41] transition hover:bg-[#EDEEEF]"
        >
          <MoreVerticalIcon aria-hidden="true" className="size-4" />
        </button>
      </div>
    </article>
  );
}

export function PatientDirectory({ data }: { data: DirectoryPageData }) {
  const { brand, provider, directory } = data;

  return (
    <HubFamilyShell
      brand={brand}
      provider={provider}
      searchPlaceholder={directory.searchPlaceholder}
    >
      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:px-8 lg:py-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-normal text-[#191C1D]">
              {directory.title}
            </h1>
            <p className="mt-1 text-sm text-[#3E4A41]">
              {directory.description}
            </p>
          </div>

          <label className="flex w-fit items-center gap-3 rounded-lg border border-[#E1E3E4] bg-white px-4 py-3 text-xs font-semibold text-[#6E7A70] shadow-sm">
            {directory.familyToggleLabel}
            <input className="peer sr-only" type="checkbox" />
            <span className="relative h-6 w-11 rounded-full bg-[#E1E3E4] transition peer-checked:bg-[#2B985E] after:absolute after:top-1 after:left-1 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition peer-checked:after:translate-x-5" />
          </label>
        </section>

        <MetricCards directory={directory} />

        <section className="overflow-hidden rounded-lg border border-[#E1E3E4] bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-[#E1E3E4] bg-[#F3F4F5] p-5 text-xs font-semibold tracking-wider text-[#6E7A70] uppercase lg:grid">
            <div className="col-span-4">Nome do Paciente</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-center">Batimentos (BPM)</div>
            <div className="col-span-2 text-center">Glicose (mg/dL)</div>
            <div className="col-span-2 text-right">Ações</div>
          </div>

          {directory.patients.map((patient) => (
            <PatientRow
              key={patient.id}
              patient={patient}
              recordPreviewSlug={directory.recordPreviewSlug}
            />
          ))}
        </section>

        <footer className="flex flex-col gap-3 px-1 text-sm text-[#6E7A70] sm:flex-row sm:items-center sm:justify-between">
          <p>{directory.pagination.summary}</p>
          <div className="flex items-center gap-1">
            <button
              aria-label="Página anterior"
              className="flex size-9 items-center justify-center rounded-md border border-[#E1E3E4] bg-white transition hover:bg-[#F3F4F5]"
            >
              <ChevronLeftIcon aria-hidden="true" className="size-4" />
            </button>
            {directory.pagination.pages.map((page) => (
              <button
                key={page}
                className={cn(
                  "flex size-9 items-center justify-center rounded-md border text-sm font-bold transition",
                  page === directory.pagination.activePage
                    ? "border-[#2B985E] bg-[#2B985E] text-white"
                    : "border-[#E1E3E4] bg-white text-[#191C1D] hover:bg-[#F3F4F5]",
                )}
              >
                {page}
              </button>
            ))}
            <button
              aria-label="Próxima página"
              className="flex size-9 items-center justify-center rounded-md border border-[#E1E3E4] bg-white transition hover:bg-[#F3F4F5]"
            >
              <ChevronRightIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        </footer>
      </main>
    </HubFamilyShell>
  );
}

function VitalIcon({ vital }: { vital: PatientVital }) {
  const Icon = vital.id === "heart-rate" ? HeartPulseIcon : DropletIcon;

  return (
    <span
      className={cn(
        "flex size-12 items-center justify-center rounded-lg",
        vital.id === "heart-rate" ? "bg-[#2B985E]/10" : "bg-[#C0F063]/25",
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-6",
          vital.id === "heart-rate"
            ? "animate-pulse text-[#2B985E]"
            : "text-[#496800]",
        )}
      />
    </span>
  );
}

function VitalCard({ vital }: { vital: PatientVital }) {
  const isHeart = vital.id === "heart-rate";

  return (
    <article
      className={cn(
        "rounded-lg border-l-4 bg-white p-5 shadow-sm",
        isHeart ? "border-[#2B985E]" : "border-[#496800]",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <VitalIcon vital={vital} />
        <span className="text-xs font-semibold text-[#6E7A70]">
          {vital.rangeLabel}
        </span>
      </div>

      <p className="text-xs font-semibold tracking-wider text-[#6E7A70] uppercase">
        {vital.label}
      </p>
      <div className="mt-1 flex flex-wrap items-baseline gap-2">
        <p className="text-3xl font-bold">
          {vital.value}{" "}
          <span className="text-sm font-normal text-[#6E7A70]">
            {vital.unit}
          </span>
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-bold",
            isHeart ? "text-[#2B985E]" : "text-[#496800]",
          )}
        >
          {vital.trend === "down" ? (
            <TrendingUpIcon aria-hidden="true" className="size-3 rotate-180" />
          ) : (
            <CheckCircle2Icon aria-hidden="true" className="size-3" />
          )}
          {vital.status}
        </span>
      </div>

      <div className="mt-6 flex h-16 items-end gap-1">
        {vital.chart.map((height, index) => (
          <span
            key={`${vital.id}-${height}-${index}`}
            className={cn(
              "w-full rounded-t-sm",
              isHeart ? "bg-[#2B985E]" : "bg-[#496800]",
              index % 3 === 0 && "opacity-45",
              index % 3 === 1 && "opacity-70",
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </article>
  );
}

function timelineIcon(event: TimelineEvent): {
  Icon: LucideIcon;
  className: string;
} {
  if (event.type === "lab") {
    return {
      Icon: FlaskConicalIcon,
      className: "bg-[#C0F063] text-[#4D6C00]",
    };
  }

  if (event.type === "therapy") {
    return {
      Icon: StethoscopeIcon,
      className: "bg-[#276749] text-white",
    };
  }

  return {
    Icon: CheckCircle2Icon,
    className: "bg-[#2B985E] text-white",
  };
}

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Linha do Tempo</h2>
        <button className="text-xs font-bold text-[#2B985E] transition hover:text-[#237C4D]">
          Ver Histórico Completo
        </button>
      </div>

      <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-[#E1E3E4]">
        {events.map((event) => {
          const { Icon, className } = timelineIcon(event);

          return (
            <div
              key={`${event.title}-${event.time}`}
              className="relative pl-14"
            >
              <span
                className={cn(
                  "absolute top-1 left-0 z-10 flex size-10 items-center justify-center rounded-full border-4 border-[#F8F9FA]",
                  className,
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#3E4A41]">
                    {event.description}
                  </p>
                  {event.attachment ? (
                    <button className="mt-2 inline-flex items-center gap-2 rounded-md border border-[#BDCABE] bg-[#EDEEEF] px-3 py-1.5 text-xs font-medium text-[#3E4A41] transition hover:bg-[#E1E3E4]">
                      <FileTextIcon aria-hidden="true" className="size-4" />
                      {event.attachment}
                    </button>
                  ) : null}
                </div>
                <span className="shrink-0 text-xs font-semibold whitespace-nowrap text-[#6E7A70]">
                  {event.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function FamilyAccessCard({ patient }: { patient: PatientRecord }) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Acesso Familiar</h2>
        <button
          aria-label="Adicionar familiar"
          className="flex size-8 items-center justify-center rounded-full bg-[#E7E8E9] text-[#191C1D] transition hover:bg-[#BDCABE]"
        >
          <UserPlusIcon aria-hidden="true" className="size-4" />
        </button>
      </div>
      <div className="space-y-4">
        {patient.familyAccess.map((family) => (
          <button
            key={family.name}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <span className="flex min-w-0 items-center gap-3">
              <Image
                alt={`Avatar de ${family.name}`}
                src={family.avatarUrl}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold">
                  {family.name}
                </span>
                <span className="block text-[10px] font-semibold tracking-wider text-[#6E7A70] uppercase">
                  {family.relationship}
                </span>
              </span>
            </span>
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-[#6E7A70]"
            />
          </button>
        ))}
      </div>
    </article>
  );
}

function MedicationRow({ medication }: { medication: Medication }) {
  const lime = medication.tone === "lime";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border-l-4 p-3",
        lime
          ? "border-[#496800] bg-[#C0F063]/25"
          : "border-[#2B985E] bg-[#2B985E]/10",
      )}
    >
      <PillIcon
        aria-hidden="true"
        className={cn(
          "size-5 shrink-0",
          lime ? "text-[#496800]" : "text-[#2B985E]",
        )}
      />
      <div>
        <p className="text-sm font-bold">{medication.name}</p>
        <p className="text-xs text-[#6E7A70]">{medication.instructions}</p>
      </div>
    </div>
  );
}

function MedicationCard({ patient }: { patient: PatientRecord }) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">Medicação Atual</h2>
      <div className="space-y-3">
        {patient.medications.map((medication) => (
          <MedicationRow key={medication.name} medication={medication} />
        ))}
      </div>
      <button className="mt-5 w-full rounded-lg border-2 border-dashed border-[#BDCABE] px-4 py-3 text-xs font-bold text-[#6E7A70] transition hover:bg-[#F3F4F5]">
        + Adicionar Nova Prescrição
      </button>
    </article>
  );
}

function SessionCard({ patient }: { patient: PatientRecord }) {
  const { nextSession } = patient;

  return (
    <article className="rounded-lg bg-[#2B985E] p-5 text-white shadow-lg">
      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="flex size-10 items-center justify-center rounded-lg bg-white/20">
          <CalendarDaysIcon aria-hidden="true" className="size-5" />
        </span>
        <span className="text-xs font-bold tracking-widest uppercase opacity-80">
          {nextSession.label}
        </span>
      </div>
      <p className="text-xl font-semibold">{nextSession.date}</p>
      <p className="mt-2 text-sm opacity-90">
        {nextSession.time} - {nextSession.doctor} ({nextSession.specialty})
      </p>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button className="rounded-md bg-white px-3 py-2 text-xs font-bold text-[#2B985E] transition hover:bg-white/90">
          Confirmar
        </button>
        <button className="rounded-md border border-white/35 px-3 py-2 text-xs font-bold transition hover:bg-white/10">
          Reagendar
        </button>
      </div>
    </article>
  );
}

export function PatientRecordScreen({ data }: { data: PatientRecordPageData }) {
  const { brand, provider, patient } = data;

  return (
    <HubFamilyShell
      brand={brand}
      provider={provider}
      searchPlaceholder={patient.searchPlaceholder}
    >
      <main className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-6 lg:px-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-fit">
              <PatientAvatar
                name={patient.name}
                initials="CS"
                avatarUrl={patient.avatarUrl}
                size="lg"
                priority
              />
              <span className="absolute -right-2 -bottom-2 rounded-md bg-[#2B985E] px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                {patient.status}
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold tracking-normal">
                  {patient.name}
                </h1>
                <span className="rounded-full bg-[#C0F063] px-3 py-1 text-xs font-bold text-[#4D6C00]">
                  ID: {patient.id}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#3E4A41]">
                <span className="inline-flex items-center gap-1">
                  <CakeIcon aria-hidden="true" className="size-4" />
                  {patient.demographics.age}
                </span>
                <span className="inline-flex items-center gap-1">
                  <VenusIcon aria-hidden="true" className="size-4" />
                  {patient.demographics.gender}
                </span>
                <span className="inline-flex items-center gap-1">
                  <DropletIcon aria-hidden="true" className="size-4" />
                  {patient.demographics.bloodType}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon aria-hidden="true" className="size-4" />
                  {patient.demographics.location}
                </span>
              </div>
            </div>
          </div>

          <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#2B985E] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#237C4D]">
            <CalendarDaysIcon aria-hidden="true" className="size-4" />
            Agendar Visita
          </button>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 grid gap-6 lg:col-span-8">
            <div className="grid gap-6 md:grid-cols-2">
              {patient.vitals.map((vital) => (
                <VitalCard key={vital.id} vital={vital} />
              ))}
            </div>
            <Timeline events={patient.timeline} />
          </div>

          <aside className="col-span-12 grid content-start gap-6 lg:col-span-4">
            <FamilyAccessCard patient={patient} />
            <MedicationCard patient={patient} />
            <SessionCard patient={patient} />
          </aside>
        </section>
      </main>

      <button
        aria-label="Abrir conversa"
        className="fixed right-5 bottom-5 z-40 flex size-12 items-center justify-center rounded-full bg-[#2B985E] text-white shadow-xl transition hover:scale-105"
      >
        <MessageCircleIcon aria-hidden="true" className="size-5" />
      </button>
    </HubFamilyShell>
  );
}
