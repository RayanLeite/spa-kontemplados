
import React from 'react';

interface HeaderProps {
  title: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, className = '' }) => {
  return (
    <header
      className={`items-center shadow-[0_0_32px_0_rgba(0,0,0,0.10)] flex w-full flex-wrap px-8 py-[22px] rounded-[32px] max-md:max-w-full max-md:px-5 ${className}`}
    >
      <h1 className="text-white text-[32px] font-bold self-stretch flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
        {title}
      </h1>
      <div className="self-stretch flex min-w-60 items-stretch gap-[22px] my-auto">
        <div className="justify-center items-center border flex gap-[22px] h-[52px] w-[52px] px-3 rounded-[22px] border-solid border-[#464646]">
          <div className="self-stretch flex w-4 items-center gap-1 justify-center my-auto">
            <img
              src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/3060d7ed5d264cdb7750a2a0876c374fdb9838d1?placeholderIfAbsent=true"
              alt="Notifications"
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
            />
          </div>
        </div>
        <div className="items-center border flex gap-[22px] my-auto pr-[22px] rounded-[22px] border-solid border-[#464646]">
          <div className="self-stretch flex items-center gap-3.5 my-auto">
            <div className="self-stretch flex items-center gap-2.5 w-[52px] my-auto">
              <img
                src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/22b94f3a56d3b328b8ac9c9561e3ca44d2d5c89d?placeholderIfAbsent=true"
                alt="User avatar"
                className="aspect-[1/1] object-contain w-[52px] self-stretch min-h-[52px] my-auto"
              />
            </div>
            <div className="self-stretch font-bold my-auto">
              <div className="text-[#E8C547] text-sm">Sarah Abrantes</div>
              <div className="text-white text-[10px] mt-2">Atendimento Comercial</div>
            </div>
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/95b48b84a4dd1b3f4e56483b6326de9f02a456fc?placeholderIfAbsent=true"
            alt="Dropdown arrow"
            className="aspect-[1.67] object-contain w-2.5 self-stretch shrink-0 my-auto"
          />
        </div>
      </div>
    </header>
  );
};

