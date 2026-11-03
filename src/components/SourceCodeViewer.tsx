import React, { useState } from 'react';
import { C_SOURCE_FILES } from '../data/cSourceFiles';
import { FileCode, Copy, Check, Download, FolderTree } from 'lucide-react';

interface SourceCodeViewerProps {
  onDownloadProject: () => void;
}

export const SourceCodeViewer: React.FC<SourceCodeViewerProps> = ({ onDownloadProject }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFile = C_SOURCE_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileCode className="w-4 h-4" />
            <span>Teacher Submission Source Code</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">C Language Project Source Files</h1>
          <p className="text-sm text-slate-400 mt-1">
            Modular C99 source files ready for compilation with GCC. Fully commented for teacher inspection.
          </p>
        </div>

        <button
          onClick={onDownloadProject}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/30 whitespace-nowrap cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download All Files (.zip Bundle)</span>
        </button>
      </div>

      {/* Main Grid: File List Sidebar + Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* File Tree Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2 border-b border-slate-800 mb-2">
            <FolderTree className="w-4 h-4 text-emerald-400" />
            <span>Project File Structure</span>
          </div>
          <div className="space-y-1">
            {C_SOURCE_FILES.map((file, index) => (
              <button
                key={file.filename}
                onClick={() => setSelectedFileIndex(index)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all text-left ${
                  selectedFileIndex === index
                    ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-900/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-4 h-4 shrink-0 opacity-70" />
                  <span className="truncate">{file.filename}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-md shrink-0 ${
                  selectedFileIndex === index ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-800 text-slate-400'
                }`}>
                  {file.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Content Panel */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* File Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-mono text-white">{currentFile.filename}</h3>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  {currentFile.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{currentFile.description}</p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Viewer Box */}
          <div className="p-6 bg-slate-950 overflow-x-auto max-h-[600px]">
            <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
