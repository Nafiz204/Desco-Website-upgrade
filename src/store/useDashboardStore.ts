import { create } from 'zustand';
import { DescoDashboardData } from '../types';
import { MOCK_DESCO_DATA } from '../mock/descoData';

interface DashboardState {
  data: DescoDashboardData | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  theme: 'light' | 'dark';
  setData: (data: DescoDashboardData) => void;
  setLoading: (loading: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  toggleTheme: () => void;
  logout: () => void;
  login: (accountNo: string, meterNo?: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: MOCK_DESCO_DATA,
  isLoading: false,
  isLoggedIn: true,
  theme: 'dark',
  setData: (data) => set({ data }),
  setLoading: (isLoading) => set({ isLoading }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  logout: () => set({ data: null, isLoggedIn: false }),
  login: async (accountNo, meterNo) => {
    set({ isLoading: true });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app we'd fetch here. For now, we use mock if the account matches or generic mock.
    if (accountNo === '13130431' || accountNo === 'demo') {
      set({ data: MOCK_DESCO_DATA, isLoggedIn: true });
    } else {
        // Just use mock for any entry during this phase for better UX
        set({ data: MOCK_DESCO_DATA, isLoggedIn: true });
    }
    set({ isLoading: false });
  }
}));
