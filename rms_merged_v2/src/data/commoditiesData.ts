import { Commodity, MacroDriver, MarketIssue } from '../types';

export const COMMODITIES: Commodity[] = [
  {
    id: 'wheat',
    path: 'commodity-wheat',
    nameKo: '소맥',
    nameEn: 'Wheat',
    gradeEn: 'CBOT SRW / HRW Benchmark',
    description: '제분용 미국산 HRW 및 호주/캐나다산 밀 원맥',
    category: 'grain',
    categoryNameKo: '곡물류 (Grains)',
    price: 574.25,
    unit: 'USd/bu',
    priceKrwEstimated: 278.4,
    landedKrwKg: 392,
    changeWoW: 2.14,
    changeMoM: -1.80,
    changeYoY: -8.45,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (Estimated CIF Busan Landed Duty-Paid)',
    ticker: 'CBOT: W / HRW',
    exchange: 'CBOT',
    sparkline: [562, 565, 561, 568, 570, 574.25],
    chartData: [
      { date: '2023년 11월', cashPrice: 620.5, ma50: 640.2, landedBaseline: 420 },
      { date: '2024년 1월', cashPrice: 595.0, ma50: 615.4, landedBaseline: 405 },
      { date: '2024년 3월', cashPrice: 560.2, ma50: 585.0, landedBaseline: 385 },
      { date: '2024년 5월', cashPrice: 640.0, ma50: 610.8, landedBaseline: 435 },
      { date: '2024년 7월', cashPrice: 570.5, ma50: 595.2, landedBaseline: 390 },
      { date: '2024년 9월', cashPrice: 562.0, ma50: 578.4, landedBaseline: 382 },
      { date: '2024년 11월 (현재)', cashPrice: 574.25, ma50: 582.4, landedBaseline: 392 }
    ],
    aiConfidence: 88,
    recommendedCoverage: '60~75일 선도 구매',
    aiSynthesis:
      '미국산 HRW 소맥은 560~590 USd/bu 범위의 단기 횡보세를 유지하고 있습니다. 미국 남부 평원지대의 지속적인 토양 수분 부족과 2025년 1분기 흑해 수출 물량 감소가 상승 요인으로 작용하고 있습니다. 반면 러시아의 풍부한 이월 재고와 이집트 GASC 입찰 수요 둔화가 상단을 제한하고 있습니다. 국내 식품 제조 구매 데스크에서는 현재 570~575 USd 밴드 부근에서 1분기 물리적 수입 물량의 조달 약정을 체결할 것을 권고합니다.',
    bullishFactors: ['생산량 부족 전망 (+15~25 USd)', '남부평원 가뭄 심화', '해상 운임 강세'],
    bearishFactors: ['러시아 대규모 재고 (-10~18 USd)', '글로벌 입찰 둔화', '호주 수확물량 유입'],
    monitoringItems: ['러시아 수출 쿼터 발표 (7~14일 영향)', '환율 변동성 확대', '북반구 월동 전 강우량'],
    technicalSignals: {
      headline: '단기 상승 횡보 (Bullish Consolidation)',
      ma20: 568.5,
      ma20Note: '단기 지지선 상회',
      ma50: 582.4,
      ma50Note: '중기 저항 근접',
      ma200: 615.1,
      ma200Note: '장기 데드크로스',
      rsi: 54.2,
      rsiStatus: 'Neutral (중립)',
      macd: 2.15,
      macdStatus: '상향 교차 (Bullish)',
      bollinger: 'Mid-Band Trading',
      bollingerStatus: '중심선 수렴 구간',
      r2: 610.0,
      r1: 590.0,
      pp: 572.0,
      s1: 555.0,
      s2: 538.0,
      directive: '555~560 USd 밴드 하단 터치 시 1분기 잔여 필요물량 추가 매수 유효.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 55,
        drivers: '박스권 횡보 지속 (570~590 USd/bu), 환율 1,385원, 해상운임 $42.50/MT',
        landedKrw: 392,
        diffPct: 0.0,
        recommendation: '표준 60일 선도 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 30,
        drivers: '러시아 수출 쿼터 강화 + 미 평원 한파 동해(Freeze) + 환율 1,420원 급등',
        landedKrw: 428,
        diffPct: 9.2,
        diffKrw: 36,
        recommendation: '선도 커버리지 90일로 긴급 확대 (Extend forward coverage to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '호주 대풍작 출하 + 홍해 해운 정상화 + 환율 1,340원 하향 안정',
        landedKrw: 365,
        diffPct: -6.9,
        diffKrw: -27,
        recommendation: '선도 버퍼 30일 축소 및 스팟 현물 분할 매수 레버리지'
      },
      maxRiskUp: '+36원/kg (연간 약 +54억원 영향)',
      maxOpportunityDown: '-27원/kg (연간 약 -40.5억원 절감)',
      optimalHedge: '65~70% 선도 조달 (복합 리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '796.8', unit: 'M MT', diff: '+0.6% YoY', outlook: '안정 곡선 (Stable Curve)' },
      consumption: { value: '802.4', unit: 'M MT', diff: '+0.9% YoY', outlook: '-5.6 M MT 결손 Deficit' },
      endingStocks: { value: '257.7', unit: 'M MT', diff: '-2.1% YoY', outlook: '32.1% (9년래 최저)' },
      trade: { value: '214.5', unit: 'M MT', diff: '-1.4% YoY', outlook: '76% of Supply' }
    },
    wasdeLedger: [
      { item: '이월 재고 (Beginning Stocks)', final2324: '271.2', estOct: '267.3', reportNov: '265.8', momRevision: '-1.5 MT', yoyChange: '-2.0%' },
      { item: '총 생산량 (Production)', final2324: '790.6', estOct: '794.1', reportNov: '796.8', momRevision: '+2.7 MT', yoyChange: '+0.8%' },
      { item: '총 수입/교역량 (Total Imports / Trade)', final2324: '220.8', estOct: '215.2', reportNov: '214.5', momRevision: '-0.7 MT', yoyChange: '-2.9%' },
      { item: '식품 및 공업용 내수 (Domestic Food & Industrial)', final2324: '642.1', estOct: '648.5', reportNov: '649.2', momRevision: '+0.7 MT', yoyChange: '+1.1%' },
      { item: '사료용 소비 (Feed & Residual Use)', final2324: '153.8', estOct: '154.2', reportNov: '153.2', momRevision: '-1.0 MT', yoyChange: '-0.4%' },
      { item: '총 수출량 (Total Exports)', final2324: '220.8', estOct: '215.2', reportNov: '214.5', momRevision: '-0.7 MT', yoyChange: '-2.9%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '265.8', estOct: '257.7', reportNov: '257.7', momRevision: '0.0 MT', yoyChange: '-3.0%', isHighlighted: true },
      { item: '재고율 (Stock-to-Use Ratio)', final2324: '33.4%', estOct: '32.1%', reportNov: '32.1%', momRevision: '0.0%p', yoyChange: '-1.3%p', isHighlighted: true }
    ],
    originsLedger: [
      {
        region: '미국 (HRW/SRW)',
        production: '53.7M MT (+9.2%)',
        exports: '수출 22.5M MT',
        endingStocks: '기말재고 22.1M MT',
        riskAssessment: '저위험 - 안정적인 미 태평양 연안(PNW) 물류',
        status: '정상 선적',
        statusColor: 'green',
        sourceName: 'USDA FAS',
        sourceUrl: 'https://www.fas.usda.gov/topics/grain-and-feed'
      },
      {
        region: '호주 (APW/AHW)',
        production: '31.0M MT (+5.2%)',
        exports: '수출 23.5M MT',
        endingStocks: '기말재고 4.8M MT',
        riskAssessment: '저위험 - 면용/제과용 호주 적정 수급 및 항만 물류 원활',
        status: '정상 선적',
        statusColor: 'green',
        sourceName: 'ABARES',
        sourceUrl: 'https://www.agriculture.gov.au/abares/research-topics/agricultural-outlooks/crop-report'
      },
      {
        region: '유럽연합 (프랑스/독일)',
        production: '122.6M MT (-9.1%)',
        exports: '수출 30.0M MT',
        endingStocks: '기말재고 10.8M MT',
        riskAssessment: '중위험 - 수확기 우천 / 품질 편차',
        status: '모니터링',
        statusColor: 'yellow',
        sourceName: 'EC AGRI',
        sourceUrl: 'https://agriculture.ec.europa.eu/farming/crop-productions-and-yields-mars_en'
      },
      {
        region: '러시아 (12.5% 제분용)',
        production: '81.5M MT (-11.0%)',
        exports: '수출 48.0M MT',
        endingStocks: '기말재고 11.2M MT',
        riskAssessment: '고위험 - 수출 쿼터 제한 및 물류 불확실성',
        status: '주의 요망',
        statusColor: 'red',
        sourceName: 'IGC Benchmark',
        sourceUrl: 'https://www.igc.int/en/gmr/gmrsummary.aspx'
      }
    ],
    landedCompetitiveness: [
      { origin: '미국 PNW HRW', grade: 'US PNW Hard Red Winter No.2, 단백질 11.5%', regionCategory: 'na', regionTag: '북미', fob: '$264.00/MT', freight: '$42.50/MT', tariff: '0% (한미FTA/TRQ)', cfr: '$306.50/MT', landedKrw: '₩425.6 / kg', assessment: '최적 가용성 / 벤치마크 기준' },
      { origin: '캐나다 CWRS 13.5%', grade: 'Canada Western Red Spring No.1, 고단백', regionCategory: 'na', regionTag: '북미', fob: '$298.00/MT', freight: '$44.00/MT', tariff: '0% (TRQ)', cfr: '$342.00/MT', landedKrw: '₩474.9 / kg', assessment: '고단백 프리미엄 / 제빵 특화' },
      { origin: '호주 APW', grade: 'Australian Premium White, 다목적 제분', regionCategory: 'oc', regionTag: '대양주', fob: '$272.00/MT', freight: '$31.00/MT', tariff: '0% (한호FTA/TRQ)', cfr: '$303.00/MT', landedKrw: '₩420.7 / kg', assessment: '운임 우위 / 조달 매력도 높음', highlightBadge: '운임 우위' },
      { origin: '프랑스 Milling Wheat', grade: '유럽 연질 소맥, Rouen FOB', regionCategory: 'eu', regionTag: '유럽/흑해', fob: '$248.00/MT', freight: '$56.00/MT', tariff: '1.8%', cfr: '$309.47/MT', landedKrw: '₩429.7 / kg', assessment: '단거리 운임 불이익 / 유럽 내수 강세' },
      { origin: '러시아 12.5%', grade: 'Novorossiysk FOB 흑해산 고단백', regionCategory: 'eu', regionTag: '유럽/흑해', fob: '$232.00/MT', freight: '$59.50/MT', tariff: '1.8%', cfr: '$296.86/MT', landedKrw: '₩412.2 / kg', assessment: '최저가 우위 / 지정학·금융 제재 주의', highlightBadge: '최저가' }
    ],
    timelineEvents: [
      { date: '2024년 11월 14일', region: '글로벌', source: '미국 농무부 FAS', title: 'USDA 11월 WASDE 수급보고서: 글로벌 기말 재고 2.1M MT 하향 조정', url: 'https://www.usda.gov/oce/commodity/wasde', summary: 'usda.gov/oce/commodity/wasde', importance: 'High', direction: 'Bullish' },
      { date: '2024년 11월 18일', region: '유럽연합', source: 'EC MARS 보고서', title: 'EU MARS 작황 모니터링: 프랑스 연질소맥 생산 전망 14% 하향', url: 'https://ec.europa.eu/jrc/en/mars', summary: 'ec.europa.eu/jrc/mars', importance: 'Medium', direction: 'Bullish' },
      { date: '2024년 11월 22일', region: '러시아', source: '러 농무부 / Interfax', title: '러시아 농무부, 2025년 상반기 곡물 수출 쿼터 1,100만 톤 상한 제안', url: 'https://www.reuters.com/markets/commodities/black-sea-grain', summary: 'interfax.com/commodities', importance: 'High', direction: 'Bullish' },
      { date: '2024년 11월 27일', region: '호주', source: 'ABARES 캔버라', title: 'ABARES, 2024/25 생산량 전망 상향 조정 (+240만 톤 잉여 공급)', url: 'https://www.agriculture.gov.au/abares', summary: 'agriculture.gov.au/abares', importance: 'Medium', direction: 'Bearish' },
      { date: '2024년 12월 02일', region: '미 남부 평원', source: 'NOAA / CPC', title: '북극 한파 주의보 및 캔자스 동계소맥 벨트 냉해 동결 리스크', url: 'https://www.cpc.ncep.noaa.gov/', summary: 'noaa.gov/cpc', importance: 'Low', direction: 'Neutral' }
    ]
  },
  {
    id: 'corn',
    path: 'commodity-corn',
    nameKo: '옥수수',
    nameEn: 'Corn',
    gradeEn: 'CBOT: ZC Benchmark',
    description: '제분 및 전분당 가공용 미국/남미산 옥수수',
    category: 'grain',
    categoryNameKo: '곡물류 (Grains)',
    price: 432.50,
    unit: 'USd/bu',
    priceKrwEstimated: 296.0,
    landedKrwKg: 296,
    changeWoW: -0.85,
    changeMoM: 3.20,
    changeYoY: -10.03,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (Estimated CIF Busan Landed Duty-Paid)',
    ticker: 'CBOT: C / ZC',
    exchange: 'CBOT',
    sparkline: [435.5, 437.0, 434.5, 436.0, 433.0, 431.5],
    chartData: [
      { date: '2023년 11월', cashPrice: 480.7, ma50: 495.2, landedBaseline: 340 },
      { date: '2024년 1월', cashPrice: 445.0, ma50: 460.0, landedBaseline: 310 },
      { date: '2024년 3월', cashPrice: 425.5, ma50: 435.4, landedBaseline: 292 },
      { date: '2024년 5월', cashPrice: 460.2, ma50: 440.0, landedBaseline: 320 },
      { date: '2024년 7월', cashPrice: 410.0, ma50: 428.5, landedBaseline: 282 },
      { date: '2024년 9월', cashPrice: 418.0, ma50: 422.0, landedBaseline: 288 },
      { date: '2024년 11월 (현재)', cashPrice: 432.50, ma50: 425.8, landedBaseline: 296 }
    ],
    aiConfidence: 89,
    recommendedCoverage: '45~60일 선도 구매',
    aiSynthesis:
      '미국산 옥수수는 미 중서부 콘벨트 수확 완료에 따른 계절적 출하 압력과 남미 브라질(사프리냐) 파종기 양호한 기후로 인해 420~445 USd/bu 범위의 횡보 국면을 형성하고 있습니다. 다만 미 에탄올 생산용 소비 견조세 및 국내 배합사료/전분당 제조 조달 수요가 하단을 지지하고 있어, 430 USd선 이하에서 분할 매수 헤지 포지션을 구축할 것을 권고합니다.',
    bullishFactors: ['미 에탄올 수요 호조 (+10~15 USd)', '중국 수입 재개 기대', '사료용 소비 견조'],
    bearishFactors: ['콘벨트 대풍작 공급 (-12~20 USd)', '브라질 파종 가속', '글로벌 재고 안정'],
    monitoringItems: ['남미 토양 수분 레이더 (7~14일 영향)', '미 주간 에탄올 생산', '벌크선 운임 변동'],
    technicalSignals: {
      headline: '박스권 하단 지지 (Range-Bound Support)',
      ma20: 428.1,
      ma20Note: '단기 지지선 상회',
      ma50: 425.8,
      ma50Note: '중기 골든크로스',
      ma200: 462.5,
      ma200Note: '장기 저항선',
      rsi: 48.6,
      rsiStatus: 'Neutral (중립)',
      macd: -0.45,
      macdStatus: '수렴 구간 (Neutral)',
      bollinger: 'Lower Support',
      bollingerStatus: '하단 밴드 반등',
      r2: 460.0,
      r1: 445.0,
      pp: 432.0,
      s1: 422.0,
      s2: 410.0,
      directive: '425~428 USd 지지선 부근에서 1분기 가공용 소요물량 선제적 분할 매수 유효.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 55,
        drivers: '박스권 안정세 (420~445 USd), 환율 1,385원, 해상운임 $41.50/MT',
        landedKrw: 296,
        diffPct: 0.0,
        recommendation: '표준 60일 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 30,
        drivers: '남미 가뭄 지속 + 에탄올 수요 급증, 환율 1,420원 급등',
        landedKrw: 328,
        diffPct: 10.8,
        diffKrw: 32,
        recommendation: '선도 커버리지 90일로 긴급 확대 (Extend forward to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '브라질 기록적 대풍작 + 물류 정상화, 환율 1,340원 안정',
        landedKrw: 272,
        diffPct: -8.1,
        diffKrw: -24,
        recommendation: '선도 버퍼 30일 축소 및 현물 분할 매수 레버리지'
      },
      maxRiskUp: '+32원/kg (연간 약 +48억원 영향)',
      maxOpportunityDown: '-24원/kg (연간 약 -36억원 절감)',
      optimalHedge: '60~65% 선도 조달 (리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '1,228.0', unit: 'M MT', diff: '+0.5% YoY', outlook: '미국 역대급 단수' },
      consumption: { value: '1,229.5', unit: 'M MT', diff: '+1.1% YoY', outlook: '-9.7 M MT 결손' },
      endingStocks: { value: '305.2', unit: 'M MT', diff: '-1.5% YoY', outlook: '25.0% (수급 타이트)' },
      trade: { value: '191.4', unit: 'M MT', diff: '+1.8% YoY', outlook: '58% of Exports' }
    },
    wasdeLedger: [
      { item: '기초 재고 (Beginning Stocks)', final2324: '301.2', estOct: '312.7', reportNov: '313.8', momRevision: '+1.1', yoyChange: '+4.2%' },
      { item: '총 생산량 (Production)', final2324: '1,223.5', estOct: '1,217.4', reportNov: '1,219.8', momRevision: '+2.4', yoyChange: '-0.3%' },
      { item: '총 수입량 (Total Imports)', final2324: '188.2', estOct: '189.5', reportNov: '190.1', momRevision: '+0.6', yoyChange: '+1.0%' },
      { item: '식품·종자·산업용 소비 (Food, Seed & Industrial)', final2324: '462.8', estOct: '468.2', reportNov: '470.5', momRevision: '+2.3', yoyChange: '+1.7%' },
      { item: '사료 및 기타 잔여 소비 (Feed & Residual Use)', final2324: '753.1', estOct: '758.0', reportNov: '759.0', momRevision: '+1.0', yoyChange: '+0.8%' },
      { item: '총 수출 교역량 (Total Exports)', final2324: '188.0', estOct: '190.8', reportNov: '191.4', momRevision: '+0.6', yoyChange: '+1.8%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '308.8', estOct: '306.5', reportNov: '304.1', momRevision: '-2.4', yoyChange: '-1.5%', isHighlighted: true },
      { item: '재고율 (Stock-to-Use Ratio, %)', final2324: '25.4%', estOct: '25.0%', reportNov: '24.7%', momRevision: '-0.3%p', yoyChange: '-0.7%p', isHighlighted: true }
    ],
    originsLedger: [
      { region: '미국 (US Corn Belt)', production: '384.6', yoy: '+1.2%', isYoyPositive: true, exports: '59.5', endingStocks: '54.0', riskAssessment: '저위험 - 안정적 PNW/걸프 선적 물류', riskLevel: 'Low' },
      { region: '브라질 (Safrinha/Mato Grosso)', production: '127.0', yoy: '+4.1%', isYoyPositive: true, exports: '48.0', endingStocks: '9.5', riskAssessment: '보통 - 파종기 기후 및 내륙 철도 물류 모니터링', riskLevel: 'Medium' },
      { region: '아르헨티나 (Pampas)', production: '51.0', yoy: '+2.0%', isYoyPositive: true, exports: '36.0', endingStocks: '4.2', riskAssessment: '보통 - 파라나강 흘수 및 환율 변동성 주시', riskLevel: 'Medium' },
      { region: '우크라이나 (흑해 연안)', production: '26.2', yoy: '-12.5%', isYoyPositive: false, exports: '23.0', endingStocks: '2.1', riskAssessment: '고위험 - 흑해 항만 물류 지정학 리스크', riskLevel: 'High' }
    ],
    landedCompetitiveness: [
      { origin: '미국 걸프/PNW Yellow Corn #2', grade: 'US No.2 Yellow Dent Corn, 핵심 기준물량', regionCategory: 'na', regionTag: '북미', fob: '$198.00/MT', freight: '$42.50/MT', tariff: '0% (TRQ)', cfr: '$240.50/MT', landedKrw: '₩333.9 / kg', assessment: '조달 가용성 우수 / 핵심 기준물량' },
      { origin: '브라질 산토스 Corn', grade: 'Santos FOB Safrinha Crop, 수출 성수기 오퍼', regionCategory: 'sa', regionTag: '남미', fob: '$192.00/MT', freight: '$46.00/MT', tariff: '0% (TRQ)', cfr: '$238.00/MT', landedKrw: '₩330.5 / kg', assessment: '중남미 수확기 가격 경쟁력 확보' },
      { origin: '아르헨티나 Up-River Corn', grade: 'Rosario / Up-River FOB, 파라나강 제약 반영', regionCategory: 'sa', regionTag: '남미', fob: '$188.00/MT', freight: '$48.50/MT', tariff: '0% (TRQ)', cfr: '$236.50/MT', landedKrw: '₩328.4 / kg', assessment: '최저가 FOB 우위 / 단기 계약 매력', highlightBadge: '최저가' },
      { origin: '우크라이나 Corn', grade: 'Pivdennyi / Chornomorsk FOB, 해상 회랑', regionCategory: 'eu', regionTag: '유럽/흑해', fob: '$185.00/MT', freight: '$58.00/MT', tariff: '1.8%', cfr: '$243.00/MT', landedKrw: '₩337.4 / kg', assessment: '물류 및 전쟁 보험료 부담' }
    ],
    timelineEvents: [
      { date: 'Nov 14, 2024', region: '글로벌', source: 'USDA FAS', title: 'USDA 11월 WASDE 보고서: 글로벌 옥수수 기말 재고 소폭 하향 조정', url: 'https://www.usda.gov/oce/commodity/wasde', summary: '수요 증가로 재고율 24.7%로 하락, 공급 여력 축소', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 18, 2024', region: '남미 (Brazil)', source: 'CONAB', title: 'CONAB 브라질 사프리냐 옥수수 파종 진도율 78% 발표', url: 'https://www.conab.gov.br', summary: '주요 산지 마토그로소 양호한 강우로 순항', importance: 'Medium', direction: 'Neutral' },
      { date: 'Nov 21, 2024', region: '미국 (US)', source: '미국 에너지정보청 (EIA)', title: '미 주간 에탄올 생산량 110만 배럴 돌파 및 재고 감소', url: 'https://www.eia.gov', summary: '정유사 블렌딩 수요 강세로 분쇄용 수요 급증', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 26, 2024', region: '우크라이나', source: 'APK-Inform', title: '오데사항 곡물 수출 터미널 전력 공급 불안정', url: 'https://www.apk-inform.com', summary: '흑해 항만 선적 지연 및 전쟁 보험료 할증', importance: 'Medium', direction: 'Bullish' },
      { date: 'Dec 01, 2024', region: '아르헨티나', source: '로사리오 곡물거래소', title: '로사리오 곡물거래소 파라나강 수위 회복 전망 보고', url: 'https://www.bcr.com.ar', summary: '바지선 운항 흘수 제약 완화, 선적 단가 하향 안정', importance: 'Low', direction: 'Bearish' }
    ]
  },
  {
    id: 'soybean',
    path: 'commodity-soybean',
    nameKo: '대두',
    nameEn: 'Soybean',
    gradeEn: 'CBOT: ZS Benchmark',
    description: '착유 및 장류 가공용 미국/브라질산 대두',
    category: 'grain',
    categoryNameKo: '곡물류 (Grains)',
    price: 1024.75,
    unit: 'USd/bu',
    priceKrwEstimated: 688.0,
    landedKrwKg: 688,
    changeWoW: 1.45,
    changeMoM: 0.60,
    changeYoY: -19.32,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (Estimated CIF Busan Landed Duty-Paid)',
    ticker: 'CBOT: S / ZS',
    exchange: 'CBOT',
    sparkline: [1010, 1014, 1018, 1015, 1021, 1024.75],
    chartData: [
      { date: '2023년 11월', cashPrice: 1270.0, ma50: 1285.0, landedBaseline: 840 },
      { date: '2024년 1월', cashPrice: 1220.5, ma50: 1240.0, landedBaseline: 810 },
      { date: '2024년 3월', cashPrice: 1180.0, ma50: 1200.0, landedBaseline: 780 },
      { date: '2024년 5월', cashPrice: 1215.0, ma50: 1195.0, landedBaseline: 805 },
      { date: '2024년 7월', cashPrice: 1060.0, ma50: 1110.0, landedBaseline: 710 },
      { date: '2024년 9월', cashPrice: 1010.0, ma50: 1025.0, landedBaseline: 675 },
      { date: '2024년 11월 (현재)', cashPrice: 1024.75, ma50: 1012.5, landedBaseline: 688 }
    ],
    aiConfidence: 91,
    recommendedCoverage: '60~75일 선도 구매',
    aiSynthesis:
      '미국산 대두 수확 완료 후 계절적 출하 압력이 완화되는 가운데, 중국의 대두 압착(Crush) 마진 개선에 따른 수입 수요 재개와 미중 통상 정책 및 무역 갈등 경계 심리가 1,000~1,050 USd/bu 범위의 하방 경직성을 형성하고 있습니다. 남미 브라질 파종 진행 속도는 양호하나, 원/달러 환율 1,385원선 이상 고환율 지속에 대응하여 1,010~1,020 USd 지지선 부근에서 1~2분기 필요 물량의 선제적 분할 헤지 구축을 권고합니다.',
    bullishFactors: ['중국 대두 착유(Crush) 가동률 회복 (+25~35 USd)', '미중 통상 관세 리스크 선반영', '미 대두유 바이오연료 수요 견조'],
    bearishFactors: ['브라질 24/25 파종기 기상 호조 (-30~45 USd)', '미국 수확기 풍부한 현물 재고', '미 달러화 강세 지속'],
    monitoringItems: ['중국 수입선 매입 속도 (Sinograin)', '브라질 마토그로소 강우 지속 여부', '대두박/대두유 크러시 마진 스프레드'],
    technicalSignals: {
      headline: '단기 반등 및 1,000선 지지 안착 (Bullish Rebound)',
      ma20: 1015.2,
      ma20Note: '단기 골든크로스',
      ma50: 1012.5,
      ma50Note: '중기 지지선 반등',
      ma200: 1148.0,
      ma200Note: '장기 하향 안정',
      rsi: 52.4,
      rsiStatus: 'Neutral-Bullish',
      macd: 1.85,
      macdStatus: '상승 전환 매수 시그널',
      bollinger: 'Midline Breakout',
      bollingerStatus: '상단 밴드 테스트',
      r2: 1060.0,
      r1: 1042.0,
      pp: 1020.0,
      s1: 1008.0,
      s2: 985.0,
      directive: '1,008~1,015 USd 지지선 구간에서 2025년 1분기 가공 및 착유용 소요물량 선제 분할 매수 유효.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 55,
        drivers: '박스권 횡보 (1,000~1,050 USd), 환율 1,385원, 해상운임 $43.00/MT',
        landedKrw: 688,
        diffPct: 0.0,
        recommendation: '표준 60일 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 30,
        drivers: '중국 대량 매입 급증 + 남미 개화기 가뭄, 환율 1,420원 급등',
        landedKrw: 754,
        diffPct: 9.6,
        diffKrw: 66,
        recommendation: '선도 커버리지 90일로 긴급 확대 (Extend forward coverage to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '브라질 사상 최대 풍작 공급 과잉 + 미중 관세 분쟁 격화, 환율 1,340원 안정',
        landedKrw: 635,
        diffPct: -7.7,
        diffKrw: -53,
        recommendation: '선도 버퍼 30일 축소 및 현물 분할 매수 레버리지'
      },
      maxRiskUp: '+₩66/kg (연간 약 +68억원 영향)',
      maxOpportunityDown: '-₩53/kg (연간 약 -54억원 절감)',
      optimalHedge: '65~70% 선도 조달 (리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '399.5', unit: 'M MT', diff: '+4.8% YoY', outlook: '브라질 역대급 단수' },
      consumption: { value: '388.2', unit: 'M MT', diff: '+3.2% YoY', outlook: '80% 착유' },
      endingStocks: { value: '131.7', unit: 'M MT', diff: '+17.4% YoY', outlook: '32.7% (안정적 수준)' },
      trade: { value: '180.2', unit: 'M MT', diff: '+2.1% YoY', outlook: '59% of Exports' }
    },
    wasdeLedger: [
      { item: '기초 재고 (Beginning Stocks)', final2324: '101.5', estOct: '112.3', reportNov: '112.4', momRevision: '+0.1', yoyChange: '+10.7%' },
      { item: '총 생산량 (Production)', final2324: '381.2', estOct: '398.8', reportNov: '399.5', momRevision: '+0.7', yoyChange: '+4.8%' },
      { item: '총 수입량 (Total Imports)', final2324: '177.3', estOct: '179.8', reportNov: '180.2', momRevision: '+0.4', yoyChange: '+1.6%' },
      { item: '착유 및 가공용 소비 (Crush / Processing)', final2324: '332.1', estOct: '344.0', reportNov: '345.2', momRevision: '+1.2', yoyChange: '+3.9%' },
      { item: '사료 및 기타 잔여 소비 (Food, Seed & Residual)', final2324: '41.5', estOct: '42.8', reportNov: '43.0', momRevision: '+0.2', yoyChange: '+3.6%' },
      { item: '총 수출 교역량 (Total Exports)', final2324: '177.5', estOct: '179.8', reportNov: '180.2', momRevision: '+0.4', yoyChange: '+1.5%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '112.4', estOct: '131.2', reportNov: '131.7', momRevision: '+0.5', yoyChange: '+17.2%', isHighlighted: true },
      { item: '재고율 (Stock-to-Use Ratio, %)', final2324: '30.1%', estOct: '32.6%', reportNov: '32.7%', momRevision: '+0.1%p', yoyChange: '+2.6%p', isHighlighted: true }
    ],
    originsLedger: [
      { region: '브라질 (Mato Grosso / Cerrado)', production: '169.0', yoy: '+10.5%', isYoyPositive: true, exports: '105.0', endingStocks: '42.0', riskAssessment: '저위험 - 압도적 수출 경쟁력 및 항만 확장', riskLevel: 'Low' },
      { region: '미국 (US Soybean Belt)', production: '124.8', yoy: '+10.1%', isYoyPositive: true, exports: '50.3', endingStocks: '12.8', riskAssessment: '보통 - 미중 통상 관세 정책 및 미시시피강 수위 모니터링', riskLevel: 'Medium' },
      { region: '아르헨티나 (Pampas)', production: '52.0', yoy: '+7.9%', isYoyPositive: true, exports: '7.5', endingStocks: '28.5', riskAssessment: '보통 - 페소화 환율 변동 및 가공세 주시', riskLevel: 'Medium' },
      { region: '파라과이 (Alto Parana)', production: '11.2', yoy: '+4.7%', isYoyPositive: true, exports: '6.8', endingStocks: '1.2', riskAssessment: '저위험 - 비유전자변형 가공 및 인접 수로 물류', riskLevel: 'Low' }
    ],
    landedCompetitiveness: [
      { origin: '브라질 산토스 Soybean', grade: 'Santos FOB, #2 Yellow, 성수기 오퍼', regionCategory: 'sa', regionTag: '남미', fob: '$392.00/MT', freight: '$46.00/MT', tariff: '0% (TRQ)', cfr: '$438.00/MT', landedKrw: '₩608.2 / kg', assessment: '최고 가격 경쟁력 / 대량 구매 권고', highlightBadge: '최고가성비' },
      { origin: '미국 걸프/PNW Soybean #2', grade: 'US No.2 Yellow, 기준 조달물량', regionCategory: 'na', regionTag: '북미', fob: '$408.00/MT', freight: '$43.00/MT', tariff: '0% (TRQ)', cfr: '$451.00/MT', landedKrw: '₩626.2 / kg', assessment: '조달 안정성 우수 / 핵심 기준물량' },
      { origin: '아르헨티나 Up-River Soybean', grade: 'Rosario FOB, 착유용 오퍼 최적', regionCategory: 'sa', regionTag: '남미', fob: '$395.00/MT', freight: '$48.50/MT', tariff: '0% (TRQ)', cfr: '$443.50/MT', landedKrw: '₩615.8 / kg', assessment: '착유용 오퍼 최적 / 단기 계약 매력' },
      { origin: '파라과이 Asuncion Soybean', grade: '아순시온 FOB, 고단백 프리미엄 원료', regionCategory: 'sa', regionTag: '남미', fob: '$390.00/MT', freight: '$54.00/MT', tariff: '0% (TRQ)', cfr: '$444.00/MT', landedKrw: '₩616.5 / kg', assessment: '단백질 함량 우수 / 프리미엄 배치' }
    ],
    timelineEvents: [
      { date: 'Nov 14, 2024', region: '글로벌', source: 'USDA FAS', title: 'USDA 11월 WASDE 보고서: 글로벌 대두 생산량 상향 및 기말 재고 증가 확인', url: 'https://www.usda.gov/oce/commodity/wasde', summary: '재고율 32.7%로 상승, 중장기 상단 제한', importance: 'High', direction: 'Bearish' },
      { date: 'Nov 19, 2024', region: '브라질', source: 'CONAB', title: 'CONAB 2차 브라질 대두 파종 진척률 68% 돌파 발표', url: 'https://www.conab.gov.br', summary: '마토그로소 및 중서부 기후 호조로 대풍작 기대', importance: 'Medium', direction: 'Bearish' },
      { date: 'Nov 22, 2024', region: '중국', source: '중국 해관총서', title: '중국 10월 대두 수입량 809만 톤 발표 (누적 사상 최대 경신)', url: 'https://www.customs.gov.cn', summary: '정부 비축유 확보 및 착유 가동률 상승', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 28, 2024', region: '미국', source: 'NOPA', title: '미국 대두가공협회(NOPA) 10월 착유량 사상 최고치 발표', url: 'https://www.nopa.org', summary: '바이오디젤 및 식물성 유지 수요 지속', importance: 'Medium', direction: 'Bullish' },
      { date: 'Dec 02, 2024', region: '아르헨티나', source: '로사리오 곡물거래소', title: '아르헨티나 로사리오 곡물거래소 대두 파종 면적 전망 유지', url: 'https://www.bcr.com.ar', summary: '팜파스 남부 적정 수분 상태 유지', importance: 'Low', direction: 'Neutral' }
    ]
  },
  {
    id: 'soybean-oil',
    path: 'commodity-soybean-oil',
    nameKo: '대두유',
    nameEn: 'Soybean Oil',
    gradeEn: 'CBOT: ZL Benchmark',
    description: '라면 스프 및 가공식품용 정제 식물성 유지',
    category: 'oils',
    categoryNameKo: '유지류 (Oils)',
    price: 44.80,
    unit: 'USc/lb',
    priceKrwEstimated: 1310.0,
    landedKrwKg: 1310,
    changeWoW: 1.12,
    changeMoM: -0.45,
    changeYoY: -13.18,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (Estimated CIF Busan Landed Duty-Paid)',
    ticker: 'CBOT: BO / ZL',
    exchange: 'CBOT',
    sparkline: [44.2, 44.4, 44.1, 44.5, 44.6, 44.8],
    chartData: [
      { date: '2023년 11월', cashPrice: 51.6, ma50: 53.2, landedBaseline: 1510 },
      { date: '2024년 1월', cashPrice: 48.2, ma50: 49.5, landedBaseline: 1410 },
      { date: '2024년 3월', cashPrice: 47.0, ma50: 48.0, landedBaseline: 1375 },
      { date: '2024년 5월', cashPrice: 45.5, ma50: 46.2, landedBaseline: 1330 },
      { date: '2024년 7월', cashPrice: 46.8, ma50: 45.9, landedBaseline: 1370 },
      { date: '2024년 9월', cashPrice: 43.8, ma50: 44.5, landedBaseline: 1280 },
      { date: '2024년 11월 (현재)', cashPrice: 44.80, ma50: 43.6, landedBaseline: 1310 }
    ],
    aiConfidence: 90,
    recommendedCoverage: '60~75일 선도 구매',
    aiSynthesis:
      '글로벌 대두유 시장은 미 EPA의 신재생연료의무제도(RFS) 바이오디젤 의무혼합 수요가 하방을 견고히 지지하는 가운데, 인도와 중국의 팜유 수입 대체 수요가 대두유 소비를 견인하고 있습니다. 남미 대두 착유(Crush) 증가로 상단이 제한되며 43.0~46.5 USc/lb 박스권 횡보가 예상됩니다. 국내 가공유지 데스크는 43.5~44.2 USc/lb 지지선 구간에서 1분기 튀김유 소요물량의 선제적 분할 헤지 진입을 권고합니다.',
    bullishFactors: ['미 바이오디젤(RFS) 혼합 의무 확대 (+1.2~2.0 USc)', '인도 팜유 대체 수입 증가', '팜유 가격 강세 지속'],
    bearishFactors: ['남미(브라질/아르헨) 대두 착유량 증가 (-1.5~2.2 USc)', '중국 식용유 재고 누적', '원유 가격 조정 시 채산성 둔화'],
    monitoringItems: ['미 EPA RFS 2025 Mandate 발표', '말레이시아 팜유 선물(MDEX) 스프레드', '아르헨티나 대두유 수출 선적 동향'],
    technicalSignals: {
      headline: '박스권 횡보 및 지지선 테스트 (Range-Bound Support)',
      ma20: 44.20,
      ma20Note: '단기 지지선 반등',
      ma50: 43.60,
      ma50Note: '중기 골든크로스',
      ma200: 48.10,
      ma200Note: '장기 저항선 형성',
      rsi: 51.2,
      rsiStatus: 'Neutral',
      macd: 0.35,
      macdStatus: '수렴 구간 반등 시그널',
      bollinger: 'Mid-Band Test',
      bollingerStatus: '중심 밴드 지지',
      r2: 47.20,
      r1: 45.80,
      pp: 44.50,
      s1: 43.80,
      s2: 42.50,
      directive: '43.50~44.20 USc/lb 지지선 구간에서 1분기 농심 튀김유 및 가공유지 소요물량 선제 분할 매수 유효.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 55,
        drivers: '박스권 43.0~46.5 USc, 환율 1,385원, 해상운임 $58.00/MT',
        landedKrw: 1310,
        diffPct: 0.0,
        recommendation: '표준 60일 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 30,
        drivers: 'EPA 바이오디젤 의무량 상향 + 팜유 급등, 환율 1,420원 급등',
        landedKrw: 1440,
        diffPct: 9.9,
        diffKrw: 130,
        recommendation: '선도 커버리지 90일로 긴급 확대 (Extend forward coverage to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '남미 대두 착유 기록적 급증 + 원유 급락, 환율 1,340원 안정',
        landedKrw: 1215,
        diffPct: -7.3,
        diffKrw: -95,
        recommendation: '선도 버퍼 30일 축소 및 현물 분할 매수 레버리지'
      },
      maxRiskUp: '+₩130/kg (연간 약 +28억원 영향)',
      maxOpportunityDown: '-₩95/kg (연간 약 -20억원 절감)',
      optimalHedge: '65~70% 선도 조달 (리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '62.8', unit: 'M MT', diff: '+3.8% YoY', outlook: '역대 최고치 경신' },
      consumption: { value: '61.9', unit: 'M MT', diff: '+3.4% YoY', outlook: '바이오연료 비중 35%' },
      endingStocks: { value: '5.2', unit: 'M MT', diff: '-1.9% YoY', outlook: '타이트한 완충 재고' },
      trade: { value: '12.4', unit: 'M MT', diff: '+2.5% YoY', outlook: '아르헨티나 공급 주도' }
    },
    wasdeLedger: [
      { item: '기초 재고 (Beginning Stocks)', final2324: '5.4', estOct: '5.3', reportNov: '5.3', momRevision: '0.0', yoyChange: '-1.9%' },
      { item: '총 생산량 (Production)', final2324: '60.5', estOct: '62.4', reportNov: '62.8', momRevision: '+0.4', yoyChange: '+3.8%' },
      { item: '총 수입량 (Total Imports)', final2324: '11.8', estOct: '12.1', reportNov: '12.3', momRevision: '+0.2', yoyChange: '+4.2%' },
      { item: '국내 소비(식용 및 바이오연료)', final2324: '59.9', estOct: '61.5', reportNov: '61.9', momRevision: '+0.4', yoyChange: '+3.4%' },
      { item: '총 수출량 (Total Exports)', final2324: '12.1', estOct: '12.2', reportNov: '12.4', momRevision: '+0.2', yoyChange: '+2.5%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '5.3', estOct: '5.2', reportNov: '5.2', momRevision: '0.0', yoyChange: '-1.9%', isHighlighted: true },
      { item: '재고율 (Stock-to-Use Ratio, %)', final2324: '8.8%', estOct: '8.5%', reportNov: '8.4%', momRevision: '-0.1%p', yoyChange: '-0.4%p', isHighlighted: true }
    ],
    originsLedger: [
      { region: '아르헨티나 (Upriver / Rosario)', production: '8.2', yoy: '+14.5%', isYoyPositive: true, exports: '5.1', endingStocks: '0.38', riskAssessment: '보통 - 착유 마진 및 통화 정책 주시 (세계 1위 수출국)', riskLevel: 'Medium' },
      { region: '브라질 (Paranagua / Santos)', production: '10.8', yoy: '+6.2%', isYoyPositive: true, exports: '2.4', endingStocks: '0.45', riskAssessment: '저위험 - 내수 바이오디젤(B14) 및 안정적 항만 선적', riskLevel: 'Low' },
      { region: '미국 (US Gulf / Midwest)', production: '12.3', yoy: '+3.8%', isYoyPositive: true, exports: '1.2', endingStocks: '0.72', riskAssessment: '보통 - 미 국내 RFS 수요 우선 배정', riskLevel: 'Medium' },
      { region: '유럽연합 (EU-27)', production: '3.1', yoy: '+1.1%', isYoyPositive: true, exports: '0.8', endingStocks: '0.25', riskAssessment: '저위험 - 역내 소모 위주 및 고품질 가공', riskLevel: 'Low' }
    ],
    landedCompetitiveness: [
      { origin: '아르헨티나 Upriver Degummed Oil', grade: 'Rosario FOB, 탈검 대두유 기준 오퍼', regionCategory: 'sa', regionTag: '남미', fob: '$920.00/MT', freight: '$58.00/MT', tariff: '0% (TRQ)', cfr: '$978.00/MT', landedKrw: '₩1,358.0 / kg', assessment: '최고 공급량 / 대량 정제유 최적', highlightBadge: '최대공급' },
      { origin: '브라질 Paranagua Crude Degummed', grade: 'Paranagua FOB, 착유 탈검유', regionCategory: 'sa', regionTag: '남미', fob: '$935.00/MT', freight: '$56.00/MT', tariff: '0% (TRQ)', cfr: '$991.00/MT', landedKrw: '₩1,376.0 / kg', assessment: '조달 안정성 우수 / 품질 균일' },
      { origin: '미국 Gulf Refined/Crude Bleached', grade: 'US Gulf FOB, 정제 블리치드 규격', regionCategory: 'na', regionTag: '북미', fob: '$980.00/MT', freight: '$52.00/MT', tariff: '0% (TRQ)', cfr: '$1,032.00/MT', landedKrw: '₩1,433.0 / kg', assessment: '프리미엄 고순도 / 규격 유지용' },
      { origin: '유럽연합 Rotterdam FOB', grade: '로테르담 FOB, 유럽 표준 착유유지', regionCategory: 'eu', regionTag: '유럽', fob: '$1,010.00/MT', freight: '$64.00/MT', tariff: '0% (TRQ)', cfr: '$1,074.00/MT', landedKrw: '₩1,491.0 / kg', assessment: '특수 가공유지용' }
    ],
    timelineEvents: [
      { date: 'Nov 15, 2024', region: '글로벌', source: 'USDA FAS', title: 'USDA 11월 WASDE 대두유 수급 개정 (글로벌 기말재고 5.2M MT 전망)', url: 'https://www.usda.gov/oce/commodity/wasde', summary: '바이오연료 의무 혼합에 따른 수요 견조', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 21, 2024', region: '미국', source: 'EPA', title: '2025 신재생연료의무(RFS) 바이오디젤 혼합 의무량 공청회', url: 'https://www.epa.gov', summary: '정유사 바이오연료 의무 배정량 상향 논의', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 25, 2024', region: '아르헨티나', source: 'CIARA', title: '아르헨티나 대두유 10월 압착량 및 수출 선적 실적 발표', url: 'https://www.ciara.com.ar', summary: '로사리오 항만 가공 가동률 회복', importance: 'Medium', direction: 'Bearish' },
      { date: 'Nov 29, 2024', region: '말레이시아', source: 'MPOB', title: '팜유 11월 수급동향 및 대두유-팜유 가격 역전 스프레드 점검', url: 'https://www.mpob.gov.my', summary: '팜유 급등에 따른 대두유 대체 소비 증대', importance: 'Medium', direction: 'Bullish' },
      { date: 'Dec 04, 2024', region: '브라질', source: 'ABIOVE', title: '브라질 2024/25 대두유 생산 및 바이오디젤 B15 로드맵 발표', url: 'https://www.abiove.org.br', summary: '내수 혼합 비율 확대와 수출 여력의 균형 평가', importance: 'Low', direction: 'Neutral' }
    ]
  },
  {
    id: 'palm-oil',
    path: 'commodity-palm-oil',
    nameKo: '팜유',
    nameEn: 'Palm Oil',
    gradeEn: 'MDEX: FCPO Benchmark',
    description: '면류 유탕 전용 말레이시아/인도네시아산 RBD 팜올레인',
    category: 'oils',
    categoryNameKo: '유지류 (Oils)',
    price: 4185,
    unit: 'MYR/MT',
    priceKrwEstimated: 1440.0,
    landedKrwKg: 1440,
    changeWoW: 3.80,
    changeMoM: 6.12,
    changeYoY: 13.88,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (MYR/KRW 312.20 기준)',
    ticker: 'BMD: FCPO',
    exchange: 'BMD',
    sparkline: [4030, 4070, 4110, 4090, 4140, 4185],
    chartData: [
      { date: '2023년 11월', cashPrice: 3675, ma50: 3720, landedBaseline: 1260 },
      { date: '2024년 1월', cashPrice: 3780, ma50: 3740, landedBaseline: 1300 },
      { date: '2024년 3월', cashPrice: 4250, ma50: 3950, landedBaseline: 1460 },
      { date: '2024년 5월', cashPrice: 3890, ma50: 4020, landedBaseline: 1340 },
      { date: '2024년 7월', cashPrice: 3950, ma50: 3920, landedBaseline: 1360 },
      { date: '2024년 9월', cashPrice: 3944, ma50: 3980, landedBaseline: 1355 },
      { date: '2024년 11월 (현재)', cashPrice: 4185, ma50: 4050, landedBaseline: 1440 }
    ],
    aiConfidence: 92,
    recommendedCoverage: '60~75일 선도 구매',
    aiSynthesis:
      '인도네시아 B40 바이오디젤 조기 시행 모멘텀과 동남아 라니냐성 폭우로 인한 생산 차질 우려가 복합 작용하여 4,050~4,300 MYR/MT 구간에서 강한 상방 압력 및 하방 경직성을 형성하고 있습니다. 라면 생산 라인의 유탕 유지 수급 안정을 위해 4,120~4,160 MYR 지지선 확인 시 1분기 소요 물량의 선제적 분할 매수를 강력 권고합니다.',
    bullishFactors: ['인도네시아 B40 바이오디젤 강행 (+120~180 MYR)', '동남아 라니냐 강우량 집중 및 수확 지연', '말레이시아 기말재고 185만톤 타이트'],
    bearishFactors: ['인도·중국 4분기 재고 비축 일단락 (-90~140 MYR)', 'POGO 스프레드 축소로 대두유 대체 전환', '유럽 EUDR 시행 유예 심리 완화'],
    monitoringItems: ['인도네시아 수출세/레비(Levy) 인상률', '말레이 11월 선적 통계(ITS/Amspec)', '수마트라/칼리만탄 누적 강우량 레이더'],
    technicalSignals: {
      headline: '상단 돌파 시도 (Bullish Momentum Breakout)',
      ma20: 4110,
      ma20Note: '단기 지지선 상회',
      ma50: 4050,
      ma50Note: '중기 골든크로스',
      ma200: 3920,
      ma200Note: '장기 우상향 지지',
      rsi: 61.4,
      rsiStatus: 'Bullish (강세)',
      macd: 48.5,
      macdStatus: '매수 시그널 확대',
      bollinger: 'Upper Band Test',
      bollingerStatus: '상단 밴드 확장',
      r2: 4310,
      r1: 4240,
      pp: 4160,
      s1: 4080,
      s2: 4010,
      directive: '4,120~4,160 MYR 지지선 확인 시 1분기 농심 라면 유탕 소요량 선제 분할 매수 적극 유효.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 55,
        drivers: '선물 4,100~4,250 MYR, B40 단계 도입, 환율 1,388원, 해상운임 $38/MT',
        landedKrw: 1440,
        diffPct: 0.0,
        recommendation: '표준 60일 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 30,
        drivers: '인도네시아 B40 전면 시행, 라니냐 수확 중단 및 수출세 인상, 환율 1,420원',
        landedKrw: 1590,
        diffPct: 10.4,
        diffKrw: 150,
        recommendation: '선도 커버리지 90일로 긴급 확대 (Extend forward coverage to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '인도네시아 수출세 완화, 대두유 대체 급증, 환율 1,340원 안정',
        landedKrw: 1335,
        diffPct: -7.3,
        diffKrw: -105,
        recommendation: '선도 버퍼 30일 축소 및 현물 분할 매수 레버리지'
      },
      maxRiskUp: '+₩150/kg (연간 약 +34억원 영향)',
      maxOpportunityDown: '-₩105/kg (연간 약 -23억원 절감)',
      optimalHedge: '65~70% 선도 조달 (리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '81.5', unit: 'M MT', diff: '+1.4% YoY', outlook: '수확기 점진적 회복' },
      consumption: { value: '80.2', unit: 'M MT', diff: '+2.8% YoY', outlook: '바이오디젤 비중 38%' },
      endingStocks: { value: '1.85', unit: 'M MT', diff: '-5.2% YoY', outlook: '타이트한 말레이 재고' },
      trade: { value: '51.4', unit: 'M MT', diff: '+2.1% YoY', outlook: '인니·말레이 88% 점유' }
    },
    wasdeLedger: [
      { item: '기초 재고 (Beginning Stocks)', final2324: '2.12', estOct: '1.95', reportNov: '1.92', momRevision: '-0.03', yoyChange: '-9.4%' },
      { item: '총 생산량 (Production)', final2324: '80.4', estOct: '81.1', reportNov: '81.5', momRevision: '+0.4', yoyChange: '+1.4%' },
      { item: '총 수입량 (Total Imports)', final2324: '49.8', estOct: '50.6', reportNov: '51.0', momRevision: '+0.4', yoyChange: '+2.4%' },
      { item: '국내 소비(식용 및 바이오연료)', final2324: '78.0', estOct: '79.5', reportNov: '80.2', momRevision: '+0.7', yoyChange: '+2.8%' },
      { item: '총 수출량 (Total Exports)', final2324: '50.2', estOct: '51.0', reportNov: '51.4', momRevision: '+0.4', yoyChange: '+2.4%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '1.95', estOct: '1.88', reportNov: '1.85', momRevision: '-0.03', yoyChange: '-5.2%', isHighlighted: true },
      { item: '재고율 (Stock-to-Use Ratio, %)', final2324: '10.6%', estOct: '10.0%', reportNov: '9.8%', momRevision: '-0.2%p', yoyChange: '-0.8%p', isHighlighted: true }
    ],
    originsLedger: [
      { region: '인도네시아 (Sumatra / Kalimantan)', production: '48.5', yoy: '+1.8%', isYoyPositive: true, exports: '28.2', endingStocks: '2.45', riskAssessment: '보통 - B40 의무 정책 및 수출 레비 인상 주시', riskLevel: 'Medium' },
      { region: '말레이시아 (Sabah / Sarawak)', production: '19.8', yoy: '+1.2%', isYoyPositive: true, exports: '16.5', endingStocks: '1.85', riskAssessment: '저위험 - 농심 주계약선, 안정적 선적 및 고품질 RBD 규격', riskLevel: 'Low' },
      { region: '태국 (Southern Thailand)', production: '3.5', yoy: '+3.2%', isYoyPositive: true, exports: '1.2', endingStocks: '0.32', riskAssessment: '저위험 - 역내 소비 위주 및 인접국 선적', riskLevel: 'Low' },
      { region: '콜롬비아 / 중남미', production: '2.1', yoy: '+4.5%', isYoyPositive: true, exports: '0.9', endingStocks: '0.18', riskAssessment: '저위험 - RSPO 친환경 인증 비중 높음', riskLevel: 'Low' }
    ],
    landedCompetitiveness: [
      { origin: '말레이시아 Port Klang RBD Palm Olein', grade: '포트클랑 FOB, 라면 튀김 전용 표준 규격', regionCategory: 'all', regionTag: '말레이시아', fob: '$1,020.00/MT', freight: '$38.00/MT', tariff: '0% (AKFTA)', cfr: '$1,058.00/MT', landedKrw: '₩1,469.0 / kg', assessment: '조달 안정성 최상 / 라면 유탕 표준', highlightBadge: '농심표준' },
      { origin: '말레이시아 Pasir Gudang Crude Palm Oil', grade: '파시르구당 FOB, CPO 원유 기준', regionCategory: 'all', regionTag: '말레이시아', fob: '$980.00/MT', freight: '$36.00/MT', tariff: '0% (AKFTA)', cfr: '$1,016.00/MT', landedKrw: '₩1,410.7 / kg', assessment: '가격경쟁력 우수 / 정제 가공용' },
      { origin: '인도네시아 Belawan RBD Palm Olein', grade: '벨라완 FOB, 수출 레비 포함 오퍼', regionCategory: 'all', regionTag: '인도네시아', fob: '$1,005.00/MT', freight: '$42.00/MT', tariff: '0% (AKFTA)', cfr: '$1,047.00/MT', landedKrw: '₩1,453.7 / kg', assessment: '대량 구매 시 단가 협상 용이' },
      { origin: '인도네시아 Dumai Crude Palm Oil', grade: '두마이 FOB, 원유 수출 규격', regionCategory: 'all', regionTag: '인도네시아', fob: '$970.00/MT', freight: '$40.00/MT', tariff: '0% (AKFTA)', cfr: '$1,010.00/MT', landedKrw: '₩1,402.4 / kg', assessment: '수출세 인상 정책 주시 필요' }
    ],
    timelineEvents: [
      { date: 'Nov 18, 2024', region: '말레이시아', source: 'MPOB', title: 'MPOB 11월 공식 수급 보고서 발표 (말레이시아 기말재고 1.85M MT 확인)', url: 'https://www.mpob.gov.my', summary: '재고 감소 및 수출 호조로 현물 프리미엄 강화', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 22, 2024', region: '인도네시아', source: 'ESDM (에너지부)', title: '인도네시아 에너지부 B40 의무 바이오디젤 로드맵 세부 시행령 확정', url: 'https://www.esdm.go.id', summary: '2025년 1월부터 수송용 B40 강행 방침', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 26, 2024', region: '동남아', source: 'MetMalaysia / BMKG', title: '말레이시아·인도네시아 기상청 라니냐 경보 발령', url: 'https://www.met.gov.my', summary: '집중 호우로 운송 차질 및 FFB 착유 지연', importance: 'Medium', direction: 'Bullish' },
      { date: 'Nov 30, 2024', region: '인도', source: 'SEA of India', title: '인도 농식품부 식용유 수입 관세 추가 인상 검토 회의', url: 'https://www.seaofindia.com', summary: 'CPO 기본 관세율 변동 여부 결정 예정', importance: 'Medium', direction: 'Neutral' },
      { date: 'Dec 05, 2024', region: '인도네시아', source: 'GAPKI', title: 'GAPKI 10월 인도네시아 팜유 공식 생산 및 수출 실적 발표', url: 'https://gapki.id', summary: '월간 생산량 410만톤 및 재고 245만톤 집계', importance: 'Low', direction: 'Neutral' }
    ]
  },
  {
    id: 'sugar',
    path: 'commodity-sugar',
    nameKo: '원당',
    nameEn: 'Sugar',
    gradeEn: 'ICE Sugar No.11 Benchmark',
    description: '스낵 및 음료 감미용 브라질/태국산 정제원당',
    category: 'sweeteners',
    categoryNameKo: '당류',
    price: 21.65,
    unit: 'USc/lb',
    priceKrwEstimated: 640.0,
    landedKrwKg: 640,
    changeWoW: -1.20,
    changeMoM: -2.48,
    changeYoY: 9.07,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (USD/KRW 1,388.50 기준)',
    ticker: 'ICE: SB / SB11',
    exchange: 'ICE',
    sparkline: [22.1, 22.3, 21.9, 22.0, 21.8, 21.65],
    chartData: [
      { date: '2023년 11월', cashPrice: 27.2, ma50: 26.5, landedBaseline: 810 },
      { date: '2024년 1월', cashPrice: 23.8, ma50: 25.0, landedBaseline: 710 },
      { date: '2024년 3월', cashPrice: 21.9, ma50: 22.8, landedBaseline: 650 },
      { date: '2024년 5월', cashPrice: 19.5, ma50: 20.8, landedBaseline: 580 },
      { date: '2024년 7월', cashPrice: 18.8, ma50: 19.2, landedBaseline: 560 },
      { date: '2024년 9월', cashPrice: 23.1, ma50: 21.0, landedBaseline: 685 },
      { date: '2024년 11월 (현재)', cashPrice: 21.65, ma50: 22.1, landedBaseline: 640 }
    ],
    aiConfidence: 90,
    recommendedCoverage: '45~60일 선도 구매',
    aiSynthesis:
      '브라질 중남부(Center-South)의 사탕수수 파쇄 작업이 마무리 단계에 접어들며 에탄올 배분율 조정(Sugar-Ethanol Mix)이 시장의 핵심 지지선으로 작용하고 있습니다. 인도의 생산 회복세 및 에탄올 전환 의무 완화로 수출 쿼터 재개 가능성이 상단을 제약하고 있어, 21.20~21.50 USc/lb 지지선 부근에서 1분기 소요물량 선제 분할 매수를 권고합니다.',
    bullishFactors: ['브라질 가뭄 여파로 차기 수확 지연 가능성 (+0.8~1.5 USc)', '태국 작황 가뭄 지속'],
    bearishFactors: ['브라질 역사적 고수준 누적 생산량 (-1.2~1.8 USc)', '인도 수확량 양호 및 수출 허용 가능성'],
    monitoringItems: ['브라질 UNICA 격주 파쇄 보고서', '인도 식품부 수출 쿼터 승인 여부', '태국 계절풍 강우량'],
    technicalSignals: {
      headline: '횡보 조정 및 21선 지지 테스트 (Range-Bound Consolidation)',
      ma20: 21.90,
      ma20Note: '단기 저항선',
      ma50: 22.10,
      ma50Note: '중기 하향 압력',
      ma200: 22.80,
      ma200Note: '장기 저항선',
      rsi: 44.8,
      rsiStatus: '중립/약세',
      macd: -0.18,
      macdStatus: '하락 모멘텀 둔화',
      bollinger: 'Lower Band 근접',
      bollingerStatus: '기술적 반등 지지',
      r2: 22.90,
      r1: 22.30,
      pp: 21.75,
      s1: 21.20,
      s2: 20.80,
      directive: '21.20~21.50 USc 밴드 하단 터치 시 1분기 스낵/제과 소요량 선제 분할 매수 대응.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 55,
        drivers: '브라질 파쇄 마감, 환율 1,385원, 해상운임 $52/MT',
        landedKrw: 640,
        diffPct: 0.0,
        recommendation: '표준 60일 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 30,
        drivers: '브라질 폭우로 파쇄 조기 마감, 태국 생산 감소, 환율 1,420원',
        landedKrw: 705,
        diffPct: 10.2,
        diffKrw: 65,
        recommendation: '선도 커버리지 90일로 긴급 확대 (Extend forward coverage to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '인도 200만톤 수출 쿼터 개방, 브라질 에탄올 패리티 급락',
        landedKrw: 590,
        diffPct: -7.8,
        diffKrw: -50,
        recommendation: '선도 버퍼 30일 축소 및 현물 분할 매수 레버리지'
      },
      maxRiskUp: '+₩65/kg (연간 약 +18억원 영향)',
      maxOpportunityDown: '-₩50/kg (연간 약 -14억원 절감)',
      optimalHedge: '55~60% 선도 조달 (리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '181.2', unit: 'M MT', diff: '+1.2% YoY', outlook: '브라질 생산 호조' },
      consumption: { value: '179.8', unit: 'M MT', diff: '+1.4% YoY', outlook: '식음료 가공 수요 증가' },
      endingStocks: { value: '38.4', unit: 'M MT', diff: '-2.8% YoY', outlook: '완충 재고 다소 타이트' },
      trade: { value: '64.5', unit: 'M MT', diff: '+1.8% YoY', outlook: '남미 공급 중심' }
    },
    wasdeLedger: [
      { item: '기초 재고 (Beginning Stocks)', final2324: '39.5', estOct: '38.8', reportNov: '39.0', momRevision: '+0.2', yoyChange: '-1.3%' },
      { item: '총 생산량 (Production)', final2324: '179.1', estOct: '180.5', reportNov: '181.2', momRevision: '+0.7', yoyChange: '+1.2%' },
      { item: '총 수입량 (Total Imports)', final2324: '61.2', estOct: '62.0', reportNov: '62.5', momRevision: '+0.5', yoyChange: '+2.1%' },
      { item: '식음료 및 공업용 소비 (Consumption)', final2324: '177.3', estOct: '179.2', reportNov: '179.8', momRevision: '+0.6', yoyChange: '+1.4%' },
      { item: '총 수출량 (Total Exports)', final2324: '63.8', estOct: '64.0', reportNov: '64.5', momRevision: '+0.5', yoyChange: '+1.1%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '39.5', estOct: '38.1', reportNov: '38.4', momRevision: '+0.3', yoyChange: '-2.8%', isHighlighted: true },
      { item: '재고율 (Stock-to-Use Ratio, %)', final2324: '22.3%', estOct: '21.3%', reportNov: '21.4%', momRevision: '+0.1%p', yoyChange: '-0.9%p', isHighlighted: true }
    ],
    originsLedger: [
      { region: '브라질 (Center-South / Santos)', production: '42.5', yoy: '+4.2%', isYoyPositive: true, exports: '33.2', endingStocks: '8.5', riskAssessment: '보통 - 항만 병목 및 에탄올 패리티 주시', riskLevel: 'Medium' },
      { region: '인도 (Maharashtra / Uttar Pradesh)', production: '33.5', yoy: '-1.5%', isYoyPositive: false, exports: '2.2', endingStocks: '7.8', riskAssessment: '보통 - 국내 물가 안정용 수출 쿼터 규제', riskLevel: 'Medium' },
      { region: '태국 (Central & Isan Plains)', production: '10.2', yoy: '+8.5%', isYoyPositive: true, exports: '7.5', endingStocks: '2.1', riskAssessment: '저위험 - 지리적 인접성 및 단축 해상 운송일수 우수', riskLevel: 'Low' },
      { region: '유럽연합 (EU-27 Beet Sugar)', production: '15.8', yoy: '+3.0%', isYoyPositive: true, exports: '1.8', endingStocks: '3.2', riskAssessment: '저위험 - 역내 사탕무 가공 및 안정적 생산', riskLevel: 'Low' }
    ],
    landedCompetitiveness: [
      { origin: '브라질 Santos VHP Raw Sugar', grade: '산투스 FOB, 고분극 원당(Very High Polarization)', regionCategory: 'sa', regionTag: '남미', fob: '$465.00/MT', freight: '$54.00/MT', tariff: '3% (TRQ)', cfr: '$519.00/MT', landedKrw: '₩640.0 / kg', assessment: '대량 조달 최적 / 기준 가격경쟁력 우수', highlightBadge: '대량조달' },
      { origin: '태국 Laem Chabang Hi-Pol Raw Sugar', grade: '람차방 FOB, Hi-Pol 규격', regionCategory: 'asia', regionTag: '아시아', fob: '$485.00/MT', freight: '$25.00/MT', tariff: '0% (AKFTA)', cfr: '$510.00/MT', landedKrw: '₩628.5 / kg', assessment: '리드타임 최단 / 소량 신속 조달 유리' },
      { origin: '인도 JNPT Raw Sugar', grade: '나바셰바 FOB, 수출 쿼터 연계 규격', regionCategory: 'asia', regionTag: '아시아', fob: '$478.00/MT', freight: '$38.00/MT', tariff: '3% (CEPA)', cfr: '$516.00/MT', landedKrw: '₩636.2 / kg', assessment: '수출 쿼터 인가 시 대체 조달선' },
      { origin: '호주 Queensland Raw Sugar', grade: '퀸즐랜드 FOB, 고품위 정제원당', regionCategory: 'oc', regionTag: '대양주', fob: '$495.00/MT', freight: '$34.00/MT', tariff: '0% (KAFTA)', cfr: '$529.00/MT', landedKrw: '₩652.8 / kg', assessment: '최고 품질 규격 / 무관세 혜택' }
    ],
    timelineEvents: [
      { date: 'Nov 18, 2024', region: '브라질', source: 'UNICA', title: 'UNICA 10월 하반기 브라질 중남부 사탕수수 파쇄 실적 발표', url: 'https://www.unica.com.br', summary: '설탕 배분율 48.8% 유지로 공급 여력 충분', importance: 'High', direction: 'Bearish' },
      { date: 'Nov 22, 2024', region: '인도', source: '식량공공배분부', title: '인도 2024/25 시즌 에탄올 전용 한도 및 원당 수출 쿼터 배정 공청회', url: 'https://dfpd.gov.in', summary: '조기 수출 허용 가능성 대두로 시세 하방 압력', importance: 'High', direction: 'Bearish' },
      { date: 'Nov 27, 2024', region: '국제', source: 'ISO (London)', title: 'ISO 11월 분기 보고서: 2024/25 글로벌 설탕 수급 밸런스 확정 발표', url: 'https://www.isosugar.org', summary: '소폭 잉여 140만톤, 박스권 흐름 지속', importance: 'Medium', direction: 'Neutral' },
      { date: 'Nov 30, 2024', region: '태국', source: 'OCSB', title: '태국 사탕수수설탕위원회 2024/25 시즌 공식 개시 및 수출 전망 공표', url: 'https://www.ocsb.go.th', summary: '초반 출하 지연 가능성으로 단기 프리미엄', importance: 'Medium', direction: 'Bullish' },
      { date: 'Dec 05, 2024', region: '프랑스 / EU', source: 'DG AGRI', title: 'EU 사탕무(Sugar Beet) 수확 진척률 및 설탕 수출입 쿼터 실적 보고', url: 'https://ec.europa.eu/agriculture', summary: '비트 수확률 92% 돌파로 평년작 수준', importance: 'Low', direction: 'Neutral' }
    ]
  },
  {
    id: 'potato-starch',
    path: 'commodity-potato-starch',
    nameKo: '감자 전분',
    nameEn: 'Potato Starch',
    gradeEn: 'EU Benchmark Spot',
    description: '면발 탄력성 및 식감 개선용 유럽산 고급 천연 전분',
    category: 'starches',
    categoryNameKo: '당류 및 전분류',
    price: 860.0,
    unit: 'EUR/MT',
    priceKrwEstimated: 1428.0,
    landedKrwKg: 1428,
    changeWoW: 0.00,
    changeMoM: -2.38,
    changeYoY: 15.44,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (EUR/KRW 1,485.40, USD/KRW 1,388.50 기준)',
    ticker: 'EU: POTATO / STARCH',
    exchange: 'EU Spot',
    sparkline: [860, 860, 860, 860, 860, 860],
    chartData: [
      { date: '2023년 11월', cashPrice: 745.0, ma50: 760.0, landedBaseline: 1235 },
      { date: '2024년 1월', cashPrice: 790.0, ma50: 775.0, landedBaseline: 1310 },
      { date: '2024년 3월', cashPrice: 830.0, ma50: 810.0, landedBaseline: 1380 },
      { date: '2024년 5월', cashPrice: 890.0, ma50: 860.0, landedBaseline: 1480 },
      { date: '2024년 7월', cashPrice: 885.0, ma50: 890.0, landedBaseline: 1470 },
      { date: '2024년 9월', cashPrice: 881.0, ma50: 885.0, landedBaseline: 1460 },
      { date: '2024년 11월 (현재)', cashPrice: 860.0, ma50: 875.0, landedBaseline: 1428 }
    ],
    aiConfidence: 91,
    recommendedCoverage: '60~75일 선도 구매',
    aiSynthesis:
      '유럽 주요 감자 산지(네덜란드, 독일, 북프랑스)의 2024년 가을 수확이 마무리 단계에 접어든 가운데, 파종기 과도한 강우로 인한 초기 생육 지연에도 불구하고 후기 건조 기후로 수확량 및 전분 함량이 평년 수준을 회복하였습니다. 현물 가격은 850~880 EUR/MT 밴드에서 안정세를 보이고 있으나, 겨울철 유럽 천연가스 난방 수요 및 가공 에너지 비용 변동성에 대비하여 1분기 잔여 소요량의 60~75일 선제 분할 매수를 권고합니다.',
    bullishFactors: ['EU 겨울철 에너지/가스 비용 상승 (+15~25 EUR)', '홍해 우회 해상운임 지속'],
    bearishFactors: ['유럽 전분 감자 수확량 회복 (-20~30 EUR)', '타피오카 등 대체 전분 가격 안정'],
    monitoringItems: ['EU 가공용 천연가스 재고율', '네덜란드 로테르담항 벌크 선적 동향'],
    technicalSignals: {
      headline: '중립 횡보 및 지지선 확인 (Neutral Consolidation)',
      ma20: 865.0,
      ma20Note: '단기 보합',
      ma50: 875.0,
      ma50Note: '중기 하향 안정',
      ma200: 890.0,
      ma200Note: '장기 저항 하회',
      rsi: 46.2,
      rsiStatus: '중립 (Neutral)',
      macd: -2.10,
      macdStatus: '수렴 구간 안정',
      bollinger: 'Mid-Band 지지',
      bollingerStatus: '기술적 반등 유효',
      r2: 895.0,
      r1: 880.0,
      pp: 860.0,
      s1: 850.0,
      s2: 835.0,
      directive: '850~860 EUR/MT 지지선 확인 시 1분기 농심 스낵 및 면류 배합용 소요량 안정적 분할 매수 유효.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 60,
        drivers: 'EU 스팟 €860, 환율 1,485원, 안정적 건조 비용',
        landedKrw: 1428,
        diffPct: 0.0,
        recommendation: '표준 60일 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 25,
        drivers: 'EU 난방 가스비 급등, 홍해 운임 할증 가중, 환율 1,510원',
        landedKrw: 1540,
        diffPct: 7.8,
        diffKrw: 112,
        recommendation: '선도 커버리지 90일로 긴급 확대 (Extend forward coverage to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '폴란드/독일 공급 과잉, 유로화 약세, 가스 가격 안정',
        landedKrw: 1350,
        diffPct: -5.5,
        diffKrw: -78,
        recommendation: '선도 버퍼 30일 축소 및 현물 분할 매수 레버리지'
      },
      maxRiskUp: '+₩112/kg (연간 약 +16억원 영향)',
      maxOpportunityDown: '-₩78/kg (연간 약 -11억원 절감)',
      optimalHedge: '60~70% 선도 조달 (리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '1.45', unit: 'M MT', diff: '+2.1% YoY', outlook: '가을 수확 호조' },
      consumption: { value: '640.0', unit: 'k MT', diff: '+1.8% YoY', outlook: '가공 가동률 정상' },
      endingStocks: { value: '112.0', unit: 'k MT', diff: '-1.5% YoY', outlook: '완충 재고 안정' },
      trade: { value: '385.0', unit: 'k MT', diff: '+2.4% YoY', outlook: '아시아 식품 수요 견조' }
    },
    wasdeLedger: [
      { item: '기초 재고 (Beginning Stocks)', final2324: '118.0', estOct: '114.5', reportNov: '115.0', momRevision: '+0.5', yoyChange: '-2.5%' },
      { item: '총 생산량 (Potato Starch Production)', final2324: '628.5', estOct: '635.0', reportNov: '640.0', momRevision: '+5.0', yoyChange: '+1.8%' },
      { item: '역외 수입량 (Total Imports)', final2324: '18.5', estOct: '19.0', reportNov: '19.5', momRevision: '+0.5', yoyChange: '+5.4%' },
      { item: '식품 및 제과용 소비 (Food & Snacks)', final2324: '275.0', estOct: '278.0', reportNov: '280.0', momRevision: '+2.0', yoyChange: '+1.8%' },
      { item: '산업 및 변성전분 가공 (Industrial/Modified)', final2324: '102.5', estOct: '101.5', reportNov: '102.0', momRevision: '+0.5', yoyChange: '-0.5%' },
      { item: '총 수출량 (Exports to Asia/Global)', final2324: '374.0', estOct: '380.0', reportNov: '385.0', momRevision: '+5.0', yoyChange: '+2.9%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '113.5', estOct: '110.0', reportNov: '112.0', momRevision: '+2.0', yoyChange: '-1.3%', isHighlighted: true },
      { item: '재고율 (Stocks-to-Use Ratio, %)', final2324: '15.1%', estOct: '14.5%', reportNov: '14.6%', momRevision: '+0.1%p', yoyChange: '-0.5%p', isHighlighted: true }
    ],
    originsLedger: [
      { region: '네덜란드 (Avebe / Groningen)', production: '245.0', yoy: '+2.5%', isYoyPositive: true, exports: '160.0', endingStocks: '42.0', riskAssessment: '저위험 - 최고 품질 고점도 규격 및 안정적 로테르담 선적', riskLevel: 'Low' },
      { region: '독일 (Emsland Group / Lower Saxony)', production: '210.0', yoy: '+1.8%', isYoyPositive: true, exports: '125.0', endingStocks: '36.0', riskAssessment: '저위험 - 대형 설비 기반 가격 경쟁력 및 규격 안정성', riskLevel: 'Low' },
      { region: '폴란드 (WPPZ / Wielkopolska)', production: '115.0', yoy: '+3.2%', isYoyPositive: true, exports: '58.0', endingStocks: '21.0', riskAssessment: '저위험 - 원가 경쟁력 우수, 발트해 물류 안정', riskLevel: 'Low' },
      { region: '프랑스 (Roquette / Hauts-de-France)', production: '70.0', yoy: '-0.5%', isYoyPositive: false, exports: '42.0', endingStocks: '13.0', riskAssessment: '보통 - 고부가가치 변성전분 가공 집중', riskLevel: 'Medium' }
    ],
    landedCompetitiveness: [
      { origin: '네덜란드 Avebe Superior Potato Starch', grade: '로테르담 FOB, 고점도 표준 원료', regionCategory: 'eu', regionTag: '서유럽', fob: '€850.00/MT', freight: '€95.00/MT', tariff: '0% (TRQ)', cfr: '€945.00/MT', landedKrw: '₩1,403.7 / kg', assessment: '조달 안정성 최상 / 면류 고점도 표준 원료', highlightBadge: '농심표준' },
      { origin: '독일 Emsland Standard Potato Starch', grade: '함부르크 FOB, 제과/면류 표준 규격', regionCategory: 'eu', regionTag: '서유럽', fob: '€840.00/MT', freight: '€92.00/MT', tariff: '0% (TRQ)', cfr: '€932.00/MT', landedKrw: '₩1,384.4 / kg', assessment: '대량 구매 최적 / 가격경쟁력 우수' },
      { origin: '폴란드 WPPZ Food Grade Potato Starch', grade: '그단스크 FOB, 식품 가공용 규격', regionCategory: 'eu', regionTag: '동유럽', fob: '€810.00/MT', freight: '€98.00/MT', tariff: '0% (TRQ)', cfr: '€908.00/MT', landedKrw: '₩1,348.7 / kg', assessment: '최저 FOB 오퍼 / 가성비 우수', highlightBadge: '최저가' },
      { origin: '프랑스 Roquette Premium Potato Starch', grade: '르아브르 FOB, 특수 스낵용 고순도', regionCategory: 'eu', regionTag: '서유럽', fob: '€880.00/MT', freight: '€96.00/MT', tariff: '0% (TRQ)', cfr: '€976.00/MT', landedKrw: '₩1,449.8 / kg', assessment: '최고 순도 규격 / 특수 스낵용' }
    ],
    timelineEvents: [
      { date: 'Nov 18, 2024', region: '네덜란드', source: 'Avebe', title: 'Avebe 2024/25 캠페인 전분 수율 및 품질 리포트 발표', url: 'https://www.avebe.com', summary: '전분가 전년 대비 0.8%p 개선 확인', importance: 'Medium', direction: 'Bearish' },
      { date: 'Nov 22, 2024', region: '독일', source: 'Emsland / VDDS', title: '독일 전분가공협회 2024년 수확기 마감 및 재고량 집계', url: 'https://www.emsland-group.de', summary: '가동률 95% 달성으로 연간 공급 물량 확보', importance: 'Medium', direction: 'Neutral' },
      { date: 'Nov 27, 2024', region: '유럽연합', source: 'Eurostat', title: 'EU 27개국 10월 천연가스 재고율 및 동절기 단가 공시', url: 'https://ec.europa.eu/eurostat', summary: '동절기 난방 수요 확대에 따른 가공비 모니터링', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 30, 2024', region: '글로벌 해운', source: 'Rotterdam / Hapag-Lloyd', title: '유럽-아시아 컨테이너 선사 12월 성수기 할증료(PSS) 개정', url: 'https://www.hapag-lloyd.com', summary: '희망봉 우회 항로 유지 및 추가 요율 적용', importance: 'High', direction: 'Bullish' },
      { date: 'Dec 05, 2024', region: '유럽전분협회', source: 'Starch Europe', title: '유럽 전분 산업 연례 수급 및 변성전분 수요 전망 발표', url: 'https://www.starch.eu', summary: '고점도 전분 수요 견조 확인', importance: 'Low', direction: 'Neutral' }
    ]
  },
  {
    id: 'tapioca-starch',
    path: 'commodity-tapioca-starch',
    nameKo: '타피오카 전분',
    nameEn: 'Tapioca Starch',
    gradeEn: 'Thai FOB Benchmark',
    description: '면류 및 스낵 가공용 동남아산 변성/천연 타피오카 전분',
    category: 'starches',
    categoryNameKo: '당류 및 전분류',
    price: 495.00,
    unit: 'USD/MT',
    priceKrwEstimated: 725.0,
    landedKrwKg: 725,
    changeWoW: 0.40,
    changeMoM: 1.10,
    changeYoY: -8.33,
    cifBusanDesc: '부산 CIF 추정 통관 원가 (기준 환율 USD/KRW 1,388.50 기준)',
    ticker: 'TTSA: FOB BKK / NATIVE',
    exchange: 'Thai FOB',
    sparkline: [492, 493, 491, 494, 493, 495],
    chartData: [
      { date: '2023년 11월', cashPrice: 540.0, ma50: 535.0, landedBaseline: 790 },
      { date: '2024년 1월', cashPrice: 555.0, ma50: 545.0, landedBaseline: 810 },
      { date: '2024년 3월', cashPrice: 530.0, ma50: 540.0, landedBaseline: 775 },
      { date: '2024년 5월', cashPrice: 515.0, ma50: 525.0, landedBaseline: 755 },
      { date: '2024년 7월', cashPrice: 485.0, ma50: 500.0, landedBaseline: 710 },
      { date: '2024년 9월', cashPrice: 490.0, ma50: 488.0, landedBaseline: 718 },
      { date: '2024년 11월 (현재)', cashPrice: 495.00, ma50: 492.0, landedBaseline: 725 }
    ],
    aiConfidence: 92,
    recommendedCoverage: '60~75일 선도 구매',
    aiSynthesis:
      '동남아 카사바 주산지(태국 동북부 코랏, 베트남 떠이닌)의 2024/25년산 수확이 본격 개시되었으나, 동남아 전역의 카사바 모자이크병(CMD) 확산 여파로 뿌리 수확량 회복이 지연되고 있습니다. 중국 알코올 및 사료/식품 가공업체의 수입 오퍼가 견조하여 485~495 USD/MT 밴드에서 하방 경직성을 형성하고 있습니다. 라니냐성 국지성 폭우에 따른 건조장 가동률 변동성을 감안하여 1분기 잔여 소요량에 대해 60~75일 선제 분할 매수를 권고합니다.',
    bullishFactors: ['카사바 모자이크병(CMD) 감염 우려 (+10~15 USD)', '중국 수입 구매 재개 및 오퍼 견조'],
    bearishFactors: ['태국 신곡 수확 출하 본격 확대 (-10~15 USD)', '대체재(옥수수전분) 가격 안정세'],
    monitoringItems: ['중국 항만 타피오카 재고 추이', '태국 공장 가동률 및 건조장 기상'],
    technicalSignals: {
      headline: '지지선 안착 및 반등 시도 (Support Test & Modest Rebound)',
      ma20: 492.0,
      ma20Note: '단기 지지선',
      ma50: 490.5,
      ma50Note: '골든크로스 근접',
      ma200: 515.0,
      ma200Note: '장기 저항선',
      rsi: 52.3,
      rsiStatus: '중립 (Neutral)',
      macd: 1.40,
      macdStatus: '상승 모멘텀 전환',
      bollinger: 'Mid-Band 돌파',
      bollingerStatus: '기술적 반등 유효',
      r2: 518.0,
      r1: 505.0,
      pp: 495.0,
      s1: 488.0,
      s2: 480.0,
      directive: '488~492 USD 지지선 안착 확인 시 1분기 및 2분기 초 농심 튀김 및 면용 소요량 선제 분할 매수 유효.'
    },
    scenarios: {
      base: {
        title: '기본 시나리오 (Base Case)',
        probability: 60,
        drivers: '태국 FOB $495, 환율 1,388원, CMD 통제 및 표준 수확 진척',
        landedKrw: 725,
        diffPct: 0.0,
        recommendation: '표준 60일 버퍼 유지 (Maintain standard 60-day buffer)'
      },
      bull: {
        title: '강세 시나리오 (Bull Case)',
        probability: 25,
        drivers: 'CMD 전국 확산, 중국 수입 폭증, 환율 1,420원 돌파',
        landedKrw: 785,
        diffPct: 8.3,
        diffKrw: 60,
        recommendation: '선도 90일로 긴급 확대 (Extend forward coverage to 90d)'
      },
      bear: {
        title: '약세 시나리오 (Bear Case)',
        probability: 15,
        drivers: '베트남/캄보디아 공급 풍작, 중국 수요 둔화, 해상운임 추가 하락',
        landedKrw: 680,
        diffPct: -6.2,
        diffKrw: -45,
        recommendation: '선도 30일 축소 및 분할 매수 레버리지'
      },
      maxRiskUp: '+₩60/kg (연간 약 +9.5억원 영향)',
      maxOpportunityDown: '-₩45/kg (연간 약 -7.2억원 절감)',
      optimalHedge: '65~75% 선도 조달 (리스크 헤지)'
    },
    wasdeKpis: {
      production: { value: '28.5', unit: 'M MT', diff: '-3.4% YoY', outlook: 'CMD 감염 여파 지속' },
      consumption: { value: '3.85', unit: 'M MT', diff: '-2.1% YoY', outlook: '공장 가동률 84% 수준' },
      endingStocks: { value: '420.0', unit: 'k MT', diff: '-5.2% YoY', outlook: '완충 재고 타이트' },
      trade: { value: '3.10', unit: 'M MT', diff: '+1.5% YoY', outlook: '중국/아시아 수요 견조' }
    },
    wasdeLedger: [
      { item: '기초 재고 (Beginning Stocks)', final2324: '465.0', estOct: '442.0', reportNov: '443.0', momRevision: '+1.0', yoyChange: '-4.7%' },
      { item: '총 생산량 (Native & Modified Starch)', final2324: '3,932.0', estOct: '3,820.0', reportNov: '3,850.0', momRevision: '+30.0', yoyChange: '-2.1%' },
      { item: '국경 원료 수입 (Cassava Roots)', final2324: '110.0', estOct: '115.0', reportNov: '118.0', momRevision: '+3.0', yoyChange: '+7.3%' },
      { item: '태국 국내 소비 (Food, MSG, Sweeteners)', final2324: '880.0', estOct: '890.0', reportNov: '895.0', momRevision: '+5.0', yoyChange: '+1.7%' },
      { item: '산업용/바이오에탄올 소비', final2324: '184.0', estOct: '195.0', reportNov: '196.0', momRevision: '+1.0', yoyChange: '+6.5%' },
      { item: '총 수출량 (Exports to Asia)', final2324: '3,000.0', estOct: '3,080.0', reportNov: '3,100.0', momRevision: '+20.0', yoyChange: '+3.3%' },
      { item: '기말 재고 (Ending Stocks)', final2324: '443.0', estOct: '412.0', reportNov: '420.0', momRevision: '+8.0', yoyChange: '-5.2%', isHighlighted: true },
      { item: '재고율 (Stocks-to-Use Ratio, %)', final2324: '10.9%', estOct: '10.5%', reportNov: '10.8%', momRevision: '+0.3%p', yoyChange: '-0.1%p', isHighlighted: true }
    ],
    originsLedger: [
      { region: '태국 (Nakhon Ratchasima / Chonburi)', production: '3850.0', yoy: '-2.1%', isYoyPositive: false, exports: '2990.0', endingStocks: '420.0', riskAssessment: '저위험 - 세계 최대 수출국, 농심 고품질 식품용 규격 보유', riskLevel: 'Low' },
      { region: '베트남 (Tay Ninh / Binh Phuoc)', production: '1150.0', yoy: '+1.8%', isYoyPositive: true, exports: '850.0', endingStocks: '110.0', riskAssessment: '저위험 - 중국 국경 교역 및 호치민 선적, 가격경쟁력 우수', riskLevel: 'Low' },
      { region: '캄보디아 (Battambang / Kratie)', production: '480.0', yoy: '+4.5%', isYoyPositive: true, exports: '310.0', endingStocks: '35.0', riskAssessment: '보통 - 국경 원료 카사바 수출 위주', riskLevel: 'Medium' },
      { region: '인도네시아 (Lampung / Java)', production: '320.0', yoy: '-0.5%', isYoyPositive: false, exports: '85.0', endingStocks: '28.0', riskAssessment: '보통 - 내수 스낵/식품 가공 수요 우선 배정', riskLevel: 'Medium' }
    ],
    landedCompetitiveness: [
      { origin: '태국 코랏 Premium Food Grade (TTSA Standard)', grade: '방콕 FOB, 면발 탄력성 강화용 고순도', regionCategory: 'all', regionTag: '태국', fob: '$495.00/MT', freight: '$22.00/MT', tariff: '0% (AKFTA)', cfr: '$517.00/MT', landedKrw: '₩725.0 / kg', assessment: '조달 안정성 최상 / 면류 및 스낵용 표준 원료', highlightBadge: '농심표준' },
      { origin: '태국 람차방 Native Super Grade', grade: '람차방 FOB, 스낵 및 제과용 표준 규격', regionCategory: 'all', regionTag: '태국', fob: '$488.00/MT', freight: '$20.00/MT', tariff: '0% (AKFTA)', cfr: '$508.00/MT', landedKrw: '₩712.4 / kg', assessment: '대량 구매 최적 / 가성비 우수' },
      { origin: '베트남 떠이닌 First Grade Native Starch', grade: '호치민 FOB, 식품 가공용 규격', regionCategory: 'all', regionTag: '베트남', fob: '$478.00/MT', freight: '$24.00/MT', tariff: '0% (VKFTA)', cfr: '$502.00/MT', landedKrw: '₩704.0 / kg', assessment: '최저 FOB 오퍼 / 점도 균일도 사전 검수 필요', highlightBadge: '최저가' },
      { origin: '태국 변성 타피오카 (Modified Distarch Adipate)', grade: '방콕 FOB, 고내열/고점도 냉동면/라면 전용', regionCategory: 'all', regionTag: '태국', fob: '$640.00/MT', freight: '$22.00/MT', tariff: '0% (AKFTA)', cfr: '$662.00/MT', landedKrw: '₩928.3 / kg', assessment: '프리미엄 냉동면/고점도 라면 전용 규격' }
    ],
    timelineEvents: [
      { date: 'Nov 18, 2024', region: '태국', source: 'TTSA', title: '태국타피오카협회(TTSA) 2024/25 수확기 1차 수율 및 출하 동향 발표', url: 'https://www.ttsa.or.th', summary: '전분 함량(28%) 소폭 감소 및 수매가 지지', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 22, 2024', region: '태국 농무부', source: 'OAE', title: '동북부 산지 카사바 모자이크병(CMD) 방제 대책 및 작황 실사 공시', url: 'https://www.oae.go.th', summary: '감염 묘목 제거 및 저항성 품종 보급 지원', importance: 'High', direction: 'Bullish' },
      { date: 'Nov 27, 2024', region: '중국', source: '해관총서', title: '중국 해관총서 10월 건카사바 및 타피오카 전분 수입 통계 발표', url: 'https://www.customs.gov.cn', summary: '중국 내 타피오카 수입 전월비 4.2% 증가', importance: 'Medium', direction: 'Bullish' },
      { date: 'Nov 30, 2024', region: '베트남', source: 'VCA', title: '베트남 카사바협회 중남부 가공공장 가동률 및 건조장 리포트', url: 'https://www.vietnamcassava.com', summary: '우기 종료 후 건조 상태 양호', importance: 'Medium', direction: 'Neutral' },
      { date: 'Dec 05, 2024', region: '글로벌 포럼', source: 'Starch Asia Forum', title: '글로벌 전분 포럼 아시아 대체 전분(옥수수 vs 타피오카) 가격 세미나', url: 'https://www.starchasia.org', summary: '옥수수전분 대체 스프레드 한계 논의', importance: 'Low', direction: 'Neutral' }
    ]
  }
];

export const MACRO_DRIVERS: MacroDriver[] = [
  {
    id: 'fx',
    anchorId: 'driver-fx',
    title: '환율 (USD / KRW 외)',
    icon: 'currency_exchange',
    change: '+0.33%',
    isPositiveCostImpact: false,
    primaryValue: '1,348.5 ₩',
    secondaryValue: 'EUR 1,556.2₩',
    badgeText: '원가상승 요인',
    badgeType: 'red',
    note: '주요 외환 리스크',
    url: 'https://www.google.com/finance/quote/USD-KRW'
  },
  {
    id: 'energy',
    anchorId: 'driver-energy',
    title: '유가/에너지 (BRENT)',
    icon: 'local_gas_station',
    change: '-1.15%',
    isPositiveCostImpact: true,
    primaryValue: '$74.20 /bbl',
    secondaryValue: 'TTF €39.8/MWh',
    badgeText: '우호적 (Favorable)',
    badgeType: 'green',
    note: '가공 연료비 완화',
    url: 'https://finance.yahoo.com/quote/BZ=F/'
  },
  {
    id: 'freight',
    anchorId: 'driver-freight',
    title: '해상운임 (SCFI · BDI)',
    icon: 'directions_boat',
    change: '-3.40%',
    isPositiveCostImpact: true,
    primaryValue: '2,165.8 pts',
    secondaryValue: 'BDI 1,580 pts',
    badgeText: '운임 하향 안정',
    badgeType: 'green',
    note: '로테르담-부산 구간',
    url: 'https://tradingeconomics.com/commodity/baltic'
  },
  {
    id: 'policy',
    anchorId: 'driver-policy',
    title: '통상 정책 · 수출 쿼터',
    icon: 'shield',
    change: '1,100만T',
    isPositiveCostImpact: false,
    primaryValue: '러 곡물쿼터 축소',
    secondaryValue: '인니 B40 의무화',
    badgeText: '수출 통제 심화',
    badgeType: 'red',
    note: '흑해 통상 규제',
    url: 'https://www.foodsecurityportal.org/tools/COVID-19-food-trade-policy-tracker'
  }
];

export const MARKET_ISSUES: MarketIssue[] = [
  {
    id: 'iss-1',
    title: '러시아 흑해 곡물 수출 쿼터 1,100만 톤으로 축소',
    date: '11월 14일',
    risk: 'High',
    direction: 'Bullish',
    source: '로이터 (Reuters)',
    url: 'https://www.reuters.com/markets/commodities/russia-export-quota'
  },
  {
    id: 'iss-2',
    title: '미국 캔자스주 동계소맥 D2-D3 가뭄 수분 부족 지속',
    date: '11월 12일',
    risk: 'High',
    direction: 'Bullish',
    source: 'USDA FAS',
    url: 'https://www.usda.gov/oce/commodity/wasde'
  },
  {
    id: 'iss-3',
    title: '홍해 사태 장기화로 유럽산 감자 전분 통행 할증료 부과',
    date: '11월 10일',
    risk: 'Med',
    direction: 'Bullish',
    source: 'S&P 플래츠',
    url: 'https://www.spglobal.com/commodityinsights/en/market-insights/latest-news/shipping'
  },
  {
    id: 'iss-4',
    title: '인도네시아 팜유 바이오디젤 B40 의무화 시행 가속',
    date: '11월 08일',
    risk: 'Med',
    direction: 'Bullish',
    source: '레피니티브 (Refinitiv)',
    url: 'https://www.refinitiv.com/en/commodities'
  },
  {
    id: 'iss-5',
    title: '유럽 질소비료 공장 가동률 회복세로 원가부담 완화',
    date: '11월 05일',
    risk: 'Low',
    direction: 'Bearish',
    source: 'ICIS Agri',
    url: 'https://www.icis.com/explore/resources/fertilizers/'
  }
];
