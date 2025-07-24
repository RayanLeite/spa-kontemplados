
import React, { useState } from 'react';

interface InstallmentFormProps {
  onInstallmentChange: (installments: string, installmentValue: string, dueDate: string) => void;
  className?: string;
}

export const InstallmentForm: React.FC<InstallmentFormProps> = ({ 
  onInstallmentChange, 
  className = '' 
}) => {
  const [installments, setInstallments] = useState('000x');
  const [installmentValue, setInstallmentValue] = useState('R$ 0.000,00');
  const [dueDate, setDueDate] = useState('14 / 10 / 2025');

  const handleInstallmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstallments(e.target.value);
    onInstallmentChange(e.target.value, installmentValue, dueDate);
  };

  const handleInstallmentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstallmentValue(e.target.value);
    onInstallmentChange(installments, e.target.value, dueDate);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    onInstallmentChange(installments, installmentValue, e.target.value);
  };

  return (
    <section
      className={`bg-white shadow-[0px_0px_32px_rgba(0,0,0,0.1)] border flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-8 rounded-[32px] border-[rgba(244,244,244,1)] border-solid max-md:max-w-full max-md:px-5 ${className}`}
    >
      <div className="w-full text-[26px] text-[#464646] font-bold whitespace-nowrap max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch justify-center max-md:max-w-full">
          <div className="flex w-full max-md:max-w-full">
            <h2 className="text-[#464646]">Parcelas</h2>
          </div>
          <div className="bg-[rgba(223,223,223,1)] flex min-h-px w-full gap-2.5 mt-4 max-md:max-w-full" />
        </div>
      </div>
      <form className="flex w-full gap-[22px] text-base font-semibold flex-wrap mt-8 max-md:max-w-full">
        <div className="flex-1 shrink basis-[0%]">
          <label htmlFor="installments" className="text-[#464646] block">
            Nº de Parcelas:
          </label>
          <div className="bg-[rgba(244,244,244,1)] border flex min-h-[50px] w-full items-center gap-2.5 text-[rgba(196,196,196,1)] whitespace-nowrap mt-3 p-4 rounded-[20px] border-[rgba(223,223,223,1)] border-solid">
            <input
              id="installments"
              type="text"
              value={installments}
              onChange={handleInstallmentsChange}
              placeholder="000x"
              className="self-stretch flex w-full items-center gap-2.5 flex-1 shrink basis-[0%] my-auto bg-transparent text-[rgba(196,196,196,1)] placeholder-[rgba(196,196,196,1)] outline-none"
            />
          </div>
        </div>
        <div className="flex-1 shrink basis-[0%]">
          <label htmlFor="installmentValue" className="text-[#464646] block">
            Valor da Parcela:
          </label>
          <div className="bg-[rgba(244,244,244,1)] border flex min-h-[50px] w-full items-center gap-2.5 text-[rgba(196,196,196,1)] mt-3 p-4 rounded-[20px] border-[rgba(223,223,223,1)] border-solid">
            <input
              id="installmentValue"
              type="text"
              value={installmentValue}
              onChange={handleInstallmentValueChange}
              placeholder="R$ 0.000,00"
              className="self-stretch flex w-full items-center gap-2.5 flex-1 shrink basis-[0%] my-auto bg-transparent text-[rgba(196,196,196,1)] placeholder-[rgba(196,196,196,1)] outline-none"
            />
          </div>
        </div>
        <div className="text-[#464646] flex-1 shrink basis-[0%]">
          <label htmlFor="dueDate" className="text-[#464646] block">
            Vencimento:
          </label>
          <div className="bg-[rgba(244,244,244,1)] border flex min-h-[50px] w-full items-center gap-2.5 mt-3 p-4 rounded-[20px] border-[rgba(223,223,223,1)] border-solid">
            <input
              id="dueDate"
              type="text"
              value={dueDate}
              onChange={handleDueDateChange}
              className="self-stretch flex w-full items-center gap-2.5 flex-1 shrink basis-[0%] my-auto bg-transparent text-[#464646] outline-none"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/a703ce3b7c44b27ebf18ddc36b8c691b08dfdac9?placeholderIfAbsent=true"
              alt="Calendar icon"
              className="aspect-[1/1] object-contain w-3.5 fill-[#464646] self-stretch shrink-0 my-auto"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

