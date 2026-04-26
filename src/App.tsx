import React, { useState, useEffect } from 'react';
import { Play, Lightbulb, Triangle, Home as HomeIcon, Palette, BookOpen, Heart, Trophy, Medal, Target } from 'lucide-react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { SmartTricks } from './components/SmartTricks';
import { FactFamily } from './components/FactFamily';
import { LearningJourney } from './components/LearningJourney';
import { ComprehensiveQuiz } from './components/ComprehensiveQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore, AVAILABLE_BADGES, Tab } from './store';

const THEME_COLORS: Record<string, { [key: string]: string }> = {
  orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c' },
  rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c' },
  indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857' },
  teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e' },
  purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce' }
};

export default function App() {
  const { activeTab, setActiveTab, accentColor, setAccentColor, points, badges, markTabVisited } = useAppStore();
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    markTabVisited(activeTab);
  }, [activeTab, markTabVisited]);

  useEffect(() => {
    const theme = THEME_COLORS[accentColor];
    if (theme) {
      const root = document.documentElement;
      Object.keys(theme).forEach(key => {
        root.style.setProperty(`--color-primary-${key}`, theme[key]);
      });
    }
  }, [accentColor]);

  const earnedBadges = AVAILABLE_BADGES.filter(b => badges.includes(b.id));

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 font-cairo bg-slate-50 transition-colors duration-500">
      <header className="max-w-5xl w-full mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Main Title Bento Box */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white px-6 py-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow border-4 border-primary-100 flex items-center gap-4 w-full md:w-auto relative"
        >
          <div className="flex-1">
            <h1 className="text-2xl font-black text-primary-600 truncate">مختبر الأرقام العجيب</h1>
            <p className="text-sm text-slate-500 font-medium">حيث تتحول الرياضيات إلى مغامرة!</p>
          </div>
          
          <div className="flex gap-2">
            {/* Rewards Button */}
            <button 
              onClick={() => setShowBadges(!showBadges)}
              className="px-4 h-14 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center gap-2 font-black transition-all transform hover:scale-105 active:scale-95 border-2 border-amber-200"
              aria-label="النقاط والأوسمة"
            >
              <Trophy size={20} className="text-amber-500" />
              <span className="text-xl">{points}</span>
            </button>

            {/* Theme Picker Button */}
            <button 
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="w-14 h-14 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-full flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 border-2 border-primary-200"
              aria-label="تغيير لون التطبيق"
            >
              <Palette size={24} />
            </button>
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-3xl shrink-0" aria-label="أيقونة المختبر">
              🧪
            </div>
          </div>
          
          {/* Theme Picker Dropdown */}
          <AnimatePresence>
            {showThemePicker && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 bg-white p-3 rounded-2xl shadow-xl flex gap-2 border-2 border-slate-100 z-50"
              >
                {Object.keys(THEME_COLORS).map(color => (
                  <button
                    key={color}
                    onClick={() => { setAccentColor(color); setShowThemePicker(false); }}
                    aria-label={`اختيار اللون ${color}`}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${accentColor === color ? 'scale-110 border-slate-800' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: THEME_COLORS[color][500] }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badges Dropdown */}
          <AnimatePresence>
            {showBadges && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-72 bg-white p-4 rounded-3xl shadow-xl border-2 border-amber-100 z-50"
              >
                <div className="flex items-center gap-2 mb-4">
                   <Medal className="text-amber-500" size={24} />
                   <h3 className="font-black text-slate-800 text-lg">أوسمتك الرائعة</h3>
                </div>
                {earnedBadges.length === 0 ? (
                   <p className="text-sm font-medium text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      لم تحصل على أوسمة بعد. استمر في التعلم وحل التحديات!
                   </p>
                ) : (
                   <div className="flex flex-col gap-3">
                      {earnedBadges.map(badge => (
                         <div key={badge.id} className="flex flex-row items-center gap-3 bg-amber-50 border border-amber-100 p-2 rounded-xl">
                            <span className="text-2xl">{badge.icon}</span>
                            <div>
                               <h4 className="font-bold text-amber-900 text-sm">{badge.name}</h4>
                               <p className="text-xs text-amber-700">{badge.description}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Navigation - Styling as mini bento boxes */}
        <nav className="flex flex-wrap justify-center gap-3">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
            icon={<HomeIcon size={18} />}
            text="الرئيسية"
            color="gray"
          />
          <NavButton 
            active={activeTab === 'journey'} 
            onClick={() => setActiveTab('journey')}
            icon={<BookOpen size={18} />}
            text="رحلة التعلم"
            color="secondary"
          />
          <NavButton 
            active={activeTab === 'quiz'} 
            onClick={() => setActiveTab('quiz')}
            icon={<Play size={18} />}
            text="تحدي"
            color="primary"
          />
           <NavButton 
            active={activeTab === 'fact-family'} 
            onClick={() => setActiveTab('fact-family')}
            icon={<Triangle size={18} />}
            text="مثلث"
            color="success"
          />
          <NavButton 
            active={activeTab === 'tricks'} 
            onClick={() => setActiveTab('tricks')}
            icon={<Lightbulb size={18} />}
            text="حيل"
            color="warning"
          />
          <NavButton 
            active={activeTab === 'mixed-quiz'} 
            onClick={() => setActiveTab('mixed-quiz')}
            icon={<Target size={18} />}
            text="اختبار شامل"
            color="primary"
          />
        </nav>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="flex-1 flex flex-col">
              <Home />
            </motion.div>
          )}
          {activeTab === 'journey' && (
            <motion.div key="journey" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="flex-1 flex flex-col">
              <LearningJourney />
            </motion.div>
          )}
          {activeTab === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="flex-1 flex flex-col">
              <Quiz />
            </motion.div>
          )}
          {activeTab === 'tricks' && (
            <motion.div key="tricks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="flex-1 flex flex-col">
              <SmartTricks />
            </motion.div>
          )}
          {activeTab === 'fact-family' && (
            <motion.div key="family" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="flex-1 flex flex-col">
              <FactFamily />
            </motion.div>
          )}
          {activeTab === 'mixed-quiz' && (
            <motion.div key="mixed-quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="flex-1 flex flex-col">
              <ComprehensiveQuiz />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full max-w-5xl mx-auto mt-8 flex justify-center">
        <div className="bg-white/60 backdrop-blur-sm border-2 border-slate-100 px-6 py-3 rounded-full shadow-sm flex items-center justify-center gap-2 text-slate-500 font-medium text-sm transition-all hover:bg-white hover:shadow-md hover:scale-105 cursor-default">
           صُنع بكل <Heart size={16} className="text-rose-500 fill-rose-500 animate-pulse" aria-label="حب" /> من قِبل الأستاذ: 
           <span className="font-black text-slate-700 mx-1">أحمد البيلي</span>
           لمساندة طلابه الأعزاء
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, text, color }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string, color: 'gray'|'primary'|'success'|'warning'|'secondary' }) {
  
  const colors = {
    gray: 'border-slate-200 text-slate-500 hover:bg-slate-50 data-[active=true]:bg-slate-800 data-[active=true]:text-white data-[active=true]:border-slate-800',
    primary: 'border-primary-200 text-primary-500 hover:bg-primary-50 data-[active=true]:bg-primary-600 data-[active=true]:text-white data-[active=true]:border-primary-600',
    success: 'border-success-200 text-success-500 hover:bg-success-50 data-[active=true]:bg-success-600 data-[active=true]:text-white data-[active=true]:border-success-600',
    warning: 'border-warning-200 text-warning-600 hover:bg-warning-50 data-[active=true]:bg-warning-500 data-[active=true]:text-white data-[active=true]:border-warning-500',
    secondary: 'border-secondary-200 text-secondary-500 hover:bg-secondary-50 data-[active=true]:bg-secondary-600 data-[active=true]:text-white data-[active=true]:border-secondary-600',
  };

  return (
    <button
      onClick={onClick}
      data-active={active}
      aria-label={text}
      className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-white border-2 shadow-sm transition-all whitespace-nowrap active:scale-95 ${colors[color]} ${!active && 'hover:-translate-y-1'}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
