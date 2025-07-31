import React, { useState } from 'react';

interface CreditValueFormProps {
  onValuesChange: (creditValue: number, entryValue: number) => void;
  className?: string;
}

export const CreditValueForm: React.FC<CreditValueFormProps> = ({ 
  onValuesChange, 
  className = '' 
}) => {
  const [creditValue, setCreditValue] = useState<number>(0);
  const [entryValue, setEntryValue] = useState<number>(0);

  const handleCreditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
    setCreditValue(value);
    onValuesChange(value, entryValue);
  };

  const handleEntryValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
    setEntryValue(value);
    onValuesChange(creditValue, value);
  };

  return (
    <section
      className={`bg-white shadow-[0px_0px_32px_rgba(0,0,0,0.1)] border flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-8 rounded-[32px] border-[rgba(244,244,244,1)] border-solid max-md:max-w-full max-md:px-5 ${className}`}
    >
      <div className="w-full text-[26px] text-[#464646] font-bold max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch justify-center max-md:max-w-full">
          <div className="flex w-full max-md:max-w-full">
            <h2 className="text-[#464646]">Valor do Crédito e Entrada</h2>
          </div>
          <div className="bg-[rgba(223,223,223,1)] flex min-h-px w-full gap-2.5 mt-4 max-md:max-w-full" />
        </div>
      </div>
      <form className="flex w-full gap-[22px] text-base font-semibold flex-wrap mt-8 max-md:max-w-full">
        <div className="min-w-60 text-[#464646] flex-1 shrink basis-[0%]">
          <label htmlFor="creditValue" className="text-[#464646] block">
            Valor do Crédito:
          </label>
          <div className="bg-[rgba(244,244,244,1)] border flex min-h-[50px] w-full items-center gap-2.5 mt-3 p-4 rounded-[20px] border-[rgba(223,223,223,1)] border-solid">
            <input
              id="creditValue"
              type="number"
              value={creditValue === 0 ? '' : creditValue}
              onChange={handleCreditValueChange}
              placeholder="R$ 10.000,00"
              step="0.01"
              min="0"
              className="self-stretch flex min-w-60 w-full items-center gap-2.5 flex-1 shrink basis-[0%] my-auto bg-transparent text-[#464646] outline-none"
            />
          </div>
        </div>
        <div className="min-w-60 flex-1 shrink basis-[0%]">
          <label htmlFor="entryValue" className="text-[#464646] block">
            Valor da Entrada:
          </label>
          <div className="bg-[rgba(244,244,244,1)] border flex min-h-[50px] w-full items-center gap-2.5 text-[rgba(196,196,196,1)] mt-3 p-4 rounded-[20px] border-[rgba(223,223,223,1)] border-solid">
            <input
              id="entryValue"
              type="number"
              value={entryValue === 0 ? '' : entryValue}
              onChange={handleEntryValueChange}
              placeholder="R$ 1.000,00"
              step="0.01"
              min="0"
              className="self-stretch flex min-w-60 w-full items-center gap-2.5 flex-1 shrink basis-[0%] my-auto bg-transparent text-[rgba(196,196,196,1)] placeholder-[rgba(196,196,196,1)] outline-none"
            />
          </div>
        </div>
      </form>
    </section>
  );
};