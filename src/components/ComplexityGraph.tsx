import React, { useState } from 'react';
import { BarChart3, Zap, ShieldAlert } from 'lucide-react';

export const ComplexityGraph: React.FC = () => {
  const [depth, setDepth] = useState<number>(4);

  // Approximate node counts
  const branchingFactor = 35;
  const minimaxNodes = Math.pow(branchingFactor, depth);
  const alphaBetaNodes = Math.pow(branchingFactor, depth / 2);
  const savedPercentage = (((minimaxNodes - alphaBetaNodes) / minimaxNodes) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Algorithm Analysis</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Minimax vs Alpha-Beta Pruning Efficiency</h1>
        <p className="text-sm text-slate-400 mt-1">
          Visually demonstrate to your teacher how Alpha-Beta pruning exponentially reduces search tree node visits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Search Depth (Ply)</span>
          </h3>

          <div>
            <label className="block text-slate-300 font-medium mb-2 text-xs">
              Selected Depth: <span className="text-emerald-400 font-mono text-sm font-bold">Depth {depth}</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400">Node Reduction Efficiency:</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">{savedPercentage}% fewer nodes</div>
            <div className="text-[10px] text-slate-500">Alpha-Beta pruning drastically speeds up AI move calculation.</div>
          </div>
        </div>

        {/* Visual Graph Panel */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>Node Visits Comparison</span>
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-300">Standard Minimax O(b^d)</span>
                <span className="text-amber-400 font-bold">{minimaxNodes.toLocaleString()} nodes</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-slate-800">
                <div
                  className="bg-amber-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-300">Alpha-Beta Pruned O(b^(d/2))</span>
                <span className="text-emerald-400 font-bold">{Math.round(alphaBetaNodes).toLocaleString()} nodes</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(2, (alphaBetaNodes / minimaxNodes) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
