import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/utils/currency';

// Interface para tipagem das cartas
interface Carta {
  id: string;
  idCarta: string;              // << ADICIONADO
  tipo: string;
  administradora: string;
  valorCredito: number;
  valorEntrada: number;
  parcelas: number;
  valorParcela: number;
  vencimento: string;
  comissao: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const CartasEmitidas = () => {
  const [searchId, setSearchId] = useState('');

  // Estados para dados do banco e controle de loading/erro
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Estados para filtros
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [adminFilter, setAdminFilter] = useState<string>('all');
  const [parcelasFilter, setParcelasFilter] = useState<string>('all');

  // Função para buscar cartas do banco
  const fetchCartas = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/cartas');

      if (!response.ok) {
        throw new Error('Erro ao buscar cartas');
      }

      const data = await response.json();
      setCartas(data);
    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // useEffect para carregar dados na montagem do componente
  useEffect(() => {
    fetchCartas();
  }, []);

  // Função para determinar cor do status
  const getStatusColorClass = (status: string) => {
    switch (status?.toLowerCase?.()) {
      case 'ativa':
        return 'text-green-600';
      case 'reservada':
        return 'text-yellow-600';
      case 'vendida':
        return 'text-green-700';
      default:
        return 'text-gray-600';
    }
  };

  // Função para filtrar e ordenar cartas
  const getFilteredAndSortedCartas = () => {
    let filtered = cartas.filter((carta) => {
      // Filtro por ID da Carta (prioriza idCarta; fallback para id interno)
      const term = searchId.toLowerCase();
      const matchesId =
        (carta.idCarta?.toLowerCase?.().includes(term) ?? false) ||
        (carta.id?.toLowerCase?.().includes(term) ?? false);

      // Filtro por status
      const matchesStatus = statusFilter === 'all' || carta.status.toLowerCase() === statusFilter;

      // Filtro por administradora
      const matchesAdmin = adminFilter === 'all' || carta.administradora.toLowerCase() === adminFilter;

      // Filtro por parcelas
      const matchesParcelas = parcelasFilter === 'all' || carta.parcelas.toString() === parcelasFilter;

      return matchesId && matchesStatus && matchesAdmin && matchesParcelas;
    });

    // Ordenação por valor
    filtered.sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.valorCredito - a.valorCredito;
      } else {
        return a.valorCredito - b.valorCredito;
      }
    });

    return filtered;
  };

  // Função para remover carta
  const handleRemoveCarta = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover esta carta?')) {
      return;
    }

    try {
      const response = await fetch(`/api/cartas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao remover carta');
      }

      // Atualiza a lista removendo a carta
      setCartas((prev) => prev.filter((carta) => carta.id !== id));
      alert('Carta removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover carta:', error);
      alert('Erro ao remover carta');
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
              {/* Page Title */}
              <h2 className="text-[26px] font-bold text-[#464646] mb-6">Cartas de Crédito Emitidas</h2>

              {/* Exibição de erro */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
              )}

              {/* Filters */}
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

              {/* Tabela customizada com estética do projeto */}
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-[#464646]">Carregando cartas...</p>
                </div>
              ) : (
                <div className="rounded-[20px] border border-[rgba(223,223,223,1)] shadow-sm overflow-hidden bg-white">
                  {/* Cabeçalho da Tabela */}
                  <div className="bg-[rgba(244,244,244,1)] grid grid-cols-8 gap-4 p-4 font-bold text-[#464646] border-b border-[rgba(223,223,223,1)]">
                    <div className="text-left">ID da Carta</div> {/* << NOVA PRIMEIRA COLUNA */}
                    <div className="text-left">Tipo</div>
                    <div className="text-left">Status</div>
                    <div className="text-left">Administradora</div>
                    <div className="text-left">Parcelas</div>
                    <div className="text-left">Valor</div>
                    <div className="text-left">Valor Entrada</div>
                    <div className="text-center">Ações</div>
                  </div>

                  {/* Corpo da Tabela */}
                  <div className="divide-y divide-[rgba(223,223,223,1)]">
                    {filteredCartas.length > 0 ? (
                      filteredCartas.map((carta) => (
                        <div
                          key={carta.id}
                          className="grid grid-cols-8 gap-4 p-4 hover:bg-gray-50 transition-colors"
                        >
                          {/* ID da Carta */}
                          <div className="flex items-center">
                            <span className="font-mono text-sm text-gray-700">
                              {carta.idCarta || '-'}
                            </span>
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
                                  ? {
                                      filter:
                                        'brightness(0) saturate(100%) invert(27%) sepia(8%) saturate(1058%) hue-rotate(314deg) brightness(91%) contrast(86%)',
                                    }
                                  : {}
                              }
                            />
                            {carta.tipo}
                          </div>

                          {/* Status */}
                          <div className={`font-semibold ${getStatusColorClass(carta.status)}`}>
                            {carta.status}
                          </div>

                          {/* Administradora */}
                          <div className="text-[#464646]">{carta.administradora}</div>

                          {/* Parcelas */}
                          <div className="text-[#464646]">{carta.parcelas}x</div>

                          {/* Valor */}
                          <div className="font-bold text-[#464646]">
                            {formatCurrency(carta.valorCredito)}
                          </div>

                          {/* Valor Entrada */}
                          <div className="text-[#464646]">
                            {formatCurrency(carta.valorEntrada)}
                          </div>

                          {/* Ações */}
                          <div className="text-center">
                            <Button
                              onClick={() => handleRemoveCarta(carta.id)}
                              className="bg-[#E8C547] hover:bg-[#E8C547]/90 text-[#464646] font-semibold px-4 py-2 rounded-[15px] text-sm"
                            >
                              × Remover
                            </Button>
                          </div>
                        </div>
                      ))
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
