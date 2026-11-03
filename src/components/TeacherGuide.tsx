import React from 'react';
import { HelpCircle, BookOpen, CheckCircle2, Award } from 'lucide-react';

export const TeacherGuide: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Award className="w-4 h-4" />
          <span>Project Presentation & Viva Preparation</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Teacher Viva Q&A & Project Guide</h1>
        <p className="text-sm text-slate-400 mt-1">
          Review these model questions and answers to excel when presenting your C chess project to your teacher.
        </p>
      </div>

      {/* Q&A Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Q1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              Q1
            </div>
            <h3 className="text-base font-bold text-white pt-1">Why did you use a 2D array instead of bitboards?</h3>
          </div>
          <p className="text-xs text-slate-300 pl-11 leading-relaxed">
            While bitboards offer extreme bitwise performance for advanced engines, a 2D array (<code className="text-emerald-400">Piece squares[8][8]</code>) provides intuitive <strong>O(1) random access lookup</strong> using human-readable Cartesian coordinates <code className="text-emerald-400">[row][col]</code>. This makes debugging, board printing, and explaining data structures much clearer for a computer science project demonstration.
          </p>
        </div>

        {/* Q2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              Q2
            </div>
            <h3 className="text-base font-bold text-white pt-1">Explain how the LIFO Move Stack works during Undo.</h3>
          </div>
          <p className="text-xs text-slate-300 pl-11 leading-relaxed">
            During minimax game tree search, the engine must try and undo thousands of moves. Instead of duplicating the entire board array, we push each move and captured piece onto a <strong>LIFO (Last-In, First-Out) stack</strong> (<code className="text-emerald-400">MoveStack</code>). Calling <code className="text-emerald-400">unmake_move()</code> pops the top element and restores squares in <strong>O(1) time complexity</strong>.
          </p>
        </div>

        {/* Q3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              Q3
            </div>
            <h3 className="text-base font-bold text-white pt-1">What is Alpha-Beta Pruning and how does it optimize Minimax?</h3>
          </div>
          <p className="text-xs text-slate-300 pl-11 leading-relaxed">
            Standard Minimax explores every branch of the game tree, resulting in an exponential time complexity of <code className="text-emerald-400">O(b^d)</code>. Alpha-Beta pruning maintains two bounds (<code className="text-emerald-400">alpha</code> and <code className="text-emerald-400">beta</code>) to cut off subtrees that cannot possibly influence the final decision. This reduces effective time complexity to <code className="text-emerald-400">O(b^(d/2))</code>.
          </p>
        </div>

        {/* Q4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              Q4
            </div>
            <h3 className="text-base font-bold text-white pt-1">How does Zobrist Hashing work in the Transposition Table?</h3>
          </div>
          <p className="text-xs text-slate-300 pl-11 leading-relaxed">
            Zobrist hashing generates a unique 64-bit pseudo-random bitstring for every piece on every square. As moves are made, the hash key is updated via bitwise XOR operations in <code className="text-emerald-400">O(1)</code> time, allowing the engine to cache and instantly retrieve previously evaluated board positions.
          </p>
        </div>
      </div>

      {/* Project Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Project Features Checklist for Presentation</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Modular C Source Files (.h & .c)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>2D Array Board & Structs</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>LIFO Move Stack (`MoveStack`)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Minimax with Alpha-Beta Pruning</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Piece-Square Evaluation Tables</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Makefile & GCC Build Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
