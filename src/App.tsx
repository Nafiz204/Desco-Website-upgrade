import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDashboardStore } from "./store/useDashboardStore";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function History() {
  const { data, theme } = useDashboardStore();
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
        <p className="text-slate-500">Detailed record of your energy recharges.</p>
      </header>

      <div className={`rounded-[2.5rem] overflow-hidden border ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
        <table className="w-full text-left">
          <thead className={theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-500'}>
            <tr className="uppercase text-[10px] font-bold tracking-widest">
              <th className="px-8 py-6">Date</th>
              <th className="px-8 py-6">Order ID</th>
              <th className="px-8 py-6">Energy</th>
              <th className="px-8 py-6">VAT/Fees</th>
              <th className="px-8 py-6 text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-inherit">
            {data?.rechargeHistory.map((r) => (
              <tr key={r.orderNo} className={`transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                <td className="px-8 py-6 font-medium">{r.date}</td>
                <td className="px-8 py-6 text-slate-500 text-xs font-mono">{r.orderNo}</td>
                <td className="px-8 py-6 font-bold">৳{r.energyAmount}</td>
                <td className="px-8 py-6 text-slate-500">৳{r.vat}</td>
                <td className="px-8 py-6 text-right font-black text-blue-500">৳{r.totalAmount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/recharge" element={<div className="p-20 text-center text-slate-500 italic">Secure Payment Portal Loading...</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}
