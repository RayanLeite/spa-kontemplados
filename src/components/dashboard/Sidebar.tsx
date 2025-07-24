
import React from 'react';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  return (
    <aside
      className={`items-stretch flex min-w-60 flex-col justify-center w-[274px] p-8 rounded-[22px] border-0 border-solid border-[#464646] max-md:px-5 ${className}`}
    >
      <div className="max-w-full w-[210px] flex-1">
        <div className="w-full">
          <div className="flex min-h-[31px] min-w-[200px] w-full max-w-[267px] items-stretch gap-2.5">
            <img
              src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/dc227cc13c0b795410c14c0af1d6a4805b20f649?placeholderIfAbsent=true"
              alt="Company Logo"
              className="aspect-[6.76] object-contain w-full flex-1 shrink basis-[0%]"
            />
          </div>
          <nav className="w-[172px] max-w-full mt-8">
            <div className="bg-[rgba(255,255,255,0)] flex w-full items-stretch gap-4 p-3 rounded-xl">
              <div className="flex items-center justify-center w-4 my-auto">
                <img
                  src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/4c4eca42393d27c1d3806538afe6ad1e1335c3cd?placeholderIfAbsent=true"
                  alt="Dashboard icon"
                  className="aspect-[1] object-contain w-4 self-stretch my-auto"
                />
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white font-bold whitespace-nowrap h-full">
                <div className="self-stretch my-auto">Dashboard</div>
              </div>
            </div>
            <div className="flex items-stretch gap-4 mt-3 p-3 rounded-xl">
              <div className="flex items-center justify-center my-auto">
                <img
                  src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/1436503f58e717eb1263e201d3513886c51ea20b?placeholderIfAbsent=true"
                  alt="Register letter icon"
                  className="aspect-[1] object-contain w-4 fill-[#E8C547] self-stretch my-auto"
                />
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white font-bold h-full">
                <div className="self-stretch my-auto">Cadastrar Carta</div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] flex w-full items-stretch gap-4 mt-3 p-3 rounded-xl">
              <div className="flex min-h-4 items-center justify-center w-4 my-auto">
                <img
                  src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/fc660a0440c62906e914176573966a27f81d26b1?placeholderIfAbsent=true"
                  alt="Issued letters icon"
                  className="aspect-[1] object-contain w-4 self-stretch my-auto"
                />
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white font-bold h-full">
                <div className="self-stretch my-auto">Cartas Emitidas</div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] flex w-full items-center gap-4 mt-3 p-3 rounded-xl">
              <div className="self-stretch flex items-center justify-center w-4 my-auto">
                <img
                  src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/7a6f6181128cc21830a7146fb2228bf51eeef1f5?placeholderIfAbsent=true"
                  alt="Notifications icon"
                  className="aspect-[1] object-contain w-4 self-stretch my-auto"
                />
              </div>
              <div className="self-stretch flex items-center gap-2.5 text-sm text-white font-bold whitespace-nowrap h-full">
                <div className="self-stretch my-auto">Notificações</div>
              </div>
              <div className="justify-center items-center self-stretch flex gap-2.5 text-[10px] text-[#464646] font-black whitespace-nowrap text-center bg-[#E8C547] my-auto px-1 py-0.5 rounded-md">
                <div className="text-[#464646] self-stretch my-auto">3</div>
              </div>
            </div>
          </nav>
        </div>
        <div className="w-full mt-[621px] max-md:mt-10">
          <div className="bg-[rgba(255,255,255,0)] flex w-full items-stretch gap-4 p-3 rounded-xl">
            <div className="flex items-center justify-center w-4 my-auto">
              <img
                src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/93c299006309980923d03c3575a34c07f357691d?placeholderIfAbsent=true"
                alt="Settings icon"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
              />
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white font-bold whitespace-nowrap h-full">
              <div className="self-stretch my-auto">Configurações</div>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0)] flex w-full items-stretch gap-4 mt-3 p-3 rounded-xl">
            <div className="flex items-center justify-center w-4 my-auto">
              <img
                src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/9e2c2c04cfe98575341f05c6e26dccb2073f205c?placeholderIfAbsent=true"
                alt="Logout icon"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
              />
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white font-bold h-full">
              <div className="self-stretch my-auto">Sair do painel</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

