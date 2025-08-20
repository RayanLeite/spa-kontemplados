import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/utils/currency';

// --- mapeamento de status (UI <-> banco) ---
const STATUS_UI = [
  { ui: 'disponivel', label: 'Disponível', db: 'ativa' },
  { ui: 'reservada',  label: 'Reservada',  db: 'reservada' },
  { ui: 'vendida',    label: 'Vendida',    db: 'vendida' },
] as const;

const dbToUi = (db?: string) =>
  STATUS_UI.find(s => s.db === db?.toLowerCase())?.ui ?? 'disponivel';
const uiToDb = (ui: string) =>
  STATUS_UI.find(s => s.ui === ui)?.db ?? 'ativa';
const uiLabel = (ui: string) =>
  STATUS_UI.find(s => s.ui === ui)?.label ?? 'Disponível';

const statusColorByUi = (ui: string) => {
  switch (ui) {
    case 'disponivel': return 'text-green-600';
    case 'reservada':  return 'text-yellow-600';
    case 'vendida':    return 'text-green-700';
    default:           return 'text-gray-600';
  }
};

// Interface para tipagem das cartas
interface Carta {
  id: string;
  idCarta: string;
  tipo: string;
  administradora: string;
  valorCredito: number;
  valorEntrada: number;
  parcelas: number;
  valorParcela: number;
  vencimento: string;
  comissao: number;
  status: string; // armazenado no banco (ativa|reservada|vendida)
  createdAt: string;
  updatedAt: string;
}

