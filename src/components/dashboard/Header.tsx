import React from 'react';

interface HeaderProps {
  title: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, className = '' }) => {
  return (
    <header
      className={`min-w-60 flex items-center justify-between rounded-[32px] px-8 py-6 ${className}`}
    >
      {/* título à esquerda */}
      <h1 className="text-white text-3xl font-bold">{title}</h1>

      {/* logo à direita (mesma usada na Sidebar) */}
      <img
        src="https://api.builder.io/api/v1/image/assets/fe7eea92ce2f44c0a1ab07023d4ff992/dc227cc13c0b795410c14c0af1d6a4805b20f649?placeholderIfAbsent=true"
        alt="Kontemplados"
        className="h-8 w-auto"
      />
    </header>
  );
};
