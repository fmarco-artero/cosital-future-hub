import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Clock, MapPin, Calendar, Users, GraduationCap, Brain, ShieldCheck,
  Scale, FileText, Building2, LineChart, Sparkles, Target, ArrowRight, FileText as FileIcon,
} from "lucide-react";

// CVs de ponentes (PDFs servidos por CDN)
import cvMinguillon from "@/assets/cv/CV_Oxford_Antonio_Minguillon.pdf.asset.json";
import cvMontes from "@/assets/cv/CV_Oxford_Beatriz_Montes.pdf.asset.json";
import cvMonserrat from "@/assets/cv/CV_Oxford_Carmen_Monserrat.pdf.asset.json";
import cvRequejo from "@/assets/cv/CV_Oxford_Javier_Requejo.pdf.asset.json";
import cvChicano from "@/assets/cv/CV_Oxford_Jose_Chicano.pdf.asset.json";
import cvClaudio from "@/assets/cv/CV_Oxford_Jose_Claudio.pdf.asset.json";
import cvManel from "@/assets/cv/CV_Oxford_Manel_Perez.pdf.asset.json";
import cvMedall from "@/assets/cv/CV_Oxford_Mar_Medall-2.pdf.asset.json";
import cvAparisi from "@/assets/cv/CV_Oxford_MariCarmen_Aparisi.pdf.asset.json";
import cvCastellanos from "@/assets/cv/CV_Oxford_Matilde_Castellanos.pdf.asset.json";
import cvPascual from "@/assets/cv/CV_Oxford_Pascual_Hernandez.pdf.asset.json";
import cvSandra from "@/assets/cv/CV_Oxford_Sandra_Salvat.pdf.asset.json";
import cvXavi from "@/assets/cv/CV_Oxford_Xavi_Moises.pdf.asset.json";
import cvRocio from "@/assets/cv/CV_Oxford_Rocio_Arteaga.pdf.asset.json";

// Mapeo nombre → URL del CV. Añade nuevas entradas aquí cuando incorpores ponentes.
const CV_MAP: Record<string, string> = {
  "Antonio Minguillón": cvMinguillon.url,
  "Beatriz Montes": cvMontes.url,
  "Carmen Monserrat": cvMonserrat.url,
  "Javier Requejo": cvRequejo.url,
  "Jose F. Chicano": cvChicano.url,
  "José Claudio Álvarez Villazón": cvClaudio.url,
  "Manel Pérez": cvManel.url,
  "Mar Medall": cvMedall.url,
  "Mar Medall González": cvMedall.url,
  "M.C. Aparisi": cvAparisi.url,
  "Matilde Castellano": cvCastellanos.url,
  "Pascual Hernández": cvPascual.url,
  "Sandra Salvat": cvSandra.url,
  "Xavi Moisés": cvXavi.url,
  "Rocío Arteaga": cvRocio.url,
  "Rocio Arteaga": cvRocio.url,
};

// URL del formulario de inscripción. Actualiza aquí si cambia el enlace.
const INSCRIPCION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeJKJSgYRP4S-P-TUUL2yJpKpIGOvRv1H0dCQ_G56n7B1L5nA/viewform";

// URL del lugar de celebración del curso (El Planetari de Castelló).
const LUGAR_URL = "https://www.castello.es/va/web/guest/planetari-informacio-general";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Presente y Futuro del Control Interno Local — COSITAL Castelló" },
      { name: "description", content: "Curso especializado: IA, Integridad y Gestión del Riesgo. 17, 18, 24, 25 septiembre y 2 octubre 2026, El Planetari, Castelló." },
      { property: "og:title", content: "Presente y Futuro del Control Interno Local" },
      { property: "og:description", content: "IA, Integridad y Gestión del Riesgo — Curso COSITAL Castelló 2026" },
    ],
  }),
  component: Page,
});

/* ============================================================
   DATA — Edita aquí para añadir/modificar jornadas y ponentes
   ============================================================ */

type Sesion = { hora: string; titulo: string; ponentes?: { nombre: string; cargo: string }[]; pausa?: boolean };
type Jornada = { num: number; fecha: string; titulo: string; color: string; accent: string; sesiones: Sesion[] };

