/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { PlayArena } from './components/PlayArena';
import { DataStructureInspector } from './components/DataStructureInspector';
import { MemoryCalculator } from './components/MemoryCalculator';
import { ComplexityGraph } from './components/ComplexityGraph';
import { SourceCodeViewer } from './components/SourceCodeViewer';
import { TeacherGuide } from './components/TeacherGuide';
import { C_SOURCE_FILES } from './data/cSourceFiles';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('play');
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);

  const handleDownloadProject = () => {
    const combinedContent = C_SOURCE_FILES.map(
      file => `// ==========================================\n// FILE: ${file.filename}\n// ==========================================\n\n${file.content}\n\n`
    ).join('\n');

    const blob = new Blob([combinedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ChessCraft_C_Project_Bundle.c';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowDownloadModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadProject={handleDownloadProject}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-16">
        {activeTab === 'play' && <PlayArena />}
        {activeTab === 'datastructures' && <DataStructureInspector />}
        {activeTab === 'memory' && <MemoryCalculator />}
        {activeTab === 'complexity' && <ComplexityGraph />}
        {activeTab === 'code' && <SourceCodeViewer onDownloadProject={handleDownloadProject} />}
        {activeTab === 'teacherguide' && <TeacherGuide />}
      </main>

      {/* Download Success Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Project Bundle Downloaded!</h3>
                <p className="text-xs text-slate-400">ChessCraft_C_Project_Bundle.c saved successfully.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-semibold text-emerald-400">How to compile with GCC:</div>
              <pre className="font-mono text-emerald-300">
{`gcc -Wall -O3 main.c board.c moves.c evaluate.c search.c -o chess
./chess`}
              </pre>
            </div>

            <button
              onClick={() => setShowDownloadModal(false)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-emerald-900/30 cursor-pointer"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
