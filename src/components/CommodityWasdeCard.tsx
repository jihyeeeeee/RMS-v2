import React, { useState, useEffect } from 'react';
import { WASDE_BASELINES, WasdeRecord } from './WasdeTerminal';

export interface CommodityWasdeCardProps {
  commodityId: string;
  commodityName?: string;
  customBrief?: string;
  className?: string;
}

export const CommodityWasdeCard: React.FC<CommodityWasdeCardProps> = ({
  commodityId,
  commodityName,
  customBrief,
  className = ''
}) => {
  const normalizedId = commodityId?.toLowerCase().trim() || 'wheat';
  const baseline = WASDE_BASELINES[normalizedId] || WASDE_BASELINES.wheat;

  const [data, setData] = useState<WasdeRecord>(baseline);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCommodityWasde = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/usda/${normalizedId}`, {
          cache: 'no-store'
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        const payload = json.data || json;

        if (isMounted && payload) {
          setData({
            commodity: payload.commodity || normalizedId,
            marketYear: payload.marketYear || '2026',
            productionMMT: payload.productionMMT ?? baseline.productionMMT,
            productionKMT: payload.productionKMT ?? payload.production1000MT ?? baseline.productionKMT,
            consumptionMMT: payload.consumptionMMT ?? payload.domesticConsumptionMMT ?? baseline.consumptionMMT,
            consumptionKMT: payload.consumptionKMT ?? payload.domesticConsumption1000MT ?? baseline.consumptionKMT,
            endingStocksMMT: payload.endingStocksMMT ?? baseline.endingStocksMMT,
            stocksToUseRatio: payload.stocksToUseRatio ?? payload.stocksToUseRatioPct ?? baseline.stocksToUseRatio,
            exportsMMT: payload.exportsMMT ?? baseline.exportsMMT,
            exportsKMT: payload.exportsKMT ?? payload.exports1000MT ?? baseline.exportsKMT,
            areaHarvestedMHA: payload.areaHarvestedMHA ?? (payload.areaHarvested1000HA ? Number((payload.areaHarvested1000HA / 1000).toFixed(1)) : baseline.areaHarvestedMHA),
            areaHarvestedKHA: payload.areaHarvestedKHA ?? payload.areaHarvested1000HA ?? baseline.areaHarvestedKHA,
            yieldMTHA: payload.yieldMTHA ?? baseline.yieldMTHA,
            yieldKGHA: payload.yieldKGHA ?? (payload.yieldMTHA ? Math.round(payload.yieldMTHA * 1000) : baseline.yieldKGHA),
            lastUpdated: payload.lastUpdated || json.lastUpdated || baseline.lastUpdated,
            source: payload.source || json.source || baseline.source,
            executiveBrief: payload.executiveBrief || json.executiveBrief || customBrief || ''
          });
        }
      } catch (err) {
        console.warn(`[CommodityWasdeCard] Failed to fetch /api/usda/${normalizedId}:`, err);
        if (isMounted) {
          setData(WASDE_BASELINES[normalizedId] || WASDE_BASELINES.wheat);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCommodityWasde();

    return () => {
      isMounted = false;
    };
  }, [normalizedId, customBrief]);

  const isPotatoStarch = normalizedId === 'potato-starch' || normalizedId === 'potato_starch';

  if (isPotatoStarch) {
    return (
      <div className={`flex flex-col h-full justify-between bg-white p-6 rounded-xl border border-gray-100 shadow-sm pdf-section-card min-h-[280px] break-inside-avoid print:break-inside-avoid ${className || ''}`.trim()}>
        {/* Upper Content Section */}
        <div className="flex-1 space-y-3">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#f3f4f6]">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="material-symbols-outlined text-[18px] text-[#111827] shrink-0">inventory_2</span>
              <h3 className="text-base font-bold text-slate-900 break-keep">
                글로벌 수급 밸런스 - 감자 및 전분 지표
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                Crop Year: <span className="text-slate-800 font-semibold">2026/27</span>
              </span>
            </div>
          </div>

          {/* Dynamic 6-Grid S&D Telemetry Card */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] print:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] wasde-grid gap-3">
            {/* Box 1: 감자 생산량 (Potato Production) */}
            <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
              <span className="text-[10px] text-[#6b7280] block font-sans">감자 생산량 (Potato Production)</span>
              <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block">
                48.2 MMT
              </span>
              <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
                48,200 kMT (EU-27)
              </span>
            </div>

            {/* Box 2: 전분 수출량 (Starch Exports) */}
            <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
              <span className="text-[10px] text-[#6b7280] block font-sans whitespace-normal break-keep">전분 수출량 (Starch Exports)</span>
              <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block">
                1.42 MMT
              </span>
              <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
                1,420 kMT (CN 110813)
              </span>
            </div>

            {/* Box 3: 전분 수입량 (Starch Imports) */}
            <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
              <span className="text-[10px] text-[#6b7280] block font-sans">전분 수입량 (Starch Imports)</span>
              <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block">
                0.98 MMT
              </span>
              <span className="text-[10px] font-mono text-[#059669] font-medium block mt-0.5">
                수지 균형 안정적
              </span>
            </div>

            {/* Box 4: 재배 면적 (Area Harvested) */}
            <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
              <span className="text-[10px] text-[#6b7280] block font-sans">재배 면적 (Area Harvested)</span>
              <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block">
                1.28 M HA
              </span>
              <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
                1,280 kHA (EU-27)
              </span>
            </div>

            {/* Box 5: 감자 단수 (Potato Yield) */}
            <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
              <span className="text-[10px] text-[#6b7280] block font-sans whitespace-normal break-keep">감자 단수 (Potato Yield)</span>
              <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block">
                37.64 MT/HA
              </span>
              <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
                37,640 kg/HA (Eurostat)
              </span>
            </div>

            {/* Box 6: JRC 예측 단수 (JRC Yield Forecast) */}
            <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
              <span className="text-[10px] text-[#6b7280] block font-sans">JRC 예측 단수 (JRC Forecast)</span>
              <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block">
                36.85 MT/HA
              </span>
              <span className="text-[10px] font-mono text-red-500 block mt-0.5">
                편차: -2.1% (평년비)
              </span>
            </div>
          </div>

          <p className="text-xs text-[#4b5563] bg-[#f9fafb] p-2.5 rounded border border-[#e5e7eb] leading-relaxed">
            서유럽 주산지(독일, 네덜란드, 프랑스)의 여름철 수분 결핍으로 평년 대비 예측 단수가 -2.1% 소폭 감소하였으나, 전체적인 재배 면적 증가로 전분 원료용 감자 총 공급 물량은 전년 대비 견조한 수준을 유지하고 있습니다.
          </p>
        </div>

        {/* Footer Source */}
        <div className="mt-auto pt-4 flex justify-end text-xs text-gray-400">
          <span>
            출처: JRC MARS · Eurostat Crop Production · Eurostat Comext ·{' '}
            <a
              href="https://ec.europa.eu/eurostat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium inline-flex items-center gap-0.5"
            >
              Eurostat ↗
            </a>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full justify-between bg-white p-6 rounded-xl border border-gray-100 shadow-sm pdf-section-card min-h-[280px] break-inside-avoid print:break-inside-avoid ${className || ''}`.trim()}>
      {/* Upper Content Section */}
      <div className="flex-1 space-y-3">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f3f4f6]">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="material-symbols-outlined text-[18px] text-[#111827] shrink-0">inventory_2</span>
            <h3 className="text-base font-bold text-slate-900 break-keep">
              글로벌 수급 밸런스
              {commodityName ? ` - ${commodityName}` : ''}
            </h3>
            {isLoading && (
              <span className="relative flex h-2 w-2 ml-1 shrink-0" title="동기화 중">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F46E5]"></span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Market Year: <span className="text-slate-800 font-semibold">{data.marketYear || '2026'}</span>
            </span>
          </div>
        </div>

        {/* Dynamic 6-Grid S&D Telemetry Card */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] print:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] wasde-grid gap-3">
          {/* Box 1: 총생산 (Production) */}
          <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
            <span className="text-[10px] text-[#6b7280] block font-sans">총생산 (Production)</span>
            <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block" id="wasde-prod">
              {data.productionMMT.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MMT
            </span>
            <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
              {data.productionKMT.toLocaleString('en-US')} kMT
            </span>
          </div>

          {/* Box 2: 총소비 (Consumption) */}
          <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
            <span className="text-[10px] text-[#6b7280] block font-sans whitespace-normal break-keep">Domestic Consumption (총소비)</span>
            <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block" id="wasde-cons">
              {data.consumptionMMT.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MMT
            </span>
            <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
              {data.consumptionKMT.toLocaleString('en-US')} kMT
            </span>
          </div>

          {/* Box 3: 기말재고 (Ending Stocks) */}
          <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
            <span className="text-[10px] text-[#6b7280] block font-sans">기말재고 (Ending Stocks)</span>
            <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block" id="wasde-stocks">
              {data.endingStocksMMT.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MMT
            </span>
            <span className="text-[10px] font-mono text-[#059669] font-medium block mt-0.5" id="wasde-stu">
              재고율 {data.stocksToUseRatio.toFixed(1)}% (S/U)
            </span>
          </div>

          {/* Box 4: 총수출량 (Exports) */}
          <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
            <span className="text-[10px] text-[#6b7280] block font-sans">총수출량 (Exports)</span>
            <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block" id="wasde-exports">
              {data.exportsMMT.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MMT
            </span>
            <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
              {data.exportsKMT.toLocaleString('en-US')} kMT
            </span>
          </div>

          {/* Box 5: 수확면적 (Area Harvested) */}
          <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
            <span className="text-[10px] text-[#6b7280] block font-sans whitespace-normal break-keep">Area Harvested (수확 면적)</span>
            <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block" id="wasde-area">
              {data.areaHarvestedMHA.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M HA
            </span>
            <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
              {data.areaHarvestedKHA.toLocaleString('en-US')} kHA
            </span>
          </div>

          {/* Box 6: 단수/수확량 (Yield) */}
          <div className="p-2.5 bg-[#f9fafb] rounded border border-[#e5e7eb]">
            <span className="text-[10px] text-[#6b7280] block font-sans">단수/수확량 (Yield)</span>
            <span className="font-mono text-sm font-bold text-[#111827] mt-0.5 block" id="wasde-yield">
              {data.yieldMTHA.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT/HA
            </span>
            <span className="text-[10px] font-mono text-[#6b7280] block mt-0.5">
              {data.yieldKGHA.toLocaleString('en-US')} kg/HA
            </span>
          </div>
        </div>

        {/* Executive Brief */}
        {(data.executiveBrief || customBrief) && (
          <p className="text-xs text-[#4b5563] bg-[#f9fafb] p-2.5 rounded border border-[#e5e7eb] leading-relaxed">
            {data.executiveBrief || customBrief}
          </p>
        )}
      </div>

      {/* Footer Source */}
      <div className="mt-auto pt-4 flex justify-end text-xs text-gray-400">
        <span>
          출처: {data.source || 'USDA FAS PSD'} ·{' '}
          <a
            href="https://apps.fas.usda.gov/psdonline/app/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium inline-flex items-center gap-0.5"
          >
            USDA PSD Online ↗
          </a>
        </span>
      </div>
    </div>
  );
};

export default CommodityWasdeCard;
