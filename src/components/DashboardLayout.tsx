import { ReactNode } from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  LayoutDashboard, 
  History, 
  LineChart, 
  CreditCard, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Bell,
  Search
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDashboardStore } from "../store/useDashboardStore";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const { data, logout, theme, toggleTheme } = useDashboardStore();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
    { icon: <LineChart size={20} />, label: "Analytics", path: "/analytics" },
    { icon: <History size={20} />, label: "History", path: "/history" },
    { icon: <CreditCard size={20} />, label: "Recharge", path: "/recharge" },
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      theme === 'dark' ? "bg-[#050505] text-white" : "bg-[#F8FAFC] text-slate-900"
    )}>
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-20 lg:w-64 border-r transition-colors duration-300 z-50",
        theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-slate-200"
      )}>
        <div className="flex items-center gap-3 px-6 h-20 border-b border-inherit">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Zap className="text-white fill-current" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight hidden lg:block uppercase italic">Desco<span className="text-blue-500">.</span></span>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : theme === 'dark' ? "text-slate-500 hover:text-white hover:bg-white/5" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {item.icon}
                <span className="font-medium hidden lg:block">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full hidden lg:block"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 w-full px-4 space-y-2">
          <button 
            onClick={toggleTheme}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200",
              theme === 'dark' ? "text-slate-500 hover:text-white hover:bg-white/5" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium hidden lg:block">Toggle Theme</span>
          </button>
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Header & Main Content */}
      <div className="pl-20 lg:pl-64">
        <header className={cn(
          "h-20 border-b flex items-center justify-between px-8 sticky top-0 backdrop-blur-md z-40 transition-colors duration-300",
          theme === 'dark' ? "border-white/5 bg-[#050505]/70" : "border-slate-200 bg-white/70"
        )}>
          <div className="flex items-center gap-4 max-w-md w-full">
             <div className={cn(
               "relative flex-1 group",
               theme === 'dark' ? "text-white" : "text-slate-900"
             )}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search transactions..."
                  className={cn(
                    "w-full h-11 pl-12 pr-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all",
                    theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-100 border-slate-100"
                  )}
                />
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center relative",
              theme === 'dark' ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-400 hover:text-slate-900"
            )}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-inherit" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-inherit">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold truncate max-w-[150px]">{data?.customer.name}</p>
                <p className="text-[10px] text-slate-500">ACC: {data?.customer.accountNo}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                {data?.customer.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
           >
              {children}
           </motion.div>
        </main>
      </div>
    </div>
  );
}
