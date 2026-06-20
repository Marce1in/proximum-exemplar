import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ActivityIcon,
  AlertTriangleIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  BabyIcon,
  BellIcon,
  BookOpenTextIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
  Clock3Icon,
  DropletIcon,
  FileClockIcon,
  FootprintsIcon,
  HeartIcon,
  HomeIcon,
  HospitalIcon,
  LayoutDashboardIcon,
  Link2Icon,
  ListFilterIcon,
  LockKeyholeIcon,
  LogInIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  PhoneIcon,
  PillIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShieldPlusIcon,
  ShieldUserIcon,
  SirenIcon,
  StethoscopeIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon,
  WatchIcon,
  WifiIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  DoctorMetric,
  DoctorPatient,
  FamilyMember,
  HubFamilyBrand,
  HubFamilyMock,
  HubFamilyNavigationItem,
  MonitoringDevice,
  MonitoringRecord,
  PermissionItem,
  ProfileAction,
} from "@/lib/mock/hub-family";

type StartData = {
  brand: HubFamilyBrand;
  start: HubFamilyMock["start"];
};

type AppData = {
  brand: HubFamilyBrand;
  navigation: HubFamilyNavigationItem[];
  family: HubFamilyMock["family"];
  profile: HubFamilyMock["profile"];
  monitoring: HubFamilyMock["monitoring"];
  permissions: HubFamilyMock["permissions"];
  accessRequest: HubFamilyMock["accessRequest"];
  emergency: HubFamilyMock["emergency"];
};

type DoctorDashboardData = {
  brand: HubFamilyBrand;
  navigation: HubFamilyNavigationItem[];
  dashboard: HubFamilyMock["doctorDashboard"];
};

const cardClass =
  "rounded-xl border border-[#DDE4E0] bg-white shadow-[0_4px_20px_rgba(0,153,81,0.08)]";

const navIconMap = {
  dashboard: LayoutDashboardIcon,
  family: UsersIcon,
  health: HeartIcon,
  profile: UserIcon,
} satisfies Record<HubFamilyNavigationItem["icon"], LucideIcon>;

const permissionIconMap = {
  history: FileClockIcon,
  medication: PillIcon,
  allergy: ShieldIcon,
  monitoring: ActivityIcon,
  emergency: SirenIcon,
  doctor: StethoscopeIcon,
  hospital: HospitalIcon,
} satisfies Record<PermissionItem["icon"], LucideIcon>;

