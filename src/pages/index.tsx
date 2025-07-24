import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export default function HomePage() {
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
                
                
              </main>
            </div>
          </div>
        </div>
  );
}