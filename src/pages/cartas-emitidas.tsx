import React, { useEffect, useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatCurrency } from '@/utils/currency';
import { CartaExt } from '@/lib/cartas';
import Image from 'next/image';
import { Eye, CarFront, House } from 'lucide-react';

// --- mapeamento de status (UI <-> banco) ---
const STATUS_UI = [
  { ui: 'disponivel', label: 'Disponível', db: 'ativa' },
  { ui: 'reservada',  label: 'Reservada',  db: 'reservada' },
  { ui: 'vendida',    label: 'Vendida',    db: 'vendida' },
] as const;

const dbToUi = (db?: string) =>
  STATUS_UI.find(s => s.db === db?.toLowerCase())?.ui ?? 'disponivel';

const statusColorByUi = (ui: string) => {
  switch (ui) {
    case 'disponivel': return 'text-green-600';
    case 'reservada':  return 'text-yellow-600';
    case 'vendida':    return 'text-green-700';
    default:           return 'text-gray-600';
  }
};

const CartasEmitidas = () => {
  // dados
  const [cartas, setCartas] = useState<CartaExt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // edição de status por linha
  const [editedUiStatus, setEditedUiStatus] = useState<Record<string, string>>({});
  const [savingRow, setSavingRow] = useState<Record<string, boolean>>({});

  // modal de detalhes
  const [open, setOpen] = useState(false);
  const [cartaSelecionada, setCartaSelecionada] = useState<CartaExt | null>(null);

  // fetch inicial
  async function fetchCartas(signal?: AbortSignal): Promise<CartaExt[]> {
    const r = await fetch("/api/cartas", { signal });
    if (!r.ok) throw new Error("Falha ao carregar cartas");
    const json = await r.json();
    return json.items as CartaExt[];
  }

  // DDI + DDD + número (apenas dígitos)
  const WHATSAPP_PHONE = '5561982708672';

  function makeWhatsAppUrl(c: CartaExt) {
    const msg = `Olá! Tenho interesse em reservar esta carta:
• Nº: ${c.id}
• Crédito: ${formatCurrency(c.valorCredito)}
• Entrada: ${formatCurrency(c.entrada)}
• Parcela: ${c.parcelas}x de ${formatCurrency(c.valorParcela)}
• Administradora: ${c.administradora ?? ''}

Podemos negociar?`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  }

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    fetchCartas(ac.signal)
      .then(setCartas)
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.message ?? "Erro");
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* mantém o respiro do topo/laterais do cabeçalho */}
      <div className="px-[22px] pt-[22px]">
        <Header title="Cartas de Crédito Emitidas" className="bg-gradient-to-r from-gray-800 to-gray-900" />
      </div>

      {/* conteúdo central */}
      <div className="mx-auto w-full max-w-[1366px] px-6 py-6">
        {/* <h2 className="text-[26px] font-bold text-[#464646] mb-6">Cartas de Crédito Emitidas</h2> */}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
        )}

        {/* ====== TABELA ====== */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
          </div>
        ) : (
          <div className="rounded-[20px] border border-[rgba(223,223,223,1)] shadow-sm overflow-hidden bg-white">
            {/* Cabeçalho (agora 7 colunas, adicionando “Detalhes”) */}
            <div className="bg-[rgba(244,244,244,1)] grid grid-cols-8 p-4 font-bold text-[#464646] border-b border-[rgba(223,223,223,1)]"
              style={{ gridTemplateColumns: '5% 5% 15% 15% 15% 15% 15% 15%' }}
            >
              <div className="text-center"></div>
              <div className="text-center">Nº</div>
              <div className="text-center">Crédito</div>
              <div className="text-center">Entrada</div>
              <div className="text-center">Parcela</div>
              <div className="text-center">Administradora</div>
              <div className="text-center">Detalhes</div>
              <div className="text-center">Status</div>
            </div>

            {/* Corpo */}
            <div className="divide-y divide-[rgba(223,223,223,1)]">
              {cartas.length > 0 ? (
                cartas.map((carta) => {
                  const currentUi  = editedUiStatus[carta.id] ?? dbToUi(carta.reserva);
                  const originalUi = dbToUi(carta.reserva);
                  const changed = currentUi !== originalUi;
                  const saving = !!savingRow[carta.id];

                  return (
                    <div key={carta.id} className="grid grid-cols-8 p-4 hover:bg-gray-50 transition-colors"
                      style={{ gridTemplateColumns: '5% 5% 15% 15% 15% 15% 15% 15%' }}
                    >
                      {/* Ícone conforme categoria */}
                      <div className="flex justify-center items-center">
                        {carta.categoria?.toLowerCase() === "imóvel" ? (
                          <House className="w-7 h-7" color='black' />
                        ) : carta.categoria?.toLowerCase() === "veículo" ? (
                          <CarFront className="w-7 h-7" color='black' />
                        ) : null}
                      </div>
                        
                      {/* Nº */}
                      <div className="flex justify-center items-center">
                        <span className="font-mono text-sm text-gray-700">{carta.id || '-'}</span>
                      </div>

                      {/* Crédito */}
                      <div className="font-bold text-[#464646] flex justify-center items-center">
                        {formatCurrency(carta.valorCredito)}
                      </div>

                      {/* Entrada */}
                      <div className="text-[#464646] flex justify-center items-center">
                        {formatCurrency(carta.entrada)}
                      </div>

                      {/* Parcela (ex.: "194x de R$ 6.143,00") */}
                      <div className="text-[#464646] flex justify-center items-center">
                        {`${carta.parcelas}x de ${formatCurrency(carta.valorParcela)}`}
                      </div>

                      {/* Administradora (logo, se houver) */}
                      <div className="text-[#464646] flex justify-center items-center">
                        {carta.administradoraImg ? (
                          <div className="relative h-8 w-24">
                            <Image
                              src={carta.administradoraImg}
                              alt={`Logo ${carta.administradora ?? 'Administradora'}`}
                              fill
                              style={{ objectFit: 'contain' }}
                              sizes="96px"
                              priority={false}
                            />
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </div>

                      {/* Detalhes (olho) */}
                      <div className="flex justify-center items-center">
                        <button
                          type="button"
                          onClick={() => { setCartaSelecionada(carta); setOpen(true); }}
                          className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-[rgba(223,223,223,1)] hover:bg-gray-50 cursor-pointer"
                          title="Ver detalhes"
                        >
                          <Eye className="h-4 w-4 text-[#464646]" />
                        </button>
                      </div>

                      {/* Status (botão WhatsApp ou “Reservado”) */}
                      <div className="flex justify-center items-center">
                        {String(carta.reserva).toLowerCase() === 'reservar' ? (
                          <a
                            href={makeWhatsAppUrl(carta)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-[12px] bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 transition"
                            title="Negociar via WhatsApp"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 fill-current">
                              <path d="M19.11 17.44c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.6.14-.17.27-.69.88-.85 1.06-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.16-1.34-.8-.7-1.34-1.56-1.5-1.82-.16-.27-.02-.42.12-.56.13-.13.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.02.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.62.23-1.16.16-1.28-.07-.11-.25-.18-.52-.31zM16.04 3.2c-7.09 0-12.84 5.75-12.84 12.84 0 2.27.61 4.5 1.77 6.46L3.2 28.8l6.52-1.71a12.79 12.79 0 0 0 6.32 1.7c7.09 0 12.84-5.75 12.84-12.84S23.13 3.2 16.04 3.2zm0 23.37c-2.03 0-4.02-.53-5.77-1.53l-.41-.24-3.87 1.02 1.04-3.77-.25-.39a10.44 10.44 0 0 1-1.6-5.58c0-5.77 4.69-10.46 10.46-10.46S26.5 10.31 26.5 16.08 21.81 26.57 16.04 26.57z"/>
                            </svg>
                            <span>Negociar</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-[12px] bg-red-600 px-4 py-2 font-semibold text-white">
                            Reservado
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-gray-500">Nenhuma carta encontrada.</div>
              )}
            </div>
          </div>
        )}

        {/* Modal de detalhes (somente campos que existem no JSON) */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[520px] !bg-white !text-black border border-gray-200">
            <DialogHeader>
              <DialogTitle>Informação</DialogTitle>
            </DialogHeader>

            {cartaSelecionada && (
              <div className="space-y-2 text-[15px]">
                <div><span className="font-semibold">Código:</span> {cartaSelecionada.id}</div>
                <div><span className="font-semibold">Nome:</span> {cartaSelecionada.categoria}</div>
                <div><span className="font-semibold">Crédito:</span> {cartaSelecionada.valorCreditoFmt ?? formatCurrency(cartaSelecionada.valorCredito)}</div>
                <div><span className="font-semibold">Entrada:</span> {cartaSelecionada.entradaFmt ?? formatCurrency(cartaSelecionada.entrada)}</div>
                <div><span className="font-semibold">Prazo:</span> {cartaSelecionada.parcelas}x</div>
                <div><span className="font-semibold">Parcelas:</span> {cartaSelecionada.valorParcelaFmt ?? formatCurrency(cartaSelecionada.valorParcela)}</div>
                <div><span className="font-semibold">Fundo Comum:</span> {cartaSelecionada.fundoFmt ?? formatCurrency(cartaSelecionada.fundo)}</div>
                <div><span className="font-semibold">Administradora:</span> {cartaSelecionada.administradora}</div>
                <div><span className="font-semibold">Situação:</span> {cartaSelecionada.reserva}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CartasEmitidas;
