import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { CreditTypeSelector } from '@/components/dashboard/CreditTypeSelector';
import { AdministratorSelector } from '@/components/dashboard/AdministratorSelector';
import { CreditValueForm } from '@/components/dashboard/CreditValueForm';
import { InstallmentForm } from '@/components/dashboard/InstallmentForm';
import { CommissionSection } from '@/components/dashboard/CommissionSection';

const CadastrarCarta = () => {
  const [creditType, setCreditType] = useState<string>('imovel');
  const [administrator, setAdministrator] = useState<string>('selected');
  
  const [creditValue, setCreditValue] = useState<number>(0); 
  const [entryValue, setEntryValue] = useState<number>(0); 
  const [installments, setInstallments] = useState<number>(0); 
  const [installmentValue, setInstallmentValue] = useState<number>(0); 
  const [dueDate, setDueDate] = useState<string>(''); 

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [resetKey, setResetKey] = useState<number>(0);

  const handleCreditTypeSelect = (type: string) => {
    setCreditType(type);
  };

  const handleAdministratorSelect = (admin: string) => {
    setAdministrator(admin);
  };

  const handleValuesChange = (credit: number, entry: number) => {
    setCreditValue(credit);
    setEntryValue(entry);
  };

  const handleInstallmentChange = (inst: number, instValue: number, due: string) => {
    setInstallments(inst);
    setInstallmentValue(instValue);
    setDueDate(due);
  };

  const resetAllFields = () => {
    setCreditType('imovel');
    setAdministrator('selected');
    setCreditValue(0);
    setEntryValue(0);
    setInstallments(0);
    setInstallmentValue(0);
    setDueDate('');
    setError('');
    
    setResetKey(prev => prev + 1);
  };

  const handleSubmit = async (commission: number) => {
    if (!creditValue || !installments || !installmentValue || !dueDate) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formData = {
        tipo: creditType,
        administradora: administrator,
        valorCredito: creditValue,
        valorEntrada: entryValue,
        parcelas: installments,
        valorParcela: installmentValue,
        vencimento: dueDate,
        comissao: commission,
      };

      console.log('Enviando dados:', formData);

      const response = await fetch('/api/cartas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao cadastrar carta');
      }

      const result = await response.json();
      console.log('Carta cadastrada com sucesso:', result);
      
      alert('Carta de Crédito cadastrada com sucesso!');
      
      resetAllFields();
      
    } catch (error) {
      console.error('Erro ao cadastrar carta:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white flex items-stretch justify-center min-h-screen">
      <div className="flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-[22px] max-md:max-w-full max-md:px-5">
        <div className="flex w-full gap-[22px] flex-wrap max-md:max-w-full">
          <Sidebar className="bg-gradient-to-b from-gray-800 to-gray-900" />
          
          <main className="bg-white min-w-60 flex-1 shrink basis-16 rounded-[32px] max-md:max-w-full">
            <Header 
              title="Cadastrar Carta de Crédito" 
              className="bg-gradient-to-r from-gray-800 to-gray-900"
            />
            
            <div className="min-h-[704px] w-full mt-[22px] max-md:max-w-full">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <div className="flex w-full gap-[22px] flex-wrap max-md:max-w-full">
                <CreditTypeSelector 
                  key={`credit-type-${resetKey}`}
                  onTypeSelect={handleCreditTypeSelect} 
                />
                
                <div className="flex min-w-60 gap-[22px] flex-1 shrink basis-16 max-md:max-w-full">
                  <AdministratorSelector 
                    key={`administrator-${resetKey}`}
                    onAdministratorSelect={handleAdministratorSelect} 
                  />
                </div>
              </div>
              
              <div className="flex w-full gap-[22px] flex-wrap mt-[22px] max-md:max-w-full">
                <CreditValueForm 
                  key={`credit-value-${resetKey}`}
                  onValuesChange={handleValuesChange} 
                />
                <InstallmentForm 
                  key={`installment-${resetKey}`}
                  onInstallmentChange={handleInstallmentChange} 
                />
              </div>
              
              <CommissionSection 
                key={`commission-${resetKey}`}
                onSubmit={handleSubmit} 
              />
              
              {isSubmitting && (
                <div className="text-center mt-4">
                  <p className="text-[#464646]">Cadastrando carta...</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CadastrarCarta;