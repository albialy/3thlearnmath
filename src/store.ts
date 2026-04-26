import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Tab = 'home' | 'journey' | 'quiz' | 'tricks' | 'fact-family';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const AVAILABLE_BADGES: Badge[] = [
  { id: 'first_quiz', name: 'بطل التحدي الأول', icon: '🎯', description: 'أكملت أول تحدي بنجاح!' },
  { id: 'math_wizard', name: 'ساحر الرياضيات', icon: '🧙‍♂️', description: 'حصلت على 100 نقطة!' },
  { id: 'explorer', name: 'المستكشف', icon: '🧭', description: 'زرت جميع الأقسام!' },
];

interface AppState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  
  accentColor: string;
  setAccentColor: (color: string) => void;
  
  points: number;
  addPoints: (points: number) => void;

  highScore: number;
  updateHighScore: (score: number) => void;
  
  badges: string[];
  addBadge: (badgeId: string) => void;
  
  visitedTabs: string[];
  markTabVisited: (tab: Tab) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeTab: 'home',
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      accentColor: 'orange',
      setAccentColor: (color) => set({ accentColor: color }),
      
      points: 0,
      addPoints: (amount) => set((state) => ({ points: Math.max(0, state.points + amount) })),

      highScore: 0,
      updateHighScore: (score) => set((state) => ({ highScore: Math.max(state.highScore, score) })),
      
      badges: [],
      addBadge: (badgeId) => set((state) => ({
        badges: state.badges.includes(badgeId) ? state.badges : [...state.badges, badgeId]
      })),
      
      visitedTabs: [],
      markTabVisited: (tab) => set((state) => {
        const newVisited = state.visitedTabs.includes(tab) ? state.visitedTabs : [...state.visitedTabs, tab];
        
        // Automatic badge earning for visiting all tabs
        const allMainTabs: Tab[] = ['home', 'journey', 'quiz', 'tricks', 'fact-family'];
        const hasAllTabs = allMainTabs.every(t => newVisited.includes(t));
        
        // Check if we also need to add the explorer badge
        if (hasAllTabs && !state.badges.includes('explorer')) {
            return { visitedTabs: newVisited, badges: [...state.badges, 'explorer'] };
        }
        
        return { visitedTabs: newVisited };
      }),
    }),
    {
      name: 'math-lab-storage',
    }
  )
);

