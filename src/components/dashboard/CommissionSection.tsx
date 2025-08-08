import React, { useState, useEffect } from 'react';

interface CommissionSectionProps {
  onSubmit: (commission: number) => void;
  className?: string;
}

export const CommissionSection: React.FC<CommissionSectionProps> = ({ 
  onSubmit, 
  className = '' 
}) => {
  const [commission, setCommission] = useState<number>(0);
  const [isConfirmed, setIsConfirmed] = useState(true);

  useEffect(() => {
    setCommission(0);
    setIsConfirmed(true);
  }, []);

  const handleCommissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
    setCommission(value);
  };

  const handleConfirmToggle = () => {
    setIsConfirmed(!isConfirmed);
  };

  const handleSubmit = () => {
    if (isConfirmed) {
      onSubmit(commission);
    }
  };

  return (
    <section
      className={`border flex w-full items-stretch gap-[40px_62px] flex-wrap mt-[22px] p-8 rounded-[32px] border-[rgba(223,223,223,1)] border-solid max-md:max-w-full max-md:px-5 ${className}`}
    >
      <div className="flex min-w-60 items-stretch gap-3 text-[#464646] h-full">
        <label htmlFor="commission" className="text-[#464646] text-base font-semibold my-auto">
          Comissão sobre a venda:
        </label>
        <div className="bg-[rgba(244,244,244,1)] border flex min-h-[50px] items-center gap-2.5 text-sm whitespace-nowrap h-full p-4 rounded-[20px] border-[rgba(223,223,223,1)] border-solid">
          <div className="self-stretch flex items-center gap-8 my-auto">
            <input
              id="commission"
              type="number"
              value={commission === 0 ? '' : commission}
              onChange={handleCommissionChange}
              placeholder="1,5"
              step="0.1"
              min="0"
              max="100"
              className="text-[#464646] font-semibold self-stretch my-auto bg-transparent outline-none w-8"
            />
            <span className="text-[#464646] text-right font-black self-stretch my-auto">
              %
            </span>
          </div>
        </div>
      </div>
      <div className="flex min-w-60 items-center gap-3 flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
        <button
          onClick={handleConfirmToggle}
          className="self-stretch flex min-h-[18px] items-center gap-3.5 w-[18px] my-auto"
        >
          <div className={`justify-center items-center aspect-[1/1] self-stretch flex min-h-[18px] w-[18px] gap-2.5 h-[18px] my-auto rounded-md ${
            isConfirmed ? 'bg-[#E8C547]' : 'bg-[rgba(223,223,223,1)]'
          }`}>
            {isConfirmed && (
              <img
                src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/419085a85146790f28bc67fb3486d70b70f501a9?placeholderIfAbsent=true"
                alt="Checkmark"
                className="aspect-[11/8] object-contain w-[11px] fill-[#1C1C1C] self-stretch my-auto"
              />
            )}
          </div>
        </button>
        <p className="text-[#464646] text-lg font-semibold self-stretch my-auto max-md:max-w-full">
          Certifique-se que todos os dados e valores estão corretos.
        </p>
        <button
          onClick={handleSubmit}
          disabled={!isConfirmed}
          className={`justify-center items-center self-stretch flex min-w-60 gap-2.5 text-base text-[#464646] font-black my-auto px-8 py-4 rounded-[20px] max-md:px-5 transition-opacity ${
            isConfirmed 
              ? 'bg-[#E8C547] hover:bg-[#E8C547]/90' 
              : 'bg-[#E8C547]/50 cursor-not-allowed'
          }`}
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/19ec7de5452e79270045648363db0a8572180b1e?placeholderIfAbsent=true"
            alt="Submit icon"
            className="aspect-[1/1] object-contain w-[18px] fill-[#464646] self-stretch shrink-0 my-auto"
          />
          <span className="text-[#464646] self-stretch my-auto">
            Cadastrar Carta de Crédito
          </span>
        </button>
      </div>
    </section>
  );
};