const JORNADAS: Jornada[] = [
  {
    num: 1, fecha: "17 sept", titulo: "Nuevos retos del control interno: IA y gestión del riesgo",
    color: "var(--blue-light)", accent: "blue-light",
    sesiones: [
      { hora: "8:45–9:00", titulo: "Recepción y presentación del curso" },
      { hora: "9:00–11:00", titulo: "Retos, posibilidades y tendencias del control interno", ponentes: [{ nombre: "Jose F. Chicano", cargo: "Interventor General · Ayuntamiento de Tarragona" }] },
      { hora: "11:00–11:30", titulo: "Pausa desayuno", pausa: true },
      { hora: "11:30–13:00", titulo: "FRB. El cuadro de mandos. La IA en FRB", ponentes: [{ nombre: "M.C. Aparisi", cargo: "Interventora General · Ayuntamiento de Torrent" }] },
      { hora: "13:00–14:30", titulo: "El control permanente previo y la gestión de riesgos", ponentes: [
        { nombre: "Sandra Salvat", cargo: "Jefa de Servicio de Control Previo · Ayuntamiento de Tarragona" },
        { nombre: "Mar Medall", cargo: "Interventora General · Ayuntamiento de Amposta" },
      ]},
    ],
  },
  {
    num: 2, fecha: "18 sept", titulo: "Control financiero, IA y áreas de especial riesgo",
    color: "var(--emerald)", accent: "emerald",
    sesiones: [
      { hora: "9:00–10:30", titulo: "Más allá del presupuesto: control de las concesiones, el patrimonio y el urbanismo en las entidades locales", ponentes: [{ nombre: "Javier Requejo", cargo: "Viceinterventor General · Ayuntamiento de Tarragona" }] },
      { hora: "10:30–11:00", titulo: "Pausa desayuno", pausa: true },
      { hora: "11:00–12:30", titulo: "Control financiero e inteligencia artificial: una herramienta para trabajar mejor", ponentes: [{ nombre: "Rocío Arteaga", cargo: "Interventora Adjunta · Diputación de Málaga" }] },
      { hora: "12:30–14:30", titulo: "Los riesgos de la mala utilización de la IA", ponentes: [{ nombre: "Matilde Castellano", cargo: "Viceinterventora General · Junta de Comunidades de Castilla-La Mancha" }] },
    ],
  },
  {
    num: 3, fecha: "24 sept", titulo: "El control interno y la contratación: una mirada de futuro",
    color: "var(--violet)", accent: "violet",
    sesiones: [
      { hora: "9:00–11:00", titulo: "Del visto bueno al valor público: una visión moderna del control interno de la contratación", ponentes: [{ nombre: "José Claudio Álvarez Villazón", cargo: "Vocal · Tribunal Administrativo Central de Recursos Contractuales" }] },
      { hora: "11:00–11:30", titulo: "Pausa desayuno", pausa: true },
      { hora: "11:30–13:00", titulo: "Comprobación material de la inversión", ponentes: [{ nombre: "Manel Pérez", cargo: "Facultativo Asesor OCI Tarragona" }] },
      { hora: "13:00–14:30", titulo: "Agente de IA como soporte al OCIL en contratación y CMI. Aplicación práctica", ponentes: [{ nombre: "Sandra Salvat", cargo: "Jefa de Servicio de Control Previo · Ayuntamiento de Tarragona" }] },
    ],
  },
  {
    num: 4, fecha: "25 sept", titulo: "Gobernanza, integridad y tecnologías emergentes",
    color: "var(--amber)", accent: "amber",
    sesiones: [
      { hora: "9:00–11:00", titulo: "Más allá del cumplimiento: integridad, transparencia y buen gobierno en los entes del sector público", ponentes: [
        { nombre: "Xavi Moisés", cargo: "Responsable de Control de Empresas · Ayuntamiento de Tarragona" },
        { nombre: "Beatriz Montes", cargo: "Interventora y Auditora · Generalitat Valenciana" },
      ]},
      { hora: "11:00–11:30", titulo: "Pausa desayuno", pausa: true },
      { hora: "11:30–14:30", titulo: "IA, gestión de riesgos y nuevas tecnologías en control", ponentes: [{ nombre: "Javier Requejo", cargo: "Viceinterventor General · Ayuntamiento de Tarragona" }] },
    ],
  },
  {
    num: 5, fecha: "2 oct", titulo: "Gestión presupuestaria, perspectivas de futuro y control externo",
    color: "var(--burgundy)", accent: "burgundy",
    sesiones: [
      { hora: "9:00–10:30", titulo: "La gestión presupuestaria en un ambiente de control", ponentes: [{ nombre: "Pascual Hernández", cargo: "Director del Órgano de Gestión Presupuestaria y Contabilidad" }] },
      { hora: "10:30–11:00", titulo: "Pausa desayuno", pausa: true },
      { hora: "11:00–12:30", titulo: "Mejora tu estrateg-IA como interventor/a", ponentes: [{ nombre: "Carmen Monserrat", cargo: "Auditora de cuentas" }] },
      { hora: "12:30–14:00", titulo: "Control externo sobre agentes de IA", ponentes: [{ nombre: "Antonio Minguillón", cargo: "Auditor Director · Gabinete Técnico Sindicatura" }] },
      { hora: "14:00–14:15", titulo: "Clausura" },
    ],
  },
];