const CartasEmitidas = () => {
  const [searchId, setSearchId] = useState('');

  // dados
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // filtros
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [adminFilter, setAdminFilter] = useState<string>('all');
  const [parcelasFilter, setParcelasFilter] = useState<string>('all');

  // edição de status por linha
  const [editedUiStatus, setEditedUiStatus] = useState<Record<string, string>>({});
  const [savingRow, setSavingRow] = useState<Record<string, boolean>>({});

  // fetch
  const fetchCartas = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/cartas');
      if (!res.ok) throw new Error('Erro ao buscar cartas');
      const data: Carta[] = await res.json();
      setCartas(data);
      // inicializa estados editáveis com o que veio do banco
      const initial: Record<string, string> = {};
      data.forEach(c => { initial[c.id] = dbToUi(c.status); });
      setEditedUiStatus(initial);
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCartas(); }, []);

  // filtros/ordenação
  const getFilteredAndSortedCartas = () => {
    let filtered = cartas.filter(carta => {
      const term = searchId.toLowerCase();
      const matchesId =
        (carta.idCarta?.toLowerCase?.().includes(term) ?? false) ||
        (carta.id?.toLowerCase?.().includes(term) ?? false);

      const matchesStatus =
        statusFilter === 'all' || carta.status.toLowerCase() === statusFilter;

      const matchesAdmin =
        adminFilter === 'all' || carta.administradora.toLowerCase() === adminFilter;

      const matchesParcelas =
        parcelasFilter === 'all' || carta.parcelas.toString() === parcelasFilter;

      return matchesId && matchesStatus && matchesAdmin && matchesParcelas;
    });

    filtered.sort((a, b) =>
      sortOrder === 'desc' ? b.valorCredito - a.valorCredito : a.valorCredito - b.valorCredito
    );

    return filtered;
  };

  // salvar status alterado
  const handleSaveStatus = async (carta: Carta) => {
    const newUi = editedUiStatus[carta.id];
    const newDb = uiToDb(newUi);

    try {
      setSavingRow(prev => ({ ...prev, [carta.id]: true }));
      const res = await fetch(`/api/cartas/${carta.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newDb }),
      });
      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({ error: '' }));
        throw new Error(msg || 'Erro ao atualizar status');
      }

      // atualiza lista local
      setCartas(prev =>
        prev.map(c => (c.id === carta.id ? { ...c, status: newDb } : c))
      );
      // reseta "original" para esconder o botão de salvar
      setEditedUiStatus(prev => ({ ...prev, [carta.id]: dbToUi(newDb) }));
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? 'Erro ao atualizar status');
    } finally {
      setSavingRow(prev => ({ ...prev, [carta.id]: false }));
    }
  };

  const filteredCartas = getFilteredAndSortedCartas();

  return (
    <div className="bg-white flex items-stretch justify-center min-h-screen">
      <div className="flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-[22px] max-md:max-w-full max-md:px-5">
        <div className="flex w-full gap-[22px] flex-wrap max-md:max-w-full">
          <Sidebar className="bg-gradient-to-b from-gray-800 to-gray-900" />

          <main className="bg-white min-w-60 flex-1 shrink basis-16 rounded-[32px] max-md:max-w-full">
            <Header title="Cartas de Crédito Emitidas" className="bg-gradient-to-r from-gray-800 to-gray-900" />

            <div className="min-h-[704px] w-full mt-[22px] p-8 max-md:max-w-full max-md:px-5">
              <h2 className="text-[26px] font-bold text-[#464646] mb-6">Cartas de Crédito Emitidas</h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
              )}

              {/* filtros (mantidos) */}
              <div className="flex flex-wrap gap-4 mb-6">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-40 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px]">
                    <SelectValue placeholder="Maior para Menor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Maior para Menor</SelectItem>
                    <SelectItem value="asc">Menor para Maior</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-32 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px]">
                    <SelectValue placeholder="Invoices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="ativa">Ativa</SelectItem>
                    <SelectItem value="reservada">Reservada</SelectItem>
                    <SelectItem value="vendida">Vendida</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={adminFilter} onValueChange={setAdminFilter}>
                  <SelectTrigger className="w-40 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px]">
                    <SelectValue placeholder="Administradora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="caixa">CAIXA</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={parcelasFilter} onValueChange={setParcelasFilter}>
                  <SelectTrigger className="w-32 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px]">
                    <SelectValue placeholder="Parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="162">162x</SelectItem>
                    <SelectItem value="180">180x</SelectItem>
                    <SelectItem value="240">240x</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 bg-[rgba(244,244,244,1)] border border-[rgba(223,223,223,1)] rounded-[20px] px-4 py-2">
                  <Input
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="border-none bg-transparent p-0 text-[#464646] placeholder-[rgba(196,196,196,1)] focus-visible:ring-0"
                  />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/a703ce3b7c44b27ebf18ddc36b8c691b08dfdac9?placeholderIfAbsent=true"
                    alt="Search icon"
                    className="w-4 h-4"
                  />
                </div>
              </div>

              {/* Tabela: remove Ações; Status vai para a última coluna */}
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-[#464646]">Carregando cartas...</p>
                </div>
              ) : (
                <div className="rounded-[20px] border border-[rgba(223,223,223,1)] shadow-sm overflow-hidden bg-white">
                  {/* Cabeçalho */}
                  <div className="bg-[rgba(244,244,244,1)] grid grid-cols-7 gap-4 p-4 font-bold text-[#464646] border-b border-[rgba(223,223,223,1)]">
                    <div className="text-left">ID da Carta</div>
                    <div className="text-left">Tipo</div>
                    <div className="text-left">Administradora</div>
                    <div className="text-left">Parcelas</div>
                    <div className="text-left">Valor</div>
                    <div className="text-left">Valor Entrada</div>
                    <div className="text-left">Status</div> {/* última coluna */}
                  </div>

                  {/* Corpo */}
                  <div className="divide-y divide-[rgba(223,223,223,1)]">
                    {filteredCartas.length > 0 ? (
                      filteredCartas.map((carta) => {
                        const currentUi = editedUiStatus[carta.id] ?? dbToUi(carta.status);
                        const originalUi = dbToUi(carta.status);
                        const changed = currentUi !== originalUi;
                        const saving = !!savingRow[carta.id];

                        return (
                          <div key={carta.id} className="grid grid-cols-7 gap-4 p-4 hover:bg-gray-50 transition-colors">
                            {/* ID da Carta */}
                            <div className="flex items-center">
                              <span className="font-mono text-sm text-gray-700">{carta.idCarta || '-'}</span>
                            </div>

                            {/* Tipo */}
                            <div className="flex items-center gap-2 text-[#464646] font-medium">
                              <img
                                src={
                                  carta.tipo.toLowerCase() === 'imovel'
                                    ? 'https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/6864fc147303c24a910cb0aa0ef30037641d32e4?placeholderIfAbsent=true'
                                    : 'https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/074eea69dfe99bf3c6a17cc420e623d8b2a8f6e0?placeholderIfAbsent=true'
                                }
                                alt={`${carta.tipo} icon`}
                                className="w-4 h-4"
                                style={
                                  carta.tipo.toLowerCase() === 'veiculo'
                                    ? { filter: 'brightness(0) saturate(100%) invert(27%) sepia(8%) saturate(1058%) hue-rotate(314deg) brightness(91%) contrast(86%)' }
                                    : {}
                                }
                              />
                              {carta.tipo}
                            </div>

                            {/* Administradora */}
                            <div className="text-[#464646] flex items-center">
                              {carta.administradora}
                            </div>

                            {/* Parcelas */}
                            <div className="text-[#464646] flex items-center">{carta.parcelas}x</div>

                            {/* Valor */}
                            <div className="font-bold text-[#464646] flex items-center">
                              {formatCurrency(carta.valorCredito)}
                            </div>

                            {/* Valor Entrada */}
                            <div className="text-[#464646] flex items-center">
                              {formatCurrency(carta.valorEntrada)}
                            </div>

                            {/* Status (dropdown + salvar) */}
                            <div className="flex items-center gap-3">
                              <Select
                                value={currentUi}
                                onValueChange={(v) =>
                                  setEditedUiStatus((prev) => ({ ...prev, [carta.id]: v }))
                                }
                                disabled={saving}
                              >
                                <SelectTrigger
                                  className={`w-30 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px] ${statusColorByUi(currentUi)}`}
                                >
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  {STATUS_UI.map((s) => (
                                    <SelectItem key={s.ui} value={s.ui}>
                                      {s.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {changed && (
                                <button
                                  onClick={() => handleSaveStatus(carta)}
                                  disabled={saving}
                                  title="Salvar"
                                  className={`flex items-center gap-2 px-3 py-2 rounded-[12px] border border-[rgba(223,223,223,1)] shadow-sm ${saving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                >
                                  {/* ícone de disquete (inline SVG) */}
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="w-4 h-4">
                                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12l2-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm-1 6h8v5H6v-5z" />
                                  </svg>
                                </button>
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CartasEmitidas;
