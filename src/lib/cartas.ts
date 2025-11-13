// src/lib/cartas.ts
export type CartaExterna = {
  id: number;
  categoria: string;
  valor_credito: string;              // "32831.00"
  valor_credito_original: string;     // "43092.62"
  entrada: number;                    // 19584.93
  parcelas: number;                   // 42
  valor_parcela: string;              // "429.00"
  administradora: string;
  reserva: "Reservar" | "Reservado";
  fundo: string;                      // "0.00" | "38596.79" ...
  prox_reajuste: string | null;       // "INCC" | "IPCA" | "FIPE" | null
  administradora_img: string;
  // formatos prontos (strings BRL)
  valor_credito_fmt: string;
  valor_credito_original_fmt: string;
  entrada_fmt: string;
  valor_parcela_fmt: string;
  fundo_fmt: string;
};

export type CartaExt = {
  id: number;
  categoria: string;
  administradora: string;
  administradoraImg: string;
  reserva: "Reservar" | "Reservado";
  proxReajuste: string | null;

  // valores numéricos para filtros/ordenar
  valorCredito: number;
  valorCreditoOriginal: number;
  entrada: number;
  parcelas: number;
  valorParcela: number;
  fundo: number;

  // strings já formatadas BRL (para exibir)
  valorCreditoFmt: string;
  valorCreditoOriginalFmt: string;
  entradaFmt: string;
  valorParcelaFmt: string;
  fundoFmt: string;
};

const toNumber = (v: string | number): number =>
  typeof v === "number" ? v : Number.parseFloat(v ?? "0");

export const mapExternaParaInterna = (c: CartaExterna): CartaExt => ({
  id: c.id,
  categoria: c.categoria,
  administradora: c.administradora,
  administradoraImg: c.administradora_img,
  reserva: c.reserva,
  proxReajuste: c.prox_reajuste,

  valorCredito: toNumber(c.valor_credito),
  valorCreditoOriginal: toNumber(c.valor_credito_original),
  entrada: toNumber(c.entrada),
  parcelas: Number(c.parcelas),
  valorParcela: toNumber(c.valor_parcela),
  fundo: toNumber(c.fundo),

  valorCreditoFmt: c.valor_credito_fmt,
  valorCreditoOriginalFmt: c.valor_credito_original_fmt,
  entradaFmt: c.entrada_fmt,
  valorParcelaFmt: c.valor_parcela_fmt,
  fundoFmt: c.fundo_fmt,
});
