import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, MonitorPlay, Download } from "lucide-react";
import presentacionChicano from "@/assets/presentaciones/Presentacion-jose-chicano.pptx.asset.json";
import presentacionSandraMar from "@/assets/presentaciones/Presentacion-sandra-salvat-y-marimar-medall.pptx.asset.json";
import presentacionSandraMarParte2 from "@/assets/presentaciones/Presentacion-sandra-salvat-y-marimar-medall-parte-2.pdf.asset.json";
import presentacionMariCarmenAparisi from "@/assets/presentaciones/Presentacion-maricarmen-aparici.pptx.asset.json";
import presentacionRequejoUrbanismo from "@/assets/presentaciones/Presentacion-javier-requejo-urbanismo.pptx.asset.json";
import presentacionRequejoConcesiones from "@/assets/presentaciones/Presentacion-javier-requejo-control-de-concesiones.pptx.asset.json";
import presentacionRequejoPatrimonio from "@/assets/presentaciones/Presentacion-javier-requejo-patrimonio.pptx.asset.json";
import presentacionBeatrizMontes from "@/assets/presentaciones/Presentacion-beatriz-montes.pdf.asset.json";
import presentacionRocioArteaga from "@/assets/presentaciones/Presentacion-rocio-arteaga.pdf.asset.json";
import presentacionMatildeCastellanos from "@/assets/presentaciones/Presentacion-matilde-castellanos.pdf.asset.json";
import presentacionXavierMoises from "@/assets/presentaciones/Presentacion-xavier-moises.pdf.asset.json";
import presentacionJoseClaudioAlvarez from "@/assets/presentaciones/Presentacion-jose-claudio-alvarez.pptx.asset.json";
import presentacionManelPerez from "@/assets/presentaciones/Presentacion-manel-perez.pptx.asset.json";
import presentacionSandraSalvatJ3 from "@/assets/presentaciones/Presentacion-sandra-salvat-j3.pptx.asset.json";

// Presentaciones protegidas por contraseña (verificación 100% en el navegador,
// funciona en cualquier alojamiento estático o Node sin variables de entorno).
const PRESENTACIONES: Record<
  string,
  { titulo: string; url: string; formato: "pptx" | "pdf"; passwordHash: string }
