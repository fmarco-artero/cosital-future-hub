import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import presentacionChicano from "@/assets/presentaciones/Presentacion-jose-chicano.pptx.asset.json";

// Presentaciones protegidas por contraseña.
// Para añadir una nueva: sube el archivo con lovable-assets y añade una entrada aquí.
const PRESENTACIONES: Record<string, { titulo: string; url: string }> = {
  "jose-chicano": {
    titulo: "Retos, posibilidades y tendencias del control interno — Jose F. Chicano",
    url: presentacionChicano.url,
  },
};

type GateSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "presentacion-gate",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function passwordMatches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const unlockPresentacion = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; slug: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["PRESENTACION_PASSWORD"];
    if (!expected) throw new Error("PRESENTACION_PASSWORD is not set");
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }
    const session = await useSession<GateSession>(sessionConfig());
    await session.update({ unlocked: true });
    const item = PRESENTACIONES[data.slug];
    if (!item) return { ok: false as const };
    return { ok: true as const, ...item };
  });

export const getPresentacion = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const session = await useSession<GateSession>(sessionConfig());
    if (!session.data.unlocked) return { ok: false as const };
    const item = PRESENTACIONES[data.slug];
    if (!item) return { ok: false as const };
    return { ok: true as const, ...item };
  });
