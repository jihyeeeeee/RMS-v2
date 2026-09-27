export interface CommodityPriceData {
  benchmarkQuote: number;       // Raw exchange price (USD/MT, EUR/MT, MYR/MT, or KRW/MT)
  currency: 'USD' | 'EUR' | 'MYR' | 'KRW';
  exchangeRateToKRW: number;    // e.g., USD: 1369, EUR: 1520, MYR: 325
  landedMultiplier: number;     // Freight + handling markup (strictly > 1.0)
}

export const COMMODITY_CONFIGS: Record<string, CommodityPriceData> = {
  'wheat':          { benchmarkQuote: 265,  currency: 'USD', exchangeRateToKRW: 1369, landedMultiplier: 1.06 },
  'corn':           { benchmarkQuote: 216,  currency: 'USD', exchangeRateToKRW: 1369, landedMultiplier: 1.05 },
  'soybean':        { benchmarkQuote: 495,  currency: 'USD', exchangeRateToKRW: 1369, landedMultiplier: 1.05 },
  'soybean-oil':    { benchmarkQuote: 910,  currency: 'USD', exchangeRateToKRW: 1369, landedMultiplier: 1.04 },
  'palm-oil':       { benchmarkQuote: 3950, currency: 'MYR', exchangeRateToKRW: 325,  landedMultiplier: 1.035 },
  'sugar':          { benchmarkQuote: 510,  currency: 'USD', exchangeRateToKRW: 1369, landedMultiplier: 1.045 },
  'potato-starch':  { benchmarkQuote: 870,  currency: 'EUR', exchangeRateToKRW: 1520, landedMultiplier: 1.07 },
  'tapioca-starch': { benchmarkQuote: 510,  currency: 'USD', exchangeRateToKRW: 1369, landedMultiplier: 1.04 },
};

export function getCalculatedMetrics(commodityKey: string) {
  const config = COMMODITY_CONFIGS[commodityKey] || COMMODITY_CONFIGS['corn'];
  
  // 1. Calculate base quote in KRW
  const baseKRW = Math.round(config.benchmarkQuote * config.exchangeRateToKRW);
  
  // 2. Calculate landed price in KRW (Always base * multiplier)
  const landedKRW = Math.round(baseKRW * config.landedMultiplier);

  return {
    baseQuoteFormatted: `${config.benchmarkQuote.toLocaleString()} ${config.currency} / MT`,
    baseKRW,
    landedKRWFormatted: `₩${landedKRW.toLocaleString()} / MT`,
  };
}
