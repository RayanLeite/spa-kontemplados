import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const CartasEmitidas = () => {
  const [searchId, setSearchId] = useState('');

  const creditCards = [
    {
      id: 'im368',
      type: 'Imóvel',
      status: 'Ativa',
      administrator: 'CAIXA',
      installments: '162x',
      value: 'R$ 358.000,00',
      statusColor: 'text-green-600'
    },
    {
      id: 'im357',
      type: 'Imóvel',
      status: 'Ativa',
      administrator: 'CAIXA',
      installments: '162x',
      value: 'R$ 334.000,00',
      statusColor: 'text-green-600'
    },
    {
      id: 'im369',
      type: 'Imóvel',
      status: 'Reservada',
      administrator: 'CAIXA',
      installments: '162x',
      value: 'R$ 328.000,00',
      statusColor: 'text-yellow-600'
    },
    {
      id: 'im321',
      type: 'Imóvel',
      status: 'Reservada',
      administrator: 'CAIXA',
      installments: '162x',
      value: 'R$ 320.000,00',
      statusColor: 'text-yellow-600'
    },
    {
      id: 'im348',
      type: 'Imóvel',
      status: 'Vendida',
      administrator: 'CAIXA',
      installments: '162x',
      value: 'R$ 316.000,00',
      statusColor: 'text-green-700'
    }
  ];

  return (
    <div className="bg-white flex items-stretch justify-center min-h-screen">
      <div className="flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-[22px] max-md:max-w-full max-md:px-5">
        <div className="flex w-full gap-[22px] flex-wrap max-md:max-w-full">
          <Sidebar className="bg-gradient-to-b from-gray-800 to-gray-900" />
          
          <main className="bg-white min-w-60 flex-1 shrink basis-16 rounded-[32px] max-md:max-w-full">
            <Header 
              title="Cartas de Crédito Emitidas" 
              className="bg-gradient-to-r from-gray-800 to-gray-900"
            />
            
            <div className="min-h-[704px] w-full mt-[22px] p-8 max-md:max-w-full max-md:px-5">
              {/* Page Title */}
              <h2 className="text-[26px] font-bold text-[#464646] mb-6">Cartas de Crédito Emitidas</h2>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <Select>
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

                <Select>
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

                <Select>
                  <SelectTrigger className="w-40 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px]">
                    <SelectValue placeholder="Administradora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="caixa">CAIXA</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-32 bg-[rgba(244,244,244,1)] border-[rgba(223,223,223,1)] rounded-[20px]">
                    <SelectValue placeholder="Parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="162">162x</SelectItem>
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

              {/* Credit Cards List */}
              <div className="space-y-4">
                {creditCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white border border-[rgba(223,223,223,1)] rounded-[20px] p-6 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      {/* Property Icon */}
                      <div className="flex items-center gap-2">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/6864fc147303c24a910cb0aa0ef30037641d32e4?placeholderIfAbsent=true"
                          alt="Property icon"
                          className="w-5 h-5"
                        />
                        <span className="text-[#464646] font-semibold">{card.type}</span>
                      </div>

                      {/* ID */}
                      <div className="text-[#464646] font-semibold">
                        ID: {card.id}
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#464646] text-sm">Status:</span>
                        <span className={`font-semibold ${card.statusColor}`}>
                          {card.status}
                        </span>
                      </div>

                      {/* Administrator */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#464646] text-sm">Administradora:</span>
                        <img
                          src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/9fa1c699d459dfd5da6af77300dd9e5937a59ab0?placeholderIfAbsent=true"
                          alt="CAIXA logo"
                          className="h-6"
                        />
                      </div>

                      {/* Installments */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#464646] text-sm">Parcelas:</span>
                        <span className="text-[#464646] font-semibold">{card.installments}</span>
                      </div>

                      {/* Value */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#464646] text-sm">Valor:</span>
                        <span className="text-[#464646] font-bold">{card.value}</span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button className="bg-[#E8C547] hover:bg-[#E8C547]/90 text-[#464646] font-semibold px-6 py-2 rounded-[15px]">
                      × Remover
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CartasEmitidas;