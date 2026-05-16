import { useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Battery, 
  MapPin, 
  Zap, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  ChevronRight,
  Info
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from "recharts";
import { useDashboardStore } from "../store/useDashboardStore";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const { data, theme } = useDashboardStore();
  const [chartUnit, setChartUnit] = useState<'kWh' | 'Taka'>('kWh');
  const customer = data?.customer;

  if (!customer) return null;

  const isLowBalance = customer.balance < 500;
  const isCritical = customer.balance < 100;

  const chartData = data?.consumptionHistory.slice(0, 12).reverse().map(c => ({
    name: c.month.split(' ')[0],
    usage: c.consumedUnit,
    cost: c.consumedTaka,
    prevUsage: c.prevYearUnit,
    prevCost: c.prevYearTaka
  }));

  const demandData = data?.maxDemandHistory.slice(0, 12).reverse().map(d => ({
    name: d.month.split(' ')[0],
    demand: d.demandKw
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Row 1: Balance + Meter Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Hero Card */}
        <motion.div 
          variants={itemVariants}
          className={cn(
            "lg:col-span-2 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl transition-all duration-500 group overflow-hidden",
            isCritical ? "bg-red-600" : isLowBalance ? "bg-amber-500 text-slate-900" : "bg-blue-600"
          )}
        >
          {/* Animated Background Decor */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[120px] -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm font-semibold mb-1 uppercase tracking-widest">Prepaid Balance</p>
                <motion.h2 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-6xl md:text-7xl font-bold tracking-tighter"
                >
                  ৳{customer.balance.toLocaleString()}
                </motion.h2>
                <div className="flex items-center gap-2 mt-4">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase",
                    theme === 'dark' ? "bg-white/20 text-white" : "bg-black/10 text-black/70"
                  )}>
                    {customer.status}
                  </div>
                  <p className="text-xs text-white/60 italic">Updated: {customer.readingTime}</p>
                </div>
              </div>
              <button className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform hover:scale-110",
                theme === 'dark' ? "bg-white/20" : "bg-black/10"
              )}>
                <ArrowUpRight size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 text-white">
              <StatItem label="Last Recharge" value={`৳${customer.lastRechargeAmount}`} light={!isLowBalance} />
              <StatItem label="Estimated" value="12 Days" light={!isLowBalance} />
              <StatItem label="Used this Month" value={`${customer.usedThisMonthUnit} kWh`} light={!isLowBalance} />
              <StatItem label="Current Meter" value={customer.meterNo} light={!isLowBalance} />
            </div>
          </div>
        </motion.div>

        {/* Meter Info Card */}
        <motion.div variants={itemVariants} className={cn(
          "rounded-[2.5rem] p-8 border flex flex-col justify-center",
          theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200"
        )}>
           <h4 className="font-bold mb-6 flex items-center gap-2 text-lg">
             <Zap size={22} className="text-blue-500" />
             Meter Details
           </h4>
           <div className="space-y-6">
              <DetailRow label="Account Name" value={customer.name} theme={theme} />
              <DetailRow label="Tariff" value={customer.tariff} theme={theme} />
              <DetailRow label="Load" value={`${customer.sanctionedLoad} kW`} theme={theme} />
              <DetailRow label="S&D" value={customer.snd} theme={theme} />
              <DetailRow label="Installed" value="Dec 2019" theme={theme} />
           </div>
        </motion.div>
      </div>

      {/* Row 2: Smart Insights + Instant Recharge side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className={cn(
          "p-8 rounded-[2rem] border transition-colors flex flex-col justify-center",
          theme === 'dark' ? "bg-[#111111] border-white/5" : "bg-white border-slate-200 shadow-sm"
        )}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <AlertCircle className="text-emerald-500" size={20} />
            </div>
            <h3 className="font-bold text-lg">Smart Insights</h3>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
             Your energy usage is 12% lower than last month. You're on track to save approximately ৳340 this billing cycle.
          </p>
          <button className="text-sm font-bold text-blue-500 flex items-center gap-1 group">
             View Efficiency Tips <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ActionCard 
            title="Instant Recharge" 
            desc="Pay with Bkash/Nagad/Cards" 
            primary 
            theme={theme}
          />
        </motion.div>
      </div>

      {/* Row 3: Consumption Analytics (Full Width) */}
      <motion.div variants={itemVariants} className={cn(
        "w-full rounded-[2.5rem] p-8 transition-colors",
        theme === 'dark' ? "bg-[#0A0A0A] border border-white/5" : "bg-white border border-slate-200 shadow-sm"
      )}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
           <div>
              <h3 className="text-2xl font-bold tracking-tight">Consumption Analytics</h3>
              <p className="text-sm text-slate-500">Historical usage trends and comparative analysis</p>
           </div>
           <div className={cn(
             "p-2 rounded-xl flex gap-1 self-start",
             theme === 'dark' ? "bg-white/5" : "bg-slate-100"
           )}>
              <button 
                onClick={() => setChartUnit('kWh')}
                className={cn(
                  "px-6 py-2 rounded-lg text-xs font-bold transition-all",
                  chartUnit === 'kWh' ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                )}
              >
                kWh
              </button>
              <button 
                onClick={() => setChartUnit('Taka')}
                className={cn(
                  "px-6 py-2 rounded-lg text-xs font-bold transition-all",
                  chartUnit === 'Taka' ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                )}
              >
                Taka
              </button>
           </div>
        </div>

        <div className="h-[450px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                   <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#ffffff05" : "#00000005"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: theme === 'dark' ? '#ffffff50' : '#0f172a', fontSize: 12, fontWeight: 500}} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: theme === 'dark' ? '#ffffff50' : '#0f172a', fontSize: 12, fontWeight: 500}} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#111111' : '#fff', 
                    border: 'none', 
                    borderRadius: '24px',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
                  }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Legend verticalAlign="top" align="right" height={40}/>
                <Area 
                  name={chartUnit === 'kWh' ? "Current Usage (kWh)" : "Current Cost (৳)"}
                  type="monotone" 
                  dataKey={chartUnit === 'kWh' ? "usage" : "cost"} 
                  stroke="#2563eb" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorUsage)" 
                  animationDuration={2000}
                />
                <Area 
                  name={chartUnit === 'kWh' ? "Previous Year (kWh)" : "Previous Year (৳)"}
                  type="monotone" 
                  dataKey={chartUnit === 'kWh' ? "prevUsage" : "prevCost"} 
                  stroke="#94a3b8" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fill="transparent" 
                  animationDuration={2500}
                />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Row 4: Max Demand (Always After Consumption, Full Width) */}
      <motion.div variants={itemVariants} className={cn(
        "w-full rounded-[2.5rem] p-8 transition-colors",
        theme === 'dark' ? "bg-[#0A0A0A] border border-white/5" : "bg-white border border-slate-200 shadow-sm"
      )}>
        <div className="flex items-center gap-3 mb-10">
           <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <TrendingUp className="text-red-500" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold tracking-tight">Monthly Maximum Demand</h3>
              <p className="text-sm text-slate-500">Peak load (kW) recorded over the last 12 months</p>
           </div>
        </div>

        <div className="h-[400px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#ffffff05" : "#00000005"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fill: theme === 'dark' ? '#ffffff50' : '#0f172a', fontSize: 12, fontWeight: 500}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fill: theme === 'dark' ? '#ffffff50' : '#0f172a', fontSize: 12, fontWeight: 500}}
                />
                <Tooltip 
                  cursor={{fill: theme === 'dark' ? '#ffffff05' : '#00000005'}}
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#111' : '#fff', 
                    border: 'none', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Bar name="Demand (kW)" dataKey="demand" radius={[8, 8, 8, 8]} barSize={40}>
                  {demandData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === demandData.length - 1 ? '#ef4444' : '#3b82f630'} />
                  ))}
                </Bar>
              </BarChart>
           </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Row 5: Recent Recharge */}
      <motion.div variants={itemVariants} className={cn(
        "rounded-[2.5rem] p-8 border",
        theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200"
      )}>
         <h4 className="text-xl font-bold mb-8 flex items-center justify-between">
           Recent Transaction Activity
           <button className="text-sm text-blue-500 hover:underline">View All History</button>
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.rechargeHistory.slice(0, 3).map((r, i) => (
              <div key={r.orderNo} className={cn(
                "flex items-center justify-between p-6 rounded-2xl border",
                theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
              )}>
                 <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                      theme === 'dark' ? "bg-blue-500/10 text-blue-500" : "bg-blue-100 text-blue-600"
                    )}>
                       {i + 1}
                    </div>
                    <div>
                       <p className="text-base font-bold">৳{r.totalAmount.toLocaleString()}</p>
                       <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">{r.date}</p>
                    </div>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">SUCCESS</div>
                    <p className="text-[10px] font-mono text-slate-500">ID: {r.orderNo.slice(-6)}</p>
                 </div>
              </div>
            ))}
         </div>
      </motion.div>
    </motion.div>
  );
}

