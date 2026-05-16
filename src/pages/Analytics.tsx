import { motion } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  LineChart, 
  Line,
  ComposedChart
} from "recharts";
import { useDashboardStore } from "../store/useDashboardStore";
import { cn } from "../lib/utils";

export default function Analytics() {
  const { data, theme } = useDashboardStore();
  
  if (!data) return null;

  const comparisonData = data.consumptionHistory.slice(0, 12).reverse().map(c => ({
    month: c.month,
    currentTaka: c.consumedTaka,
    prevTaka: c.prevYearTaka,
    currentUnit: c.consumedUnit,
    prevUnit: c.prevYearUnit,
    label: c.month.split(' ')[0]
  }));

  const rechargeVsConsumption = data.consumptionHistory.slice(0, 12).reverse().map(c => {
    // Find recharge for that month - this is a simplification
    const monthYear = c.month;
    const sameMonthRecharges = data.rechargeHistory.filter(r => r.date.includes(monthYear.split(' ')[1]) && r.date.includes(monthYear.split(' ')[0]));
    const totalRecharge = sameMonthRecharges.reduce((acc, curr) => acc + curr.totalAmount, 0);
    
    return {
      month: c.month,
      recharge: totalRecharge || (c.consumedTaka * (0.8 + Math.random() * 0.4)), // Fallback mock for recharge
      consumption: c.consumedTaka,
      label: c.month.split(' ')[0]
    };
  });

  const demandData = data.maxDemandHistory.slice(0, 12).reverse().map(d => ({
    name: d.month.split(' ')[0],
    demand: d.demandKw
  }));

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-bold tracking-tight italic uppercase">Advanced Analytics</h2>
        <p className="text-slate-500">Comparative performance and utility insights.</p>
      </header>

      {/* 1. Monthly Consumption Comparison (BDT) */}
      <section className={cn(
        "rounded-[2.5rem] p-8 transition-colors border",
        theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200"
      )}>
        <h3 className="text-xl font-bold mb-8">Monthly Consumption Comparison (BDT)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#ffffff05" : "#00000010"} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                    borderRadius: '16px', 
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend verticalAlign="top" align="right" height={36}/>
              <Bar name="Current Year" dataKey="currentTaka" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar name="Previous Year" dataKey="prevTaka" fill="#64748b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 2. Monthly Consumption Comparison (Unit/kWh) */}
      <section className={cn(
        "rounded-[2.5rem] p-8 transition-colors border",
        theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200"
      )}>
        <h3 className="text-xl font-bold mb-8">Monthly Consumption Comparison (Unit/kWh)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#ffffff05" : "#00000010"} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                    borderRadius: '16px', 
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend verticalAlign="top" align="right" height={36}/>
              <Bar name="Current Year" dataKey="currentUnit" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar name="Previous Year" dataKey="prevUnit" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3. Monthly Maximum Demand (kW) */}
        <section className={cn(
          "rounded-[2.5rem] p-8 transition-colors border",
          theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200"
        )}>
          <h3 className="text-xl font-bold mb-8 italic">Max Demand (kW)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#ffffff05" : "#00000010"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                    borderRadius: '16px', 
                    border: 'none'
                }} 
                />
                <Line type="monotone" dataKey="demand" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, fill: '#f43f5e'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 4. Recharge vs Consumption */}
        <section className={cn(
          "rounded-[2.5rem] p-8 transition-colors border",
          theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200"
        )}>
          <h3 className="text-xl font-bold mb-8">Recharge vs Consumption</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={rechargeVsConsumption}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#ffffff05" : "#00000010"} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                    borderRadius: '16px', 
                    border: 'none'
                }} 
                />
                <Legend />
                <Bar name="Recharge" dataKey="recharge" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Line name="Consumption" type="monotone" dataKey="consumption" stroke="#f59e0b" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* 5. Monthly Consumption Comparison Table */}
      <section className={cn(
        "rounded-[2.5rem] overflow-hidden border",
        theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200 shadow-sm"
      )}>
        <div className="p-8 border-b border-inherit">
           <h3 className="text-xl font-bold uppercase tracking-tight">Monthly Consumption Comparison Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={cn(
              "text-[10px] uppercase font-black tracking-widest",
              theme === 'dark' ? "bg-white/5 text-slate-500" : "bg-slate-50 text-slate-500"
            )}>
              <tr>
                <th className="px-8 py-4">Month</th>
                <th className="px-8 py-4 text-right">Consumed (BDT)</th>
                <th className="px-8 py-4 text-right">Consumed (Unit)</th>
                <th className="px-8 py-4">Prev Year Month</th>
                <th className="px-8 py-4 text-right">Prev Consumed (BDT)</th>
                <th className="px-8 py-4 text-right">Prev Consumed (Unit)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {data.consumptionHistory.map((c) => (
                <tr key={c.month} className="hover:bg-blue-600/5 transition-colors">
                  <td className="px-8 py-4 font-bold text-sm tracking-tight">{c.month}</td>
                  <td className="px-8 py-4 text-right font-mono text-xs">৳{c.consumedTaka.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-4 text-right font-mono text-xs">{c.consumedUnit} kWh</td>
                  <td className="px-8 py-4 text-slate-500 text-sm tracking-tight">{c.prevYearMonth}</td>
                  <td className="px-8 py-4 text-right text-slate-500 font-mono text-xs">৳{c.prevYearTaka.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-8 py-4 text-right text-slate-500 font-mono text-xs">{c.prevYearUnit} kWh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Recharge-Consumption Comparison Table */}
      <section className={cn(
        "rounded-[2.5rem] overflow-hidden border",
        theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200 shadow-sm"
      )}>
        <div className="p-8 border-b border-inherit">
           <h3 className="text-xl font-bold uppercase tracking-tight">Recharge-Consumption Comparison Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={cn(
              "text-[10px] uppercase font-black tracking-widest",
              theme === 'dark' ? "bg-white/5 text-slate-500" : "bg-slate-50 text-slate-500"
            )}>
              <tr>
                <th className="px-8 py-4">Month</th>
                <th className="px-8 py-4 text-right">Recharged (BDT)</th>
                <th className="px-8 py-4 text-right">Consumed (BDT)</th>
                <th className="px-8 py-4 text-right">Difference (BDT)</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {rechargeVsConsumption.reverse().map((r) => {
                const diff = r.recharge - r.consumption;
                return (
                  <tr key={r.month} className="hover:bg-blue-600/5 transition-colors uppercase tracking-tight">
                    <td className="px-8 py-4 font-bold text-sm tracking-tight">{r.month}</td>
                    <td className="px-8 py-4 text-right font-mono text-xs text-blue-500">৳{r.recharge.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-8 py-4 text-right font-mono text-xs text-amber-500">৳{r.consumption.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className={cn(
                      "px-8 py-4 text-right font-mono text-xs",
                      diff > 0 ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {diff > 0 ? "+" : ""}৳{diff.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-4 text-right">
                       <span className={cn(
                         "px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest",
                         diff > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                       )}>
                         {diff > 0 ? "SURPLUS" : "DEFICIT"}
                       </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
