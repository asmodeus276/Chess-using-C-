import React, { useState } from 'react';
import { Database, Layers, Hash, ListTree, Code2 } from 'lucide-react';

export const DataStructureInspector: React.FC = () => {
  const [activeStruct, setActiveStruct] = useState<'board' | 'stack' | 'hashtable' | 'piecelist'>('board');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Database className="w-4 h-4" />
          <span>Core Computer Science Architecture</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">C Data Structure Memory & Inspector</h1>
        <p className="text-sm text-slate-400 mt-1">
          Examine the exact C structs, arrays, and memory layouts used in the chess engine project for teacher review.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveStruct('board')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeStruct === 'board' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>1. 2D Array Board (`Piece board[8][8]`)</span>
        </button>
        <button
          onClick={() => setActiveStruct('stack')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeStruct === 'stack' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. LIFO Stack (`MoveStack`)</span>
        </button>
        <button
          onClick={() => setActiveStruct('hashtable')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeStruct === 'hashtable' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>3. Transposition Table (Zobrist Hash)</span>
        </button>
        <button
          onClick={() => setActiveStruct('piecelist')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeStruct === 'piecelist' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ListTree className="w-4 h-4" />
          <span>4. Piece Lists & PST</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Main Panel (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {activeStruct === 'board' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">2D Board Matrix (`Piece squares[8][8]`)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Time Complexity: O(1) direct indexing by `[row][col]`</p>
                </div>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-800/40">
                  Size: 256 bytes (8x8x4 bytes struct)
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  The chessboard is modeled as a 2D array of <code className="text-emerald-400">Piece</code> structs. Each struct contains:
                </p>
                <ul className="list-disc list-inside space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono">
                  <li><span className="text-emerald-400">PieceType type</span>: Enum (PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING)</li>
                  <li><span className="text-emerald-400">Color color</span>: Enum (WHITE=0, BLACK=1)</li>
                  <li><span className="text-emerald-400">int value</span>: Material weight (Pawn=100, Knight=320, etc.)</li>
                  <li><span className="text-emerald-400">bool hasMoved</span>: Castling rights flag</li>
                </ul>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">C Struct Definition Preview</h4>
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">
{`typedef struct {
    PieceType type;
    Color color;
    int value;
    bool hasMoved;
} Piece;

Piece squares[8][8];`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeStruct === 'stack' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">LIFO Move Stack (`MoveStack`)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Enables O(1) Undo / Unmake Move during Minimax search</p>
                </div>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-800/40">
                  Capacity: 512 moves
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  Instead of cloning the entire 8x8 board array during minimax tree traversal (which would be extremely slow), the engine uses a <strong>LIFO (Last-In, First-Out) Stack</strong>.
                </p>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Stack Operations in C</h4>
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">
{`typedef struct {
    Move moves[512];
    Piece capturedPieces[512];
    int top; // Stack pointer
} MoveStack;

// O(1) Push on make_move
// O(1) Pop on unmake_move`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeStruct === 'hashtable' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Transposition Table (Zobrist Hashing)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Avoids duplicate position evaluations via Hash Table lookup</p>
                </div>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-800/40">
                  O(1) Hash Lookup
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  Chess positions frequently transpose (arrive at identical board states via different move sequences). A hash table indexed by 64-bit Zobrist keys caches previously evaluated search depths and scores.
                </p>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Hash Table Struct</h4>
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">
{`typedef struct {
    uint64_t zobristKey;
    int depth;
    int score;
    HashFlag flag;
    Move bestMove;
} TTEntry;`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeStruct === 'piecelist' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Piece Lists & Piece-Square Tables (PST)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Optimized evaluation heuristics for piece placement</p>
                </div>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-800/40">
                  Positional Heuristics
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>
                  Piece-Square Tables reward active pieces (e.g. knights in the center, pawns advancing). Instead of scanning all 64 squares every time, piece lists track active piece coordinates.
                </p>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">PST Matrix Example (Pawns)</h4>
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">
{`const int pawn_pst[8][8] = {
    {0,  0,  0,  0,  0,  0,  0,  0},
    {50, 50, 50, 50, 50, 50, 50, 50},
    {10, 10, 20, 30, 30, 20, 10, 10},
    { 5,  5, 10, 25, 25, 10,  5,  5},
    { 0,  0,  0, 20, 20,  0,  0,  0},
    { 5, -5,-10,  0,  0,-10, -5,  5},
    { 5, 10, 10,-20,-20, 10, 10,  5},
    { 0,  0,  0,  0,  0,  0,  0,  0}
};`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Architectural Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Time & Space Complexity</span>
            </h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-emerald-400 mb-1">Board Array Lookup</div>
                <div className="font-mono text-slate-400">Time: O(1) | Space: O(1)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-emerald-400 mb-1">Move Stack (Push/Pop)</div>
                <div className="font-mono text-slate-400">Time: O(1) | Space: O(d)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-emerald-400 mb-1">Minimax Alpha-Beta Search</div>
                <div className="font-mono text-slate-400">Time: O(b^(d/2)) | Space: O(d)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-semibold text-emerald-400 mb-1">Transposition Table</div>
                <div className="font-mono text-slate-400">Time: O(1) | Space: O(Table Size)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
