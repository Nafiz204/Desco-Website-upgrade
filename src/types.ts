export interface RechargeRecord {
  sl: number;
  orderNo: string;
  meterNo: string;
  date: string;
  totalAmount: number;
  energyAmount: number;
  vat: number;
  rebate: number;
  demandCharge: number;
  meterRent: number;
}

export interface ConsumptionRecord {
  month: string;
  consumedTaka: number;
  consumedUnit: number;
  prevYearMonth?: string;
  prevYearTaka?: number;
  prevYearUnit?: number;
}

export interface CustomerInfo {
  name: string;
  accountNo: string;
  meterNo: string;
  address: string;
  tariff: string;
  snd: string;
  installationDate: string;
  sanctionedLoad: number;
  balance: number;
  readingTime: string;
  lastRechargeAmount: number;
  lastRechargeTime: string;
  usedThisMonthUnit: number;
  usedThisMonthTaka: number;
  maxLoadLastMonth: number;
  rechargedThisYear: number;
  status: 'Active' | 'Low' | 'Critical';
}

export interface MaxDemandRecord {
  month: string;
  demandKw: number;
}

export interface DescoDashboardData {
  customer: CustomerInfo;
  rechargeHistory: RechargeRecord[];
  consumptionHistory: ConsumptionRecord[];
  maxDemandHistory: MaxDemandRecord[];
}
