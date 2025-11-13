// pages/api/cartas.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { mapExternaParaInterna, type CartaExt, type CartaExterna } from "@/lib/cartas";

const SOURCE_URL = "https://fragaebitelloconsorcios.com.br/api/json/contemplados";

// Dica: ajuste este tempo conforme sua necessidade
const REVALIDATE_SECONDS = 300;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const r = await fetch(SOURCE_URL, {
      // Evita 304 em alguns proxies
      headers: { "cache-control": `no-cache` },
    });

    if (!r.ok) {
      return res
        .status(r.status)
        .json({ error: `Falha ao buscar dados na fonte (${r.status})` });
    }

    const data = (await r.json()) as CartaExterna[];

    // Normaliza todos os itens
    const cartas: CartaExt[] = Array.isArray(data)
      ? data.map(mapExternaParaInterna)
      : [];

    // Cache HTTP básico (opcional)
    res.setHeader("Cache-Control", `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS}`);

    return res.status(200).json({ items: cartas, count: cartas.length });
  } catch (err: any) {
    return res.status(500).json({ error: "Erro inesperado na agregação", details: err?.message });
  }
}