function HubLogoMark({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center text-[#009B55]",
        size === "lg" ? "size-36" : "size-5",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 96" className="h-full w-full fill-current">
        <path d="M48 9 70 35H58l21 25H61l14 21H21l14-21H17l21-25H26L48 9Z" />
        <path d="M48 36 61 52H51v18h-6V52H35l13-16Z" fill="#F9F9FC" />
      </svg>
    </span>
  );
}

function BrandHeader({
  brand,
  right,
}: {
  brand: HubFamilyBrand;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#DDE4E0] bg-[#F9F9FC]/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[430px] items-center justify-between px-4">
        <Link href="/familia" className="flex items-center gap-2">
          <HubLogoMark />
          <span className="text-sm font-bold text-[#006A36]">{brand.name}</span>
        </Link>
        {right}
      </div>
    </header>
  );
}

function MobileScreen({
  brand,
  navigation,
  active,
  children,
  right,
  showNav = true,
  className,
}: {
  brand: HubFamilyBrand;
  navigation?: HubFamilyNavigationItem[];
  active?: HubFamilyNavigationItem["icon"];
  children: ReactNode;
  right?: ReactNode;
  showNav?: boolean;
  className?: string;
}) {
  return (
    <div className="min-h-dvh bg-[#F3F3F6] text-[#1A1C1E]">
      <div
        className={cn(
          "mx-auto min-h-dvh w-full max-w-[430px] bg-[#F9F9FC] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]",
          className,
        )}
      >
        <BrandHeader brand={brand} right={right} />
        <main className={cn("px-4 py-6", showNav && "pb-24")}>
          {children}
        </main>
        {showNav && navigation ? (
          <MobileBottomNav navigation={navigation} active={active} />
        ) : null}
      </div>
    </div>
  );
}

function MobileBottomNav({
  navigation,
  active,
}: {
  navigation: HubFamilyNavigationItem[];
  active?: HubFamilyNavigationItem["icon"];
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] border-t border-[#DDE4E0] bg-[#F9F9FC]/95 px-3 py-2 backdrop-blur">
      <div className="grid grid-cols-4">
        {navigation.map((item) => {
          const Icon = navIconMap[item.icon];
          const isActive = item.icon === active;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition",
                isActive
                  ? "text-[#2B985E]"
                  : "text-[#5D6461] hover:bg-[#F2F9F5] hover:text-[#2B985E]",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                aria-hidden="true"
                className={cn("size-4", isActive && "fill-[#2B985E]/10")}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function IconButtonLink({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-[#3E4A3F] transition hover:bg-[#F2F9F5]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function AvatarImage({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "size-12",
    md: "size-16",
    lg: "size-20",
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={96}
      height={96}
      className={cn(
        "shrink-0 rounded-full border-2 border-white object-cover shadow-sm",
        sizes[size],
      )}
    />
  );
}

export function HubFamilyStartScreen({ data }: { data: StartData }) {
  return (
    <div className="min-h-dvh bg-[#F3F3F6] text-[#1A1C1E]">
      <main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center justify-center bg-[#F9F9FC] px-6 py-12">
        <div className="mb-14 flex size-48 items-center justify-center rounded-full border border-[#DDE4E0] bg-white shadow-[0_12px_30px_rgba(0,153,81,0.08)]">
          <HubLogoMark size="lg" />
        </div>

        <h1 className="text-center text-2xl font-bold text-[#006A36]">
          {data.start.title}
        </h1>
        <p className="mt-4 max-w-72 text-center text-base leading-6 text-[#3E4A3F]">
          {data.start.subtitle}
        </p>

        <Link
          href="/familia"
          className="mt-14 inline-flex h-12 w-full max-w-[348px] items-center justify-center gap-3 rounded-lg bg-[#007A3D] px-5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,122,61,0.22)] transition hover:bg-[#006A36]"
        >
          <LogInIcon aria-hidden="true" className="size-4" />
          {data.start.buttonLabel}
        </Link>

        <p className="mt-8 text-center text-xs font-medium text-[#6D7A6E]">
          {data.start.helperText}
        </p>
      </main>
    </div>
  );
}

export function HubFamilyScreen({ data }: { data: AppData }) {
  return (
    <MobileScreen
      brand={data.brand}
      navigation={data.navigation}
      active="family"
      right={
        <IconButtonLink href="/familia/helena" label="Perfil">
          <BellIcon aria-hidden="true" className="size-4" />
        </IconButtonLink>
      }
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1C1E]">
          {data.family.title}
        </h1>
        <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#5D6461]">
          {data.family.description}
        </p>
      </div>

      <div className="space-y-4">
        {data.family.members.map((member) => (
          <FamilyMemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 mx-auto w-full max-w-[430px] px-4">
        <Link
          href="/solicitar-acesso"
          aria-label="Adicionar membro"
          className="pointer-events-auto ml-auto flex size-14 items-center justify-center rounded-2xl bg-[#007A3D] text-white shadow-[0_8px_22px_rgba(0,122,61,0.25)] transition hover:bg-[#006A36]"
        >
          <PlusIcon aria-hidden="true" className="size-6" />
        </Link>
      </div>
    </MobileScreen>
  );
}

function FamilyMemberCard({ member }: { member: FamilyMember }) {
  const statusClass = {
    authorized: "bg-[#E8F5ED] text-[#006A36]",
    pending: "bg-[#F0F0F3] text-[#59605D]",
    dependent: "bg-[#F0F0F3] text-[#59605D]",
  }[member.statusTone];

  return (
    <Link
      href={member.href}
      className={cn(
        cardClass,
        "group relative block overflow-hidden p-4 transition hover:-translate-y-0.5 hover:border-[#BDCABE]",
      )}
    >
      <div className="absolute top-0 right-0 size-28 -translate-y-8 translate-x-8 rounded-bl-full bg-[#F2F9F5]" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <AvatarImage src={member.avatarUrl} alt={member.name} size="sm" />
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-[#1A1C1E]">
              {member.name}
            </h2>
            <p className="text-sm text-[#3E4A3F]">
              {member.relationship} • {member.age}
            </p>
          </div>
        </div>

        <button
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[#1A1C1E] transition group-hover:bg-white"
          aria-label={`Mais opções de ${member.name}`}
        >
          <MoreVerticalIcon aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-[#DDE4E0] pt-4">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
            statusClass,
          )}
        >
          {member.statusTone === "dependent" ? (
            <BabyIcon aria-hidden="true" className="size-3" />
          ) : (
            <span
              className={cn(
                "size-2 rounded-full",
                member.statusTone === "authorized"
                  ? "bg-[#2B985E]"
                  : "bg-[#59605D]",
              )}
            />
          )}
          {member.status}
        </span>
        <ChevronRightIcon
          aria-hidden="true"
          className="size-5 text-[#BDCABE]"
        />
      </div>
    </Link>
  );
}

export function HelenaProfileScreen({ data }: { data: AppData }) {
  return (
    <MobileScreen
      brand={data.brand}
      navigation={data.navigation}
      active="profile"
      right={
        <IconButtonLink href="/familia" label="Voltar para família">
          <BellIcon aria-hidden="true" className="size-4" />
        </IconButtonLink>
      }
    >
      <Link
        href="/familia"
        className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-[#3E4A3F]"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        Voltar para Família
      </Link>

      <section
        className={cn(
          cardClass,
          "relative overflow-hidden px-5 py-6 text-center",
        )}
      >
        <div className="absolute top-0 right-0 h-full w-40 rounded-bl-[120px] bg-[#F2F9F5]" />
        <div className="relative mx-auto mb-4 w-fit">
          <AvatarImage
            src={data.profile.avatarUrl}
            alt={data.profile.name}
            size="lg"
          />
          <span className="absolute right-1 bottom-1 size-4 rounded-full border-2 border-white bg-[#64DE8D]" />
        </div>
        <div className="relative">
          <h1 className="text-2xl font-bold text-[#1A1C1E]">
            {data.profile.name}
          </h1>
          <p className="mt-1 text-sm text-[#5D6461]">
            {data.profile.age} • {data.profile.role}
          </p>

          <div className="mt-5 space-y-2">
            {data.profile.actions.map((action) => (
              <ProfileActionLink key={action.label} action={action} />
            ))}
          </div>
        </div>
      </section>

      <div className="mt-5 space-y-4">
        <InfoCard
          icon={ShieldCheckIcon}
          title="Condições"
          iconTone="text-[#2B985E]"
        >
          <BulletList items={data.profile.conditions} />
        </InfoCard>

        <InfoCard
          icon={AlertTriangleIcon}
          title="Alergias"
          tone="danger"
          iconTone="text-[#BA1A1A]"
          aside={<AlertTriangleIcon className="size-12 text-[#BA1A1A]/15" />}
        >
          <div className="flex flex-wrap gap-2">
            {data.profile.allergies.map((allergy) => (
              <span
                key={allergy}
                className="rounded-md bg-[#BA1A1A] px-3 py-1.5 text-xs font-bold text-white"
              >
                {allergy}
              </span>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          icon={PillIcon}
          title="Medicamentos Contínuos"
          iconTone="text-[#2B985E]"
        >
          <div className="space-y-2">
            {data.profile.medications.map((medication) => (
              <div
                key={medication.name}
                className="flex items-center justify-between rounded-lg bg-[#F3F3F6] px-3 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1A1C1E]">
                    {medication.name}
                  </p>
                  <p className="text-xs text-[#5D6461]">
                    {medication.instructions}
                  </p>
                </div>
                <Link2Icon aria-hidden="true" className="size-4 text-[#6D7A6E]" />
              </div>
            ))}
          </div>
          <Link
            href="/monitoramento"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold text-[#2B985E] transition hover:bg-[#F2F9F5]"
          >
            <PlusIcon aria-hidden="true" className="size-3" />
            Atualizar Receita
          </Link>
        </InfoCard>

        <InfoCard
          icon={PhoneIcon}
          title="Contato de Emergência"
          iconTone="text-[#2B985E]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#F0F0F3] text-[#59605D]">
                {data.profile.emergencyContact.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1A1C1E]">
                  {data.profile.emergencyContact.name}
                </p>
                <p className="text-xs text-[#5D6461]">
                  {data.profile.emergencyContact.relationship}
                </p>
              </div>
            </div>
            <Link
              href="/emergencia"
              aria-label={data.profile.emergencyContact.phoneLabel}
              className="flex size-10 items-center justify-center rounded-full border border-[#DDE4E0] text-[#2B985E] transition hover:bg-[#F2F9F5]"
            >
              <PhoneIcon aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </InfoCard>

        <InfoCard
          icon={StethoscopeIcon}
          title="Médico da Referência"
          iconTone="text-[#2B985E]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#1A1C1E]">
                {data.profile.referenceDoctor.name}
              </p>
              <p className="text-xs text-[#5D6461]">
                {data.profile.referenceDoctor.specialty}
              </p>
            </div>
            <HospitalIcon aria-hidden="true" className="size-5 text-[#BDCABE]" />
          </div>
        </InfoCard>
      </div>
    </MobileScreen>
  );
}

function ProfileActionLink({ action }: { action: ProfileAction }) {
  const Icon =
    action.icon === "calendar"
      ? CalendarDaysIcon
      : action.icon === "history"
        ? BookOpenTextIcon
        : SirenIcon;

  const actionClass = {
    primary: "bg-[#007A3D] text-white hover:bg-[#006A36]",
    secondary:
      "border border-[#BDCABE] bg-white text-[#3E4A3F] hover:bg-[#F2F9F5]",
    danger: "bg-[#BA1A1A] text-white hover:bg-[#93000A]",
  }[action.tone];

  return (
    <Link
      href={action.href}
      className={cn(
        "mx-auto flex h-10 max-w-52 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition",
        actionClass,
      )}
    >
      <Icon aria-hidden="true" className="size-4" />
      {action.label}
    </Link>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
  tone: cardTone = "default",
  iconTone = "text-[#59605D]",
  aside,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  tone?: "default" | "danger";
  iconTone?: string;
  aside?: ReactNode;
}) {
  return (
    <section
      className={cn(
        cardClass,
        "relative overflow-hidden p-4",
        cardTone === "danger" &&
          "border-[#FFDAD6] bg-[#FFF7F6] shadow-[inset_-4px_0_0_#BA1A1A]",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-full bg-[#E8F5ED]",
              cardTone === "danger" && "bg-[#FFDAD6]",
              iconTone,
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
          </span>
          <h2
            className={cn(
              "text-lg font-bold text-[#2B985E]",
              cardTone === "danger" && "text-[#BA1A1A]",
            )}
          >
            {title}
          </h2>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-[#3E4A3F]">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <CircleIcon aria-hidden="true" className="size-2 fill-[#2B985E]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function MonitoringScreen({ data }: { data: AppData }) {
  return (
    <MobileScreen
      brand={data.brand}
      navigation={data.navigation}
      active="health"
      right={
        <IconButtonLink href="/familia/helena" label="Voltar para perfil">
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
        </IconButtonLink>
      }
    >
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[#1A1C1E]">
          {data.monitoring.title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#5D6461]">
          {data.monitoring.description}
        </p>
      </div>

      <section className="mb-7">
        <h2 className="mb-3 text-base font-semibold text-[#1A1C1E]">
          Meus Dispositivos
        </h2>
        <div className="space-y-3">
          {data.monitoring.devices.map((device) => (
            <DeviceCard key={device.name} device={device} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[#1A1C1E]">
          Últimos Registros
        </h2>
        <div className="space-y-4">
          {data.monitoring.records.map((record) => (
            <MonitoringRecordCard key={record.label} record={record} />
          ))}
        </div>
      </section>

      <div className="mt-8 flex items-center justify-center gap-3 rounded-lg border border-[#DDE4E0] bg-white px-4 py-5 text-center text-sm text-[#5D6461]">
        <Clock3Icon aria-hidden="true" className="size-4 shrink-0" />
        <span>{data.monitoring.notice}</span>
      </div>
    </MobileScreen>
  );
}

function DeviceCard({ device }: { device: MonitoringDevice }) {
  const Icon = device.icon === "sensor" ? WifiIcon : WatchIcon;
  const connected = device.statusTone === "connected";

  return (
    <article className={cn(cardClass, "p-4")}>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full",
            connected
              ? "bg-[#E8F5ED] text-[#2B985E]"
              : "bg-[#F0F0F3] text-[#59605D]",
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-[#1A1C1E]">
                {device.name}
              </h3>
              <p className="text-xs text-[#5D6461]">{device.description}</p>
            </div>
            <span
              className={cn(
                "rounded-full border px-2 py-1 text-[10px] font-semibold",
                connected
                  ? "border-[#B8DEC7] bg-[#E8F5ED] text-[#2B985E]"
                  : "border-[#DDE4E0] bg-[#F3F3F6] text-[#59605D]",
              )}
            >
              {device.status}
            </span>
          </div>
          {device.detail ? (
            <p className="mt-2 flex items-center gap-1 text-xs text-[#3E4A3F]">
              <CheckCircle2Icon aria-hidden="true" className="size-3" />
              {device.detail}
            </p>
          ) : null}
          {device.actionLabel ? (
            <Link
              href="/monitoramento"
              className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#2B985E] text-xs font-bold text-[#2B985E] transition hover:bg-[#F2F9F5]"
            >
              <Link2Icon aria-hidden="true" className="size-4" />
              {device.actionLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function MonitoringRecordCard({ record }: { record: MonitoringRecord }) {
  const Icon = record.icon === "glucose" ? DropletIcon : FootprintsIcon;

  return (
    <article className={cn(cardClass, "p-5")}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-[#2B985E]">
          <Icon aria-hidden="true" className="size-4" />
          {record.label}
        </div>
        <MoreVerticalIcon aria-hidden="true" className="size-5 text-[#5D6461]" />
      </div>
      <div className="flex items-end gap-2">
        <strong className="text-5xl font-bold leading-none text-[#1A1C1E]">
          {record.value}
        </strong>
        <span className="pb-1 text-sm text-[#5D6461]">{record.unit}</span>
      </div>
      <p className="mt-3 text-xs text-[#3E4A3F]">{record.trend}</p>
      {typeof record.progress === "number" ? (
        <div className="mt-3 h-2 rounded-full bg-[#E2E2E5]">
          <div
            className="h-full rounded-full bg-[#1A1C1E]"
            style={{ width: `${record.progress}%` }}
          />
        </div>
      ) : (
        <div className="mt-4 h-px bg-[#E2E2E5]" />
      )}
      <p className="mt-4 text-xs text-[#5D6461]">{record.description}</p>
    </article>
  );
}

export function PermissionsScreen({ data }: { data: AppData }) {
  return (
    <MobileScreen
      brand={data.brand}
      showNav={false}
      right={
        <IconButtonLink href="/familia/helena" label="Fechar">
          <XIcon aria-hidden="true" className="size-4" />
        </IconButtonLink>
      }
    >
      <section className={cn(cardClass, "mt-6 p-5")}>
        <div className="mb-6 text-center">
          <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-[#E8F5ED] text-[#2B985E]">
            <ShieldUserIcon aria-hidden="true" className="size-7" />
          </span>
          <h1 className="text-xl font-bold text-[#1A1C1E]">
            {data.permissions.title}
          </h1>
          <p className="mx-auto mt-2 max-w-64 text-sm leading-6 text-[#5D6461]">
            {data.permissions.description}
          </p>
        </div>

        <div className="space-y-5">
          {data.permissions.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-xs font-bold uppercase text-[#59605D]">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <PermissionCard key={item.label} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <Link
          href="/familia/helena"
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#007A3D] px-4 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,122,61,0.18)] transition hover:bg-[#006A36]"
        >
          <ShieldCheckIcon aria-hidden="true" className="size-4" />
          {data.permissions.buttonLabel}
        </Link>
        <p className="mx-auto mt-4 max-w-72 text-center text-xs leading-5 text-[#6D7A6E]">
          {data.permissions.footnote}
        </p>
      </section>
    </MobileScreen>
  );
}

function PermissionCard({ item }: { item: PermissionItem }) {
  const Icon = permissionIconMap[item.icon];

  return (
    <article className="flex items-start gap-3 rounded-lg border border-[#DDE4E0] bg-white p-3">
      <span
        className={cn(
          "mt-1 flex size-5 shrink-0 items-center justify-center rounded-sm border",
          item.checked
            ? "border-[#2B985E] bg-[#2B985E] text-white"
            : "border-[#DDE4E0] bg-white text-transparent",
        )}
      >
        <CheckCircle2Icon aria-hidden="true" className="size-3" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold leading-5 text-[#1A1C1E]">
          {item.label}
        </h3>
        <p className="mt-1 text-xs leading-5 text-[#5D6461]">
          {item.description}
        </p>
      </div>
      <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-[#BDCABE]" />
    </article>
  );
}

export function AccessRequestScreen({ data }: { data: AppData }) {
  return (
    <MobileScreen brand={data.brand} showNav={false}>
      <div className="flex min-h-[calc(100dvh-104px)] items-center justify-center py-10">
        <section className={cn(cardClass, "w-full p-8 text-center")}>
          <div className="relative mx-auto mb-8 flex size-20 items-center justify-center rounded-full border border-[#DDE4E0] bg-[#F9F9FC] text-[#2B985E]">
            <ShieldPlusIcon aria-hidden="true" className="size-9" />
            <span className="absolute right-2 bottom-2 flex size-6 items-center justify-center rounded-full border border-[#DDE4E0] bg-white text-[#6D7A6E]">
              <LockKeyholeIcon aria-hidden="true" className="size-3" />
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-8 text-[#1A1C1E]">
            {data.accessRequest.title}
          </h1>
          <p className="mx-auto mt-3 max-w-64 text-sm leading-6 text-[#5D6461]">
            {data.accessRequest.description}
          </p>

          <Link
            href="/permissoes"
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#007A3D] text-sm font-bold text-white transition hover:bg-[#006A36]"
          >
            <SendIcon aria-hidden="true" className="size-4" />
            {data.accessRequest.buttonLabel}
          </Link>

          <Link
            href="/familia"
            className="mt-6 inline-flex text-sm font-semibold text-[#2B985E]"
          >
            {data.accessRequest.backLabel}
          </Link>

          <p className="mt-10 flex items-center justify-center gap-2 text-xs text-[#6D7A6E]">
            <ShieldIcon aria-hidden="true" className="size-3" />
            {data.accessRequest.securityLabel}
          </p>
        </section>
      </div>
    </MobileScreen>
  );
}

export function EmergencyScreen({ data }: { data: AppData }) {
  return (
    <div className="min-h-dvh bg-[#F3F3F6] text-[#1A1C1E]">
      <main className="mx-auto min-h-dvh w-full max-w-[430px] bg-[#F9F9FC] px-4 py-5">
        <Link
          href="/familia/helena"
          className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#BA1A1A]"
        >
          <XIcon aria-hidden="true" className="size-3" />
          {data.emergency.exitLabel}
        </Link>

        <section className="mb-5 rounded-lg bg-[#BA1A1A] px-5 py-4 text-white shadow-[0_6px_18px_rgba(186,26,26,0.22)]">
          <div className="flex items-center gap-4">
            <AlertTriangleIcon aria-hidden="true" className="size-8" />
            <div>
              <h1 className="text-xl font-bold">{data.emergency.title}</h1>
              <p className="text-sm font-semibold text-white/90">
                {data.emergency.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className={cn(cardClass, "mb-4 p-4")}>
          <div className="flex items-center gap-4">
            <AvatarImage
              src={data.emergency.patient.avatarUrl}
              alt={data.emergency.patient.name}
              size="sm"
            />
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-[#1A1C1E]">
                {data.emergency.patient.name}
              </h2>
              <p className="text-sm text-[#5D6461]">
                {data.emergency.patient.age}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#E8F5ED] px-3 py-1.5 text-xs font-semibold text-[#2B985E]">
                <CheckCircle2Icon aria-hidden="true" className="size-3" />
                {data.emergency.patient.status}
              </span>
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <InfoCard icon={ShieldCheckIcon} title="Condições">
            <BulletList items={data.emergency.conditions} />
          </InfoCard>

          <InfoCard
            icon={AlertTriangleIcon}
            title="Alergias"
            tone="danger"
            iconTone="text-[#BA1A1A]"
            aside={<AlertTriangleIcon className="size-12 text-[#BA1A1A]/15" />}
          >
            <div className="flex flex-wrap gap-2">
              {data.emergency.allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="rounded-md bg-[#BA1A1A] px-3 py-1.5 text-xs font-bold text-white"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </InfoCard>

          <InfoCard icon={PillIcon} title="Medicamentos Contínuos">
            <div className="flex flex-wrap gap-2">
              {data.emergency.medications.map((medication) => (
                <span
                  key={medication}
                  className="inline-flex items-center gap-2 rounded-md border border-[#DDE4E0] bg-white px-3 py-2 text-xs font-semibold text-[#59605D]"
                >
                  <PillIcon aria-hidden="true" className="size-3" />
                  {medication}
                </span>
              ))}
            </div>
          </InfoCard>

          <section className={cn(cardClass, "p-4 text-center")}>
            <h2 className="mb-6 text-left text-lg font-bold text-[#1A1C1E]">
              Contato de Emergência
            </h2>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#F0F0F3] text-[#59605D]">
              <UserIcon aria-hidden="true" className="size-7" />
            </span>
            <p className="mt-3 text-base font-semibold text-[#1A1C1E]">
              {data.emergency.emergencyContact.name}
            </p>
            <p className="text-sm text-[#5D6461]">
              {data.emergency.emergencyContact.relationship}
            </p>
            <div className="mt-5 space-y-2">
              <Link
                href="tel:+5500000000000"
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#007A3D] text-sm font-bold text-white transition hover:bg-[#006A36]"
              >
                <PhoneIcon aria-hidden="true" className="size-4" />
                {data.emergency.emergencyContact.phoneLabel}
              </Link>
              <Link
                href="/familia/helena"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#BDCABE] bg-white text-sm font-bold text-[#2B985E] transition hover:bg-[#F2F9F5]"
              >
                <MessageSquareIcon aria-hidden="true" className="size-4" />
                {data.emergency.emergencyContact.messageLabel}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export function DoctorDashboardScreen({ data }: { data: DoctorDashboardData }) {
  return (
    <div className="min-h-dvh bg-[#F9F9FC] text-[#1A1C1E] md:flex">
      <aside className="hidden w-64 shrink-0 border-r border-[#DDE4E0] bg-white md:sticky md:top-0 md:flex md:h-dvh md:flex-col">
        <div className="border-b border-[#DDE4E0] p-8">
          <Link href="/familia" className="flex items-center gap-3">
            <HubLogoMark className="size-7" />
            <span className="text-xl font-bold leading-6 text-[#006A36]">
              HUB
              <br />
              Family
            </span>
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase text-[#5D6461]">
            Provider Portal
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <DesktopNavItem icon={LayoutDashboardIcon} label="Dashboard" />
          <DesktopNavItem icon={UsersIcon} label="Patient Directory" active />
          <DesktopNavItem icon={FileClockIcon} label="History" />
        </nav>

        <div className="border-t border-[#DDE4E0] p-6">
          <div className="flex items-center gap-3">
            <Image
              src={data.dashboard.provider.avatarUrl}
              alt={data.dashboard.provider.name}
              width={48}
              height={48}
              className="size-10 rounded-full border border-[#DDE4E0] object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#1A1C1E]">
                {data.dashboard.provider.name}
              </p>
              <p className="truncate text-xs text-[#5D6461]">
                {data.dashboard.provider.role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 pb-20 md:pb-0">
        <header className="sticky top-0 z-40 border-b border-[#DDE4E0] bg-[#F9F9FC]/95 px-4 py-4 backdrop-blur md:px-12 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#006A36] md:hidden">
                <HubLogoMark />
                <span className="text-sm font-bold">HUB Family</span>
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">
                {data.dashboard.title}
              </h1>
              <p className="mt-1 text-sm text-[#5D6461]">
                {data.dashboard.description}
              </p>
            </div>

            <div className="flex gap-3">
              <label className="relative min-w-0 flex-1 md:w-80 md:flex-none">
                <SearchIcon
                  aria-hidden="true"
                  className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5D6461]"
                />
                <span className="sr-only">Pesquisar pacientes</span>
                <input
                  type="search"
                  placeholder={data.dashboard.searchPlaceholder}
                  className="h-11 w-full rounded-lg border border-[#DDE4E0] bg-white pr-3 pl-10 text-sm outline-none transition focus:border-[#2B985E] focus:ring-2 focus:ring-[#2B985E]/20"
                />
              </label>
              <button
                type="button"
                aria-label="Notificações"
                className="relative flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#DDE4E0] bg-white text-[#5D6461]"
              >
                <BellIcon aria-hidden="true" className="size-5" />
                <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-[#BA1A1A]" />
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-12">
          <section className="grid gap-4 md:grid-cols-3">
            {data.dashboard.metrics.map((metric) => (
              <DoctorMetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section
            className={cn(cardClass, "overflow-hidden shadow-[0_4px_20px_rgba(0,153,81,0.08)]")}
          >
            <div className="flex flex-col gap-4 border-b border-[#DDE4E0] p-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#1A1C1E]">
                  {data.dashboard.tableTitle}
                </h2>
                <span className="rounded-full bg-[#F0F0F3] px-2 py-1 text-xs font-semibold text-[#5D6461]">
                  {data.dashboard.tableSubtitle}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 md:flex">
                <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4E0] bg-white px-4 text-sm font-semibold text-[#5D6461]">
                  <ListFilterIcon aria-hidden="true" className="size-4" />
                  Filter
                </button>
                <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#DDE4E0] bg-white px-4 text-sm font-semibold text-[#5D6461]">
                  <ArrowUpIcon aria-hidden="true" className="size-4" />
                  Sort
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#DDE4E0] bg-[#F9F9FC]">
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Family Group</TableHead>
                    <TableHead>Last Measurement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {data.dashboard.patients.map((patient) => (
                    <DoctorPatientRow key={patient.id} patient={patient} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDE4E0] px-5 py-4">
              <p className="text-xs text-[#5D6461]">
                {data.dashboard.paginationSummary}
              </p>
              <div className="flex items-center gap-1">
                <button
                  aria-label="Página anterior"
                  className="flex size-8 items-center justify-center rounded-md border border-[#DDE4E0] text-[#5D6461]"
                >
                  <ChevronLeftIcon aria-hidden="true" className="size-4" />
                </button>
                <span className="flex size-8 items-center justify-center rounded-md bg-[#2B985E] text-xs font-bold text-white">
                  1
                </span>
                <span className="flex size-8 items-center justify-center rounded-md text-xs font-bold text-[#5D6461]">
                  2
                </span>
                <span className="flex size-8 items-center justify-center rounded-md text-xs font-bold text-[#5D6461]">
                  3
                </span>
                <button
                  aria-label="Próxima página"
                  className="flex size-8 items-center justify-center rounded-md border border-[#DDE4E0] text-[#5D6461]"
                >
                  <ChevronRightIcon aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="md:hidden">
        <MobileBottomNav navigation={data.navigation} active="dashboard" />
      </div>
    </div>
  );
}

function DesktopNavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={active ? "/medico" : "/familia"}
      className={cn(
        "relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition",
        active
          ? "bg-[#2B985E] text-white"
          : "text-[#5D6461] hover:bg-[#F2F9F5] hover:text-[#2B985E]",
      )}
    >
      {active ? (
        <span className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white" />
      ) : null}
      <Icon aria-hidden="true" className="size-4" />
      {label}
    </Link>
  );
}

function DoctorMetricCard({ metric }: { metric: DoctorMetric }) {
  const Icon =
    metric.icon === "groups"
      ? UsersIcon
      : metric.icon === "warning"
        ? AlertTriangleIcon
        : HomeIcon;

  const metricClass = {
    primary: "border-[#DDE4E0] text-[#2B985E] bg-[#E8F5ED]",
    danger: "border-[#FFDAD6] text-[#BA1A1A] bg-[#FFF7F6]",
    neutral: "border-[#DDE4E0] text-[#59605D] bg-[#F0F0F3]",
  }[metric.tone];

  return (
    <article className={cn(cardClass, "p-5")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase text-[#5D6461]">
            {metric.label}
          </p>
          <p
            className={cn(
              "text-3xl font-bold",
              metric.tone === "danger" ? "text-[#BA1A1A]" : "text-[#1A1C1E]",
            )}
          >
            {metric.value}
          </p>
        </div>
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-full border",
            metricClass,
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      <p
        className={cn(
          "mt-4 flex items-center gap-1 text-xs font-semibold",
          metric.tone === "danger" ? "text-[#BA1A1A]" : "text-[#2B985E]",
          metric.tone === "neutral" && "text-[#5D6461]",
        )}
      >
        <TrendingUpIcon aria-hidden="true" className="size-3" />
        {metric.description}
      </p>
    </article>
  );
}

function TableHead({ children }: { children: ReactNode }) {
  return (
    <th className="px-5 py-3 text-xs font-bold uppercase text-[#5D6461]">
      {children}
    </th>
  );
}

function DoctorPatientRow({ patient }: { patient: DoctorPatient }) {
  const attention = patient.statusTone === "attention";

  return (
    <tr className="border-b border-[#DDE4E0] last:border-b-0">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-xs font-bold",
              attention
                ? "bg-[#FFDAD6] text-[#BA1A1A]"
                : "bg-[#DDF7E7] text-[#2B985E]",
            )}
          >
            {patient.initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-[#1A1C1E]">
              {patient.name}
            </p>
            <p className="text-xs text-[#5D6461]">ID: {patient.id}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-[#3E4A3F]">
          <HomeIcon aria-hidden="true" className="size-4 text-[#5D6461]" />
          {patient.familyGroup}
        </div>
      </td>
      <td className="px-5 py-4">
        <p className="text-sm font-semibold text-[#1A1C1E]">
          {patient.lastMeasurement}
        </p>
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs",
            attention ? "text-[#BA1A1A]" : "text-[#5D6461]",
          )}
        >
          {attention ? (
            <ArrowUpIcon aria-hidden="true" className="size-3" />
          ) : (
            <CheckCircle2Icon aria-hidden="true" className="size-3" />
          )}
          {patient.measurementDetail}
        </p>
      </td>
      <td className="px-5 py-4">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
            attention
              ? "bg-[#FFDAD6] text-[#BA1A1A]"
              : "bg-[#E8F5ED] text-[#2B985E]",
          )}
        >
          {attention ? (
            <AlertTriangleIcon aria-hidden="true" className="size-3" />
          ) : (
            <CheckCircle2Icon aria-hidden="true" className="size-3" />
          )}
          {patient.status}
        </span>
      </td>
      <td className="px-5 py-4">
        <Link
          href="/familia/helena"
          aria-label={`Ver ${patient.name}`}
          className="inline-flex size-8 items-center justify-center rounded-full text-[#1A1C1E] transition hover:bg-[#F2F9F5]"
        >
          <ChevronRightIcon aria-hidden="true" className="size-4" />
        </Link>
      </td>
    </tr>
  );
}