const EJES = [
  { label: "Control interno local", color: "bg-[oklch(0.35_0.10_252)]" },
  { label: "Inteligencia artificial", color: "bg-[var(--magenta)]" },
  { label: "Gestión de riesgos", color: "bg-[var(--emerald)]/80" },
  { label: "Contratación pública", color: "bg-[var(--orange)]/85" },
  { label: "Integridad y buen gobierno", color: "bg-[var(--burgundy)]" },
  { label: "Control externo", color: "bg-[var(--blue-light)]" },
  { label: "Gestión presupuestaria", color: "bg-[oklch(0.45_0.04_252)]" },
];

const OBJETIVOS = [
  { icon: Brain, t: "Nuevos retos digitales", d: "Analizar los nuevos retos del control interno local ante la transformación digital." },
  { icon: Sparkles, t: "Oportunidades y riesgos de la IA", d: "Identificar oportunidades y riesgos derivados del uso de la inteligencia artificial." },
  { icon: ShieldCheck, t: "Gestión de riesgos", d: "Reforzar la gestión de riesgos como herramienta de mejora del control." },
  { icon: FileText, t: "Áreas técnicas clave", d: "Profundizar en contratación, concesiones, patrimonio, urbanismo y gestión presupuestaria." },
  { icon: Scale, t: "Cultura de integridad", d: "Impulsar una cultura de integridad, transparencia y buen gobierno." },
];

// Ponentes únicos extraídos del programa
const PONENTES = [
  { nombre: "Mar Medall González", cargo: "Interventora General · Ayuntamiento de Amposta", direccion: true },
  { nombre: "Jose F. Chicano", cargo: "Interventor General · Ayuntamiento de Tarragona" },
  { nombre: "M.C. Aparisi", cargo: "Interventora General · Ayuntamiento de Torrent" },
  { nombre: "Sandra Salvat", cargo: "Jefa de Servicio de Control Previo · Ayuntamiento de Tarragona" },
  { nombre: "Javier Requejo", cargo: "Viceinterventor General · Ayuntamiento de Tarragona" },
  { nombre: "Rocío Arteaga", cargo: "Interventora Adjunta · Diputación de Málaga" },
  { nombre: "Matilde Castellano", cargo: "Viceinterventora General · JCCM" },
  { nombre: "José Claudio Álvarez Villazón", cargo: "Vocal · Tribunal Administrativo Central de Recursos Contractuales" },
  { nombre: "Manel Pérez", cargo: "Facultativo Asesor OCI Tarragona" },
  { nombre: "Xavi Moisés", cargo: "Responsable Control de Empresas · Ayto. Tarragona" },
  { nombre: "Beatriz Montes", cargo: "Interventora y Auditora · Generalitat Valenciana" },
  { nombre: "Pascual Hernández", cargo: "Director del Órgano de Gestión Presupuestaria y Contabilidad" },
  { nombre: "Carmen Monserrat", cargo: "Auditora de cuentas" },
  { nombre: "Antonio Minguillón", cargo: "Auditor Director · Gabinete Técnico Sindicatura" },
];

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(s => s[0]).join("").toUpperCase();
}

