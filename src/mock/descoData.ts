import { DescoDashboardData } from "../types";

export const MOCK_DESCO_DATA: DescoDashboardData = {
  customer: {
    name: "MD. ZAKARIA HABIB KHAN",
    accountNo: "13130431",
    meterNo: "661120146954",
    address: "H/F#45, RD#31, BL#D, SEC#12, PALLABI MIRPUR DHAKA.",
    tariff: "Category-A: Residential",
    snd: "Pallabi",
    installationDate: "2019-12-11 00:00:00",
    sanctionedLoad: 2,
    balance: 1065.37,
    readingTime: "16 May 2026 00:00",
    lastRechargeAmount: 2000.0,
    lastRechargeTime: "03 May 2026 21:04",
    usedThisMonthUnit: 144.45,
    usedThisMonthTaka: 894.47,
    maxLoadLastMonth: 1.62,
    rechargedThisYear: 8200.0,
    status: 'Active'
  },
  rechargeHistory: [
    { sl: 1, orderNo: "177800867550756", meterNo: "661120146954", date: "2026-05-03", totalAmount: 2000.0, energyAmount: 1790.04, vat: 95.24, rebate: -9.28, demandCharge: 84, meterRent: 40 },
    { sl: 2, orderNo: "177660231148238", meterNo: "661120146954", date: "2026-04-17", totalAmount: 1400.0, energyAmount: 1339.96, vat: 66.67, rebate: -6.63, demandCharge: 0, meterRent: 0 },
    { sl: 3, orderNo: "177538089586527", meterNo: "661120146954", date: "2026-04-03", totalAmount: 1000.0, energyAmount: 832.92, vat: 47.62, rebate: -4.54, demandCharge: 84, meterRent: 40 },
    { sl: 4, orderNo: "177289882954479", meterNo: "661120146954", date: "2026-03-05", totalAmount: 2000.0, energyAmount: 1790.04, vat: 95.24, rebate: -9.28, demandCharge: 84, meterRent: 40 },
    { sl: 5, orderNo: "177142594525929", meterNo: "661120146954", date: "2026-02-16", totalAmount: 900.0, energyAmount: 737.21, vat: 42.86, rebate: -4.07, demandCharge: 84, meterRent: 40 },
    { sl: 6, orderNo: "176876097571312", meterNo: "661120146954", date: "2026-01-16", totalAmount: 900.0, energyAmount: 737.21, vat: 42.86, rebate: -4.07, demandCharge: 84, meterRent: 40 },
    { sl: 7, orderNo: "176647061773434", meterNo: "661120146954", date: "2025-12-21", totalAmount: 1000.0, energyAmount: 832.92, vat: 47.62, rebate: -4.54, demandCharge: 84, meterRent: 40 },
    { sl: 8, orderNo: "176366269626266", meterNo: "661120146954", date: "2025-11-18", totalAmount: 1000.0, energyAmount: 957.12, vat: 47.62, rebate: -4.74, demandCharge: 0, meterRent: 0 },
    { sl: 9, orderNo: "176218821704671", meterNo: "661120146954", date: "2025-11-01", totalAmount: 1000.0, energyAmount: 832.92, vat: 47.62, rebate: -4.54, demandCharge: 84, meterRent: 40 }
  ],
  consumptionHistory: [
    { month: "Apr 2026", consumedTaka: 2239.00, consumedUnit: 323.13, prevYearMonth: "Apr 2025", prevYearTaka: 2162.57, prevYearUnit: 313.60 },
    { month: "Mar 2026", consumedTaka: 1966.67, consumedUnit: 288.56, prevYearMonth: "Mar 2025", prevYearTaka: 1942.84, prevYearUnit: 285.42 },
    { month: "Feb 2026", consumedTaka: 1039.19, consumedUnit: 164.54, prevYearMonth: "Feb 2025", prevYearTaka: 992.53, prevYearUnit: 158.06 },
    { month: "Jan 2026", consumedTaka: 747.66, consumedUnit: 124.04, prevYearMonth: "Jan 2025", prevYearTaka: 868.05, prevYearUnit: 140.77 },
    { month: "Dec 2025", consumedTaka: 794.89, consumedUnit: 130.62, prevYearMonth: "Dec 2024", prevYearTaka: 879.99, prevYearUnit: 142.44 },
    { month: "Nov 2025", consumedTaka: 1189.16, consumedUnit: 185.37, prevYearMonth: "Nov 2024", prevYearTaka: 1335.64, prevYearUnit: 205.42 },
    { month: "Oct 2025", consumedTaka: 2236.12, consumedUnit: 322.77, prevYearMonth: "Oct 2024", prevYearTaka: 2003.03, prevYearUnit: 293.34 },
    { month: "Sep 2025", consumedTaka: 2175.00, consumedUnit: 315.15, prevYearMonth: "Sep 2024", prevYearTaka: 2140.75, prevYearUnit: 310.88 },
    { month: "Aug 2025", consumedTaka: 2306.69, consumedUnit: 331.57, prevYearMonth: "Aug 2024", prevYearTaka: 2303.81, prevYearUnit: 331.22 },
    { month: "Jul 2025", consumedTaka: 2289.29, consumedUnit: 329.40, prevYearMonth: "Jul 2024", prevYearTaka: 2516.89, prevYearUnit: 357.77 },
    { month: "Jun 2025", consumedTaka: 2305.01, consumedUnit: 331.36, prevYearMonth: "Jun 2024", prevYearTaka: 2199.79, prevYearUnit: 318.24 },
    { month: "May 2025", consumedTaka: 2447.12, consumedUnit: 349.08, prevYearMonth: "May 2024", prevYearTaka: 1950.73, prevYearUnit: 286.46 }
  ],
  maxDemandHistory: [
    { month: "Apr 2026", demandKw: 1.62 },
    { month: "Mar 2026", demandKw: 1.45 },
    { month: "Feb 2026", demandKw: 1.20 },
    { month: "Jan 2026", demandKw: 1.15 },
    { month: "Dec 2025", demandKw: 1.10 },
    { month: "Nov 2025", demandKw: 1.30 },
    { month: "Oct 2025", demandKw: 1.55 },
    { month: "Sep 2025", demandKw: 1.60 },
    { month: "Aug 2025", demandKw: 1.62 },
    { month: "Jul 2025", demandKw: 1.61 },
    { month: "Jun 2025", demandKw: 1.58 },
    { month: "May 2025", demandKw: 1.50 }
  ]
};
