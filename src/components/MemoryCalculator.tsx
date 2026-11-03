import React, { useState } from 'react';
import { Cpu, HardDrive, Calculator } from 'lucide-react';

export const MemoryCalculator: React.FC = () => {
  const [boardTypeSize] = useState<number>(4); // sizeof(Piece) = 4 bytes (type:1, color:1, value:2)
  const [stackCapacity, setStackCapacity] = useState<number>(512);
  const [ttEntries, setTtEntries] = useState<number>(65536); // 64K entries

  // Calculations
  const boardMemoryBytes = 8 * 8 * boardTypeSize; // 8x8 squares * 4 bytes = 256 bytes
  const moveStackBytes = stackCapacity * 48; // ~48 bytes per Move struct
  const transpositionTableBytes = ttEntries * 32; // ~32 bytes per TTEntry
  const totalBytes = boardMemoryBytes + moveStackBytes + transpositionTableBytes;
  const totalKB = (totalBytes / 1024).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4" />
          <span>Advanced C Viva Tool</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dynamic C Memory Footprint Calculator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Demonstrate to your teacher how precisely your C program manages heap and stack memory in bytes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Structure Parameters</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Move Stack Capacity: <span className="text-emerald-400 font-mono">{stackCapacity} moves</span>
              </label>
              <input
                type="range"
                min="64"
                max="2048"
                step="64"
                value={stackCapacity}
                onChange={(e) => setStackCapacity(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Transposition Table Entries: <span className="text-emerald-400 font-mono">{ttEntries} entries</span>
              </label>
              <input
                type="range"
                min="1024"
                max="262144"
                step="1024"
                value={ttEntries}
                onChange={(e) => setTtEntries(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400">Total Program RAM Allocation:</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">{totalKB} KB</div>
            <div className="text-[10px] text-slate-500">Extremely lightweight and cache-friendly for embedded or desktop systems.</div>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Memory Layout Breakdown</span>
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">2D Board Array (<code className="text-emerald-400">Piece squares[8][8]</code>)</div>
                <div className="text-xs text-slate-400 mt-0.5">8 rows × 8 cols × 4 bytes per Piece struct</div>
              </div>
              <div className="font-mono text-emerald-400 font-bold">{boardMemoryBytes} bytes</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">LIFO Move Stack (<code className="text-emerald-400">MoveStack</code>)</div>
                <div className="text-xs text-slate-400 mt-0.5">{stackCapacity} moves capacity × 48 bytes per Move record</div>
              </div>
              <div className="font-mono text-emerald-400 font-bold">{moveStackBytes} bytes</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Hash Table (<code className="text-emerald-400">TTEntry table[]</code>)</div>
                <div className="text-xs text-slate-400 mt-0.5">{ttEntries} entries × 32 bytes per Zobrist hash entry</div>
              </div>
              <div className="font-mono text-emerald-400 font-bold">{transpositionTableBytes} bytes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
