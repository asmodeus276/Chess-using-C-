import React from 'react';
import { ActiveTab } from '../types';
import { Cpu, Download } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onDownloadProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onDownloadProject }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 overflow-x-auto">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/30">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
          ChessCraft C
        </span>
      </div>

      {/* Zone 2: Navigation links */}
      <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('play')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'play' ? 'border-emerald-500 text-white font-semibold' : 'border-transparent'
          }`}
        >
          Play & Test
        </button>
        <button
          onClick={() => setActiveTab('datastructures')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'datastructures' ? 'border-emerald-500 text-white font-semibold' : 'border-transparent'
          }`}
        >
          Data Structures
        </button>
        <button
          onClick={() => setActiveTab('memory')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'memory' ? 'border-emerald-500 text-white font-semibold' : 'border-transparent'
          }`}
        >
          Memory Calculator
        </button>
        <button
          onClick={() => setActiveTab('complexity')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'complexity' ? 'border-emerald-500 text-white font-semibold' : 'border-transparent'
          }`}
        >
          Algorithm Complexity
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'code' ? 'border-emerald-500 text-white font-semibold' : 'border-transparent'
          }`}
        >
          C Source Code
        </button>
        <button
          onClick={() => setActiveTab('teacherguide')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
            activeTab === 'teacherguide' ? 'border-emerald-500 text-white font-semibold' : 'border-transparent'
          }`}
        >
          Teacher Viva Guide
        </button>
      </nav>

      {/* Mobile/Compact Nav Dropdown alternative or simplified tabs */}
      <div className="flex xl:hidden items-center gap-2 overflow-x-auto text-xs">
        {(['play', 'datastructures', 'memory', 'complexity', 'code', 'teacherguide'] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onDownloadProject}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-900/20 whitespace-nowrap shrink-0 cursor-pointer rounded-xl"
        >
          <Download className="w-4 h-4" />
          <span>Download C Project</span>
        </button>
      </div>
    </header>
  );
};