> = {
  "jose-chicano": {
    titulo: "Retos, posibilidades y tendencias del control interno — Jose F. Chicano",
    url: presentacionChicano.url,
    formato: "pptx",
    // SHA-256 de la contraseña de acceso.
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "sandra-salvat-mar-medall": {
    titulo: "El control permanente previo y la gestión de riesgos — Sandra Salvat y Mar Medall (Parte 1)",
    url: presentacionSandraMar.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "sandra-salvat-mar-medall-parte-2": {
    titulo: "El control permanente previo y la gestión de riesgos — Sandra Salvat y Mar Medall (Parte 2)",
    url: presentacionSandraMarParte2.url,
    formato: "pdf",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "maricarmen-aparisi": {
    titulo: "FRB. El cuadro de mandos. La IA en FRB — M.C. Aparisi",
    url: presentacionMariCarmenAparisi.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "javier-requejo-urbanismo": {
    titulo: "Urbanismo — Javier Requejo",
    url: presentacionRequejoUrbanismo.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "javier-requejo-control-concesiones": {
    titulo: "Control de concesiones — Javier Requejo",
    url: presentacionRequejoConcesiones.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "javier-requejo-patrimonio": {
    titulo: "Patrimonio — Javier Requejo",
    url: presentacionRequejoPatrimonio.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "beatriz-montes": {
    titulo: "Integridad, transparencia y buen gobierno — Beatriz Montes",
    url: presentacionBeatrizMontes.url,
    formato: "pdf",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "rocio-arteaga": {
    titulo: "Control financiero e inteligencia artificial — Rocío Arteaga",
    url: presentacionRocioArteaga.url,
    formato: "pdf",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "matilde-castellanos": {
    titulo: "Los riesgos de la mala utilización de la IA — Matilde Castellano",
    url: presentacionMatildeCastellanos.url,
    formato: "pdf",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "xavier-moises": {
    titulo: "Integridad, transparencia y buen gobierno — Xavi Moisés",
    url: presentacionXavierMoises.url,
    formato: "pdf",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "jose-claudio-alvarez": {
    titulo: "Del visto bueno al valor público — José Claudio Álvarez Villazón",
    url: presentacionJoseClaudioAlvarez.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "manel-perez": {
    titulo: "Comprobación material de la inversión — Manel Pérez",
    url: presentacionManelPerez.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
  "sandra-salvat-j3": {
    titulo: "Agente de IA como soporte al OCIL en contratación y CMI — Sandra Salvat",
    url: presentacionSandraSalvatJ3.url,
    formato: "pptx",
    passwordHash:
      "88a0d428e6a22ed55578ae87454a573ad45eea9ff204d929a544ff9f039251b0",
  },
};

const SESSION_KEY_PREFIX = "presentacion-unlocked:";

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const Route = createFileRoute("/presentacion/$slug")({
  head: () => ({
    meta: [
      { title: "Presentación protegida | Control Interno Local" },
      {
        name: "description",
        content:
          "Acceso con contraseña a la presentación de la jornada del curso Presente y Futuro del Control Interno Local.",
      },
      { property: "og:title", content: "Presentación protegida | Control Interno Local" },
      {
        property: "og:description",
        content:
          "Introduce la contraseña facilitada para acceder a la presentación de la ponencia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PresentacionPage,
});

function PresentacionPage() {
  const { slug } = Route.useParams();
  const item = PRESENTACIONES[slug];
  const sessionKey = SESSION_KEY_PREFIX + slug;

  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (item && sessionStorage.getItem(sessionKey) === "1") setUnlocked(true);
    } catch {
      // sessionStorage no disponible: se pedirá la contraseña siempre
    }
  }, [item, sessionKey]);

  useEffect(() => {
    if (!unlocked || !item) {
      setViewerSrc(null);
      return;
    }
    const absolute = new URL(item.url, window.location.origin).toString();
    if (item.formato === "pdf") {
      setViewerSrc(absolute);
    } else {
      setViewerSrc(
        `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absolute)}`,
      );
    }
  }, [unlocked, item]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!item) return;
    setLoading(true);
    setError(false);
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const hash = await sha256Hex(password);
    setLoading(false);
    if (hash === item.passwordHash) {
      try {
        sessionStorage.setItem(sessionKey, "1");
      } catch {
        // sin almacenamiento: acceso válido para esta visita
      }
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  return (
    <main className="bg-network min-h-screen px-4 py-16 text-white">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        {item && unlocked ? (
          <>
            <h1 className="flex items-center gap-3 text-2xl font-semibold">
              <MonitorPlay className="h-6 w-6 text-[var(--color-blue-light,#5cc8ff)]" />
              Presentación
            </h1>
            <p className="mt-3 text-white/70">{item.titulo}</p>

            <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
              {viewerSrc ? (
                <iframe
                  src={viewerSrc}
                  title="Presentación"
                  className="h-full w-full"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/50">
                  Cargando la presentación…
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-white/50">
              Si la vista previa no carga, descarga el archivo para verlo en tu equipo.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-medium transition hover:bg-white/20"
              >
                <MonitorPlay className="h-4 w-4" />
                Abrir en otra pestaña
              </a>
              <a
                href={item.url}
                download
                className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 font-medium text-[#0d2a4a] transition hover:bg-white"
              >
                <Download className="h-4 w-4" />
                Descargar la presentación
              </a>
            </div>
          </>
        ) : (
          <>
            <h1 className="flex items-center gap-3 text-2xl font-semibold">
              <Lock className="h-6 w-6 text-[var(--color-blue-light,#5cc8ff)]" />
              Acceso protegido
            </h1>
            <p className="mt-3 text-white/70">
              Introduce la contraseña facilitada para acceder a la presentación.
            </p>
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Contraseña"
                className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-white/90 px-6 py-3 font-medium text-[#0d2a4a] transition hover:bg-white disabled:opacity-60"
              >
                {loading ? "Comprobando…" : "Entrar"}
              </button>
            </form>
            {error && (
              <p className="mt-3 text-sm text-rose-300">Contraseña incorrecta.</p>
            )}
            {!item && (
              <p className="mt-3 text-sm text-rose-300">
                Esta presentación no existe.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