/* ============================================================ */

function Page() {
  return (
    <div className="min-h-screen bg-[var(--navy-deep)] text-foreground">
      <Nav />
      <Hero />
      <Sobre />
      <Ejes />
      <Programa />
      <Objetivos />
      <Ponentes />
      <Inscripcion />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--navy-deep)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[var(--magenta)] to-[var(--blue-light)] text-sm font-bold">C</div>
          <span className="font-semibold tracking-tight">COSITAL <span className="text-[var(--magenta-soft)]">Castelló</span></span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/75 md:flex">
          <a href="#inicio" className="hover:text-white">Inicio</a>
          <a href="#programa" className="hover:text-white">Programa</a>
          <a href="#ponentes" className="hover:text-white">Ponentes</a>
          <a href="#objetivos" className="hover:text-white">Objetivos</a>
          <a href={INSCRIPCION_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--magenta)] px-4 py-1.5 font-medium text-white hover:opacity-90">Inscripción</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="bg-network relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em] text-white/60">
          <span>COSITAL Castelló</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>El Planetari</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>Generalitat Valenciana</span>
        </div>

        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-[var(--magenta-soft)]" /> Curso especializado · Edición 2026
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-7xl">
            Presente y Futuro del<br />
            <span className="text-white">Control Interno Local</span>
          </h1>
          <p className="mt-6 text-2xl font-light text-[var(--magenta-soft)] md:text-3xl">
            IA, Integridad y Gestión del Riesgo
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            25 horas de formación presencial en cinco jornadas especializadas con
            profesionales de referencia del control interno español.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:max-w-2xl">
            <InfoChip icon={Calendar} title="Fechas" text="17, 18, 24, 25 sept · 2 oct 2026" />
            <a href={LUGAR_URL} target="_blank" rel="noopener noreferrer" className="block transition hover:opacity-90">
              <InfoChip icon={MapPin} title="Lugar" text="El Planetari · Passeig Marítim 1, Castelló" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#programa" className="group inline-flex items-center gap-2 rounded-full bg-[var(--magenta)] px-6 py-3 font-medium text-white shadow-[0_10px_40px_-10px_oklch(0.52_0.18_0/0.7)] transition hover:scale-[1.02]">
              Ver programa completo
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a href={INSCRIPCION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10">
              Inscripción
            </a>
          </div>
        </div>
      </div>
      <div className="absolute -right-32 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--magenta)]/20 blur-3xl lg:block" />
    </section>
  );
}

function InfoChip({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--magenta-soft)]" />
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-white/50">{title}</div>
        <div className="text-sm font-medium text-white">{text}</div>
      </div>
    </div>
  );
}

function Sobre() {
  const items = [
    { icon: Clock, t: "25 horas", d: "de formación presencial intensiva con casos prácticos." },
    { icon: Calendar, t: "5 jornadas", d: "especializadas en los ejes clave del control interno actual." },
    { icon: Users, t: "Profesionales", d: "habilitados/as nacionales, interventores/as, secretarios/as, tesoreros/as y técnicos." },
  ];
  return (
    <section className="bg-network-soft border-y border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--magenta-soft)]">Sobre el curso</div>
          <p className="text-lg leading-relaxed text-white/80 md:text-xl">
            El control interno local afronta una etapa decisiva. La inteligencia
            artificial, la gestión de riesgos, la integridad institucional y las
            nuevas tecnologías están transformando la forma en que las entidades
            públicas planifican, supervisan, fiscalizan y toman decisiones. Este
            curso ofrece una visión <span className="text-white">práctica, estratégica y actualizada</span>,
            con sesiones impartidas por profesionales de referencia.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[var(--magenta)]/40 hover:bg-white/[0.06]">
              <i.icon className="h-7 w-7 text-[var(--magenta-soft)]" />
              <div className="mt-5 text-2xl font-semibold text-white">{i.t}</div>
              <p className="mt-2 text-sm text-white/65">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ejes() {
  return (
    <section className="bg-[var(--navy-deep)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--magenta-soft)]">Ejes temáticos</div>
        <div className="flex flex-wrap gap-3">
          {EJES.map((e) => (
            <span key={e.label} className={`${e.color} rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg`}>
              {e.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programa() {
  const [active, setActive] = useState(0);
  const j = JORNADAS[active];
  return (
    <section id="programa" className="bg-network-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--magenta-soft)]">Programa</div>
        <h2 className="mb-10 text-4xl font-bold text-white md:text-5xl">Cinco jornadas, una visión</h2>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-2">
          {JORNADAS.map((jor, i) => (
            <button
              key={jor.num}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 rounded-t-lg px-4 py-3 text-left text-sm transition ${
                active === i ? "bg-white/5 text-white" : "text-white/55 hover:text-white"
              }`}
              style={active === i ? { borderBottom: `2px solid ${jor.color}`, marginBottom: "-2px" } : {}}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full text-xs font-bold"
                style={{ backgroundColor: active === i ? jor.color : "oklch(1 0 0 / 0.08)", color: active === i ? "var(--navy-deep)" : "white" }}>
                J{jor.num}
              </span>
              <span className="hidden sm:block">
                <div className="font-semibold">Jornada {jor.num}</div>
                <div className="text-xs opacity-70">{jor.fecha}</div>
              </span>
            </button>
          ))}
        </div>

        {/* Jornada activa */}
        <div className="rounded-3xl border border-white/10 bg-[var(--navy)]/60 p-6 md:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="text-sm font-medium" style={{ color: j.color }}>Jornada {j.num} · {j.fecha} 2026</div>
              <h3 className="mt-1 max-w-3xl text-2xl font-semibold text-white md:text-3xl">{j.titulo}</h3>
            </div>
          </div>

          <div className="space-y-3">
            {j.sesiones.map((s, i) => <SesionItem key={i} sesion={s} color={j.color} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function SesionItem({ sesion, color }: { sesion: Sesion; color: string }) {
  if (sesion.pausa) {
    return (
      <div className="flex items-center gap-4 rounded-xl bg-white/[0.02] px-4 py-3 text-sm text-white/50">
        <span className="font-mono">{sesion.hora}</span>
        <span className="italic">— {sesion.titulo} —</span>
      </div>
    );
  }
  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition hover:border-white/15 hover:bg-white/[0.06] md:flex-row">
      <div className="flex shrink-0 md:w-40">
        <div className="w-full rounded-lg px-3 py-2 text-center font-mono text-sm font-semibold text-white"
          style={{ backgroundColor: color, color: "var(--navy-deep)" }}>
          {sesion.hora}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold leading-snug text-white">{sesion.titulo}</h4>
        {sesion.ponentes && (
          <div className="mt-3 space-y-1.5">
            {sesion.ponentes.map((p) => {
              const cv = CV_MAP[p.nombre];
              const NameTag: any = cv ? "a" : "span";
              return (
                <div key={p.nombre} className="flex items-center gap-2 text-sm">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--magenta)] to-[var(--blue-light)] text-[10px] font-bold text-white">
                    {initials(p.nombre)}
                  </div>
                  <div className="min-w-0">
                    <NameTag
                      {...(cv ? { href: cv, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`font-medium text-white ${cv ? "underline decoration-[var(--magenta-soft)]/40 underline-offset-4 hover:decoration-[var(--magenta-soft)]" : ""}`}
                    >
                      {p.nombre}
                    </NameTag>
                    <span className="text-white/55"> · {p.cargo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Objetivos() {
  return (
    <section id="objetivos" className="bg-[var(--navy-deep)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--magenta-soft)]">Objetivos</div>
        <h2 className="mb-12 max-w-2xl text-4xl font-bold text-white md:text-5xl">Lo que vas a llevarte</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OBJETIVOS.map((o) => (
            <div key={o.t} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 transition hover:border-[var(--magenta)]/40">
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-[var(--magenta)]/15 text-[var(--magenta-soft)]">
                <o.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">{o.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{o.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ponentes() {
  const direccion = PONENTES.find(p => p.direccion);
  const resto = PONENTES.filter(p => !p.direccion);
  return (
    <section id="ponentes" className="bg-network-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--magenta-soft)]">Ponentes</div>
        <h2 className="mb-12 text-4xl font-bold text-white md:text-5xl">Profesionales de referencia</h2>

        {direccion && (() => {
          const cv = CV_MAP[direccion.nombre];
          const Wrapper: any = cv ? "a" : "div";
          return (
            <Wrapper
              {...(cv ? { href: cv, target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`mb-12 block rounded-3xl border border-[var(--magenta)]/40 bg-gradient-to-br from-[var(--magenta)]/15 to-transparent p-8 transition ${cv ? "hover:border-[var(--magenta)]/70 hover:bg-[var(--magenta)]/20" : ""}`}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--magenta)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--magenta-soft)]">
                <GraduationCap className="h-3.5 w-3.5" /> Dirección académica
              </div>
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--magenta)] to-[var(--blue-light)] text-2xl font-bold text-white">
                  {initials(direccion.nombre)}
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-semibold text-white">{direccion.nombre}</div>
                  <div className="mt-1 text-white/65">{direccion.cargo}</div>
                  {cv && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--magenta-soft)]">
                      <FileIcon className="h-3.5 w-3.5" /> Ver currículum (PDF)
                    </div>
                  )}
                </div>
              </div>
            </Wrapper>
          );
        })()}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resto.map((p) => {
            const cv = CV_MAP[p.nombre];
            const Card: any = cv ? "a" : "div";
            return (
              <Card
                key={p.nombre}
                {...(cv ? { href: cv, target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06] ${cv ? "cursor-pointer hover:border-[var(--magenta)]/40" : ""}`}
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--blue-light)] to-[var(--magenta)] text-sm font-bold text-white">
                  {initials(p.nombre)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white">{p.nombre}</div>
                  <div className="mt-0.5 text-sm leading-snug text-white/60">{p.cargo}</div>
                  {cv && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--magenta-soft)]">
                      <FileIcon className="h-3 w-3" /> Ver CV (PDF)
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Inscripcion() {
  return (
    <section id="inscripcion" className="bg-network relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Target className="mx-auto mb-6 h-10 w-10 text-[var(--magenta-soft)]" />
        <h2 className="text-4xl font-bold text-white md:text-6xl">¿Quieres participar?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
          17, 18, 24, 25 de septiembre y 2 de octubre de 2026 · El Planetari, Castelló.
          Plazas limitadas.
        </p>
        <a href={INSCRIPCION_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--magenta)] px-8 py-4 text-base font-semibold text-white shadow-[0_15px_50px_-10px_oklch(0.52_0.18_0/0.7)] transition hover:scale-[1.02]">
          Solicitar inscripción
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/50">
          Dirigido a personal funcionario con habilitación de carácter nacional, interventores/as, secretarios/as-interventores/as, tesoreros/as y técnicos de control interno, auditoría y contratación.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--navy-deep)] py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[var(--magenta)] to-[var(--blue-light)] text-sm font-bold text-white">C</div>
            <span className="font-semibold text-white">COSITAL Castelló</span>
          </div>
          <p className="mt-3 text-sm text-white/55">Col·legi de Secretaris, Interventors i Tresorers d'Administració Local.</p>
        </div>
        <div className="text-sm text-white/60">
          <div className="mb-2 font-semibold text-white">Organiza</div>
          COSITAL Castelló<br />
          <span className="text-white/45">Colabora: Generalitat Valenciana</span>
        </div>
        <div className="text-sm text-white/60">
          <div className="mb-2 font-semibold text-white">Sede</div>
          <a href={LUGAR_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
            El Planetari<br />
            Passeig Marítim, 1<br />
            12100 Castelló de la Plana
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/5 px-6 pt-6 text-center text-xs text-white/35">
        © 2026 COSITAL Castelló · Todos los derechos reservados
      </div>
    </footer>
  );
}
