
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { CreditTypeSelector } from '@/components/dashboard/CreditTypeSelector';
import { AdministratorSelector } from '@/components/dashboard/AdministratorSelector';
import { CreditValueForm } from '@/components/dashboard/CreditValueForm';
import { InstallmentForm } from '@/components/dashboard/InstallmentForm';
import { CommissionSection } from '@/components/dashboard/CommissionSection';

const Index = () => {
  const [creditType, setCreditType] = useState<string>('imovel');
  const [administrator, setAdministrator] = useState<string>('selected');
  const [creditValue, setCreditValue] = useState<string>('R$ 445.000,00');
  const [entryValue, setEntryValue] = useState<string>('R$ 00.000,00');
  const [installments, setInstallments] = useState<string>('000x');
  const [installmentValue, setInstallmentValue] = useState<string>('R$ 0.000,00');
  const [dueDate, setDueDate] = useState<string>('14 / 10 / 2025');

  const handleCreditTypeSelect = (type: string) => {
    setCreditType(type);
  };

  const handleAdministratorSelect = (admin: string) => {
    setAdministrator(admin);
  };

  const handleValuesChange = (credit: string, entry: string) => {
    setCreditValue(credit);
    setEntryValue(entry);
  };

  const handleInstallmentChange = (inst: string, instValue: string, due: string) => {
    setInstallments(inst);
    setInstallmentValue(instValue);
    setDueDate(due);
  };

  const handleSubmit = () => {
    const formData = {
      creditType,
      administrator,
      creditValue,
      entryValue,
      installments,
      installmentValue,
      dueDate,
    };
    
    console.log('Form submitted with data:', formData);
    alert('Carta de Crédito cadastrada com sucesso!');
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
              <div className="flex w-full gap-[22px] flex-wrap max-md:max-w-full">
                <CreditTypeSelector onTypeSelect={handleCreditTypeSelect} />
                
                <div className="flex min-w-60 gap-[22px] flex-1 shrink basis-16 max-md:max-w-full">
                  <AdministratorSelector onAdministratorSelect={handleAdministratorSelect} />
                </div>
              </div>
              
              <div className="flex w-full gap-[22px] flex-wrap mt-[22px] max-md:max-w-full">
                <CreditValueForm onValuesChange={handleValuesChange} />
                <InstallmentForm onInstallmentChange={handleInstallmentChange} />
              </div>
              
              <CommissionSection onSubmit={handleSubmit} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;

