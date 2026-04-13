export interface CurrencyInfo {
  code: string;       // Сокращение валюты, например 'RUB'
  name: string;       // Название страны, например 'Россия'
  flagName: string;   // Имя файла флага (без расширения), например 'Russia'
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'RUB', name: 'Россия', flagName: 'Russia' },
  { code: 'USD', name: 'США', flagName: 'United-States' },
  { code: 'EUR', name: 'Евросоюз', flagName: 'European-Union' },
  { code: 'GBP', name: 'Великобритания', flagName: 'United-Kingdom' },
  { code: 'CNY', name: 'Китай', flagName: 'China' },
  { code: 'JPY', name: 'Япония', flagName: 'Japan' },
  { code: 'TRY', name: 'Турция', flagName: 'Turkey' },
  { code: 'KZT', name: 'Казахстан', flagName: 'Kazakhstan' },
  { code: 'BYN', name: 'Беларусь', flagName: 'Belarus' },
  { code: 'GEL', name: 'Грузия', flagName: 'Georgia' },
  { code: 'AMD', name: 'Армения', flagName: 'Armenia' },
  { code: 'AED', name: 'ОАЭ', flagName: 'United-Arab-Emirates' },
];
