
import React, { useState } from 'react';

interface AdministratorSelectorProps {
  onAdministratorSelect: (administrator: string) => void;
  className?: string;
}

export const AdministratorSelector: React.FC<AdministratorSelectorProps> = ({ 
  onAdministratorSelect, 
  className = '' 
}) => {
  const [isSelected, setIsSelected] = useState(true);

  const handleToggle = () => {
    setIsSelected(!isSelected);
    onAdministratorSelect(isSelected ? '' : 'selected');
  };

  return (
    <section
      className={`bg-white shadow-[0px_0px_32px_rgba(0,0,0,0.1)] border flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-8 rounded-[32px] border-[rgba(244,244,244,1)] border-solid max-md:max-w-full max-md:px-5 ${className}`}
    >
      <div className="w-full max-md:max-w-full">
        <div className="flex w-full flex-col items-stretch text-[26px] text-[#464646] font-bold whitespace-nowrap justify-center max-md:max-w-full">
          <div className="flex w-full max-md:max-w-full">
            <h2 className="text-[#464646]">Administradora</h2>
          </div>
          <div className="bg-[rgba(223,223,223,1)] flex min-h-px w-full gap-2.5 mt-4 max-md:max-w-full" />
        </div>
        <div className="flex w-full items-center mt-8 max-md:max-w-full">
          <div className="self-stretch flex items-center gap-[22px] my-auto">
            <button
              onClick={handleToggle}
              className="self-stretch flex min-h-[18px] items-center gap-3.5 w-[18px] my-auto"
            >
              <div className="bg-[rgba(223,223,223,1)] self-stretch flex min-h-[18px] w-[18px] items-center gap-2.5 justify-center h-[18px] my-auto rounded-md">
                {isSelected && (
                  <img
                    src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/7abf0c548db3e10d3881f373a4edc2dc38812d6f?placeholderIfAbsent=true"
                    alt="Checkmark"
                    className="aspect-[1.38] object-contain w-[11px] self-stretch my-auto"
                  />
                )}
              </div>
            </button>
            <img
              src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/9fa1c699d459dfd5da6af77300dd9e5937a59ab0?placeholderIfAbsent=true"
              alt="Administrator logo"
              className="aspect-[2.4] object-contain w-24 self-stretch shrink-0 my-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

