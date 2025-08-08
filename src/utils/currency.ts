// utils/currency.ts

/**
 * Formata um número para o padrão de moeda brasileira
 * @param value - Valor numérico
 * @returns String formatada como "R\$ 10.000,00"
 */
export const formatCurrency = (value: number): string => {
    if (value === 0) return '';
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  /**
   * Remove formatação de moeda e converte para número
   * @param value - String formatada como "R\$ 10.000,00"
   * @returns Número limpo
   */
  export const parseCurrency = (value: string): number => {
    if (!value || value.trim() === '') return 0;
    
    const cleanValue = value
      .replace(/[^\d,.-]/g, '') 
      .replace(/\./g, '') 
      .replace(',', '.'); 
    
    return parseFloat(cleanValue) || 0;
  };
  
  /**
   * Formata valor durante a digitação
   * @param value - Valor sendo digitado
   * @returns Valor formatado para exibição
   */
  export const formatCurrencyInput = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    if (!numbers) return '';
    
    const amount = parseInt(numbers, 10) / 100;
    
    return formatCurrency(amount);
  };