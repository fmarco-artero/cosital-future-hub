import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, MonitorPlay, Download } from "lucide-react";
import presentacionChicano from "@/assets/presentaciones/Presentacion-jose-chicano.pptx.asset.json";

// Presentaciones protegidas por contraseña (verificación 100% en el navegador,
// funciona en cualquier alojamiento estático o Node sin variables de entorno).
const PRESENTACIONES: Record<
  string,
  { titulo: string; url: string; passwordHash: string }
> = {
  "jose-chicano": {
    titulo: "Retos, posibilidades y tendencias del control interno — Jose F. Chicano",
    url: presentacionChicano.url,
    // SHA-256 de la contraseña de acceso.
    passwordHash:
      "feee754a75f35643c90bc8dca3d2743f345f55edb90289d3da71a1218e530f86",
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
    setViewerSrc(
      `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absolute)}`,
    );
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