function StatItem({ label, value, light }: { label: string, value: string, light: boolean }) {
  return (
    <div>
      <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", light ? "text-white/60" : "text-black/40")}>{label}</p>
      <p className="text-xl font-bold truncate">{value}</p>
    </div>
  );
}

function DetailRow({ label, value, theme }: { label: string, value: string, theme: string }) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-xs text-slate-500 font-medium">{label}</span>
       <span className={cn("text-xs font-bold", theme === 'dark' ? "text-slate-300" : "text-slate-800")}>{value}</span>
    </div>
  );
}

function ActionCard({ title, desc, primary, theme }: { title: string, desc: string, primary?: boolean, theme: string }) {
  return (
    <button className={cn(
      "w-full p-8 rounded-[2rem] text-left transition-all hover:-translate-y-1 group relative overflow-hidden shadow-lg shadow-blue-500/10",
      primary 
        ? "bg-slate-900 text-white" 
        : theme === 'dark' ? "bg-[#111111] text-white border border-white/5" : "bg-white text-slate-900 border border-slate-200"
    )}>
       <h3 className="text-lg font-bold mb-1">{title}</h3>
       <p className="text-xs text-slate-500">{desc}</p>
       <div className={cn(
         "w-12 h-12 rounded-2xl flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2 transition-transform group-hover:scale-110",
         primary ? "bg-white/10" : "bg-blue-600 text-white"
       )}>
          <ChevronRight />
       </div>
    </button>
  );
}
