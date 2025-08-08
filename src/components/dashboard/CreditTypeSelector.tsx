import React, { useState } from 'react';

interface CreditTypeSelectorProps {
  onTypeSelect: (type: string) => void;
  className?: string;
}

export const CreditTypeSelector: React.FC<CreditTypeSelectorProps> = ({ 
  onTypeSelect, 
  className = '' 
}) => {
  const [selectedType, setSelectedType] = useState<string>('imovel');

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onTypeSelect(type);
  };

  return (
    <section
      className={`bg-white shadow-[0px_0px_32px_rgba(0,0,0,0.1)] border flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-8 rounded-[32px] border-[rgba(244,244,244,1)] border-solid max-md:max-w-full max-md:px-5 ${className}`}
    >
      <div className="w-full max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch text-[26px] text-[#464646] font-bold justify-center max-md:max-w-full">
          <div className="flex w-full max-md:max-w-full">
            <h2 className="text-[#464646]">Selecione o tipo de crédito</h2>
          </div>
          <div className="bg-[rgba(223,223,223,1)] flex min-h-px w-full gap-2.5 mt-4 max-md:max-w-full" />
        </div>
        <div className="flex w-full items-center gap-[22px] flex-wrap mt-8 max-md:max-w-full">
          <button
            onClick={() => handleTypeSelect('imovel')}
            className={`justify-center items-center border self-stretch flex min-w-60 min-h-[50px] gap-3 flex-1 shrink basis-[0%] my-auto px-[22px] py-[17px] rounded-[22px] border-solid transition-colors max-md:px-5 ${
              selectedType === 'imovel'
                ? 'bg-[#E8C547] border-[#E8C547]'
                : 'bg-white border-[#E8C547] hover:bg-[#E8C547]/10'
            }`}
          >
            <div className="self-stretch flex min-h-4 items-stretch gap-2.5 w-4 my-auto">
              <img
                src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/6864fc147303c24a910cb0aa0ef30037641d32e4?placeholderIfAbsent=true"
                alt="Property icon"
                className="aspect-[1/1] object-contain w-4 fill-[#464646]"
              />
            </div>
            <span className="text-[#464646] text-lg font-bold self-stretch my-auto">
              Imóvel
            </span>
          </button>
          <button
            onClick={() => handleTypeSelect('veiculo')}
            className={`justify-center items-center border self-stretch flex min-w-60 min-h-[50px] gap-3 flex-1 shrink basis-[0%] my-auto px-[22px] py-4 rounded-[22px] border-solid transition-colors max-md:px-5 ${
              selectedType === 'veiculo'
                ? 'bg-[#E8C547] border-[#E8C547]'
                : 'bg-white border-[#E8C547] hover:bg-[#E8C547]/10'
            }`}
          >
            <div className="self-stretch flex min-h-[18px] items-stretch gap-2.5 w-[18px] my-auto">
              <img
                src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/074eea69dfe99bf3c6a17cc420e623d8b2a8f6e0?placeholderIfAbsent=true"
                alt="Vehicle icon"
                className="aspect-[1] object-contain w-[18px]"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(8%) saturate(1058%) hue-rotate(314deg) brightness(91%) contrast(86%)'
                }}
              />
            </div>
            <span className="text-[#464646] text-lg font-bold self-stretch my-auto">
              Veículo
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};