export interface TickerConfig {
  symbol: string;
  name: string;
  buPerMt?: number;
  lbsPerMt?: number;
  multiplier?: number;
}

export const tickerMap: Record<string, TickerConfig> = {
  corn: { symbol: 'ZC=F', buPerMt: 39.368, name: 'CBOT Corn' },
  soybean: { symbol: 'ZS=F', buPerMt: 36.7437, name: 'CBOT Soybean' },
  'soybean-oil': { symbol: 'ZL=F', lbsPerMt: 2204.62, name: 'CBOT Soybean Oil' },
  'soybean-meal': { symbol: 'ZM=F', multiplier: 1.1023, name: 'CBOT Soybean Meal' },
  wheat: { symbol: 'ZW=F', buPerMt: 36.7437, name: 'CBOT Wheat' },
  'palm-oil': { symbol: 'FCPO.KL', multiplier: 1, name: 'Bursa Malaysia Palm Oil' },
  sugar: { symbol: 'SB=F', lbsPerMt: 2204.62, name: 'ICE Sugar' },
  'potato-starch': { symbol: 'ZC=F', buPerMt: 39.368, name: 'Starch Benchmark (CBOT Corn)' },
  'tapioca-starch': { symbol: 'ZC=F', buPerMt: 39.368, name: 'Tapioca Benchmark (CBOT Corn)' }
};

export async function fetchHistoricalData(commodityId: string = 'corn', timeframe: string = '6M') {
  const cleanId = (commodityId || 'corn').toLowerCase();
  const config = tickerMap[cleanId] || tickerMap.corn;
  const symbol = config.symbol;

  const rangeMap: Record<string, string> = {
    '1M': '1mo',
    '3M': '3mo',
    '6M': '6mo',
    '1Y': '1y',
    '5Y': '5y',
    'ALL': 'max'
  };
  const yahooRange = rangeMap[timeframe] || '6mo';

  let targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${yahooRange}&interval=1d`;

  let response = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json',
    },
  });

  let json = response.ok ? await response.json() : null;
  let result = json?.chart?.result?.[0];

  if (!result || (result.timestamp || []).length <= 1) {
    response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    });
    if (response.ok) {
      json = await response.json();
      result = json?.chart?.result?.[0];
    }
  }

  if (!result) throw new Error(`Invalid response payload from Yahoo Finance for ${symbol}`);

  const timestamps = result.timestamp || [];
  const quotes = result.indicators?.quote?.[0]?.close || [];

  const mult = config.buPerMt || config.lbsPerMt || config.multiplier || 39.368;

  const priceData = timestamps
    .map((ts: number, idx: number) => {
      const dateStr = new Date(ts * 1000).toISOString().split('T')[0];
      const rawVal = quotes[idx];
      if (rawVal === null || rawVal === undefined || isNaN(rawVal)) return null;

      const usdPerMT = Math.round((rawVal / 100) * mult * 100) / 100;

      return {
        date: dateStr,
        centsPerBushel: Math.round(rawVal * 100) / 100,
        usdPerMT: usdPerMT > 0 ? usdPerMT : Math.round(rawVal * 100) / 100,
      };
    })
    .filter(Boolean);

  if (result.meta?.regularMarketPrice && priceData.length > 0) {
    const regularPrice = result.meta.regularMarketPrice;
    const latestPoint = priceData[priceData.length - 1];
    if (Math.abs(latestPoint.centsPerBushel - regularPrice) > 0.01) {
      const todayStr = new Date().toISOString().split('T')[0];
      const regularUsdMt = Math.round((regularPrice / 100) * mult * 100) / 100;
      priceData.push({
        date: todayStr,
        centsPerBushel: Math.round(regularPrice * 100) / 100,
        usdPerMT: regularUsdMt > 0 ? regularUsdMt : Math.round(regularPrice * 100) / 100,
      });
    }
  }

  return {
    success: true,
    commodity: cleanId,
    symbol: `${symbol} (${config.name})`,
    timeframe,
    range: yahooRange,
    source: 'CME / Yahoo Finance',
    data: priceData,
  };
}
