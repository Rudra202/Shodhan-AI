import { useState, useRef, useCallback } from 'react';
import { FileText, Upload, HardDrive, Download, Search, Filter, FolderOpen, Image, FileSpreadsheet, File as FileIcon, Trash2, Star, Clock, Bot, Eye, X } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Total Files', value: '1,247', change: '+86', trend: 'up', icon: FileText, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Storage Used', value: '8.4 GB', change: '+12%', trend: 'up', icon: HardDrive, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
  { label: 'New Uploads', value: '28', change: '+15%', trend: 'up', icon: Upload, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Shared', value: '156', change: '+23%', trend: 'up', icon: FolderOpen, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
];

const docs = [
  { id: '1', name: 'FDA_Certificate_2026.pdf', type: 'PDF', size: '2.4 MB', owner: 'Rahul S.', date: 'Today', status: 'Verified', starred: true },
  { id: '2', name: 'Q3_Price_List.xlsx', type: 'XLSX', size: '1.2 MB', owner: 'Priya M.', date: 'Yesterday', status: 'Draft', starred: false },
  { id: '3', name: 'Duloxetine_Study_v3.pdf', type: 'PDF', size: '8.1 MB', owner: 'Amit K.', date: '2 days ago', status: 'Verified', starred: true },
  { id: '4', name: 'GMP_Compliance_Report.pdf', type: 'PDF', size: '4.7 MB', owner: 'Neha W.', date: '3 days ago', status: 'Verified', starred: false },
  { id: '5', name: 'Employee_Handbook_2026.pdf', type: 'PDF', size: '3.3 MB', owner: 'HR Dept', date: '1 week ago', status: 'Final', starred: false },
  { id: '6', name: 'Product_Brochure_v2.pdf', type: 'PDF', size: '5.9 MB', owner: 'Marketing', date: '1 week ago', status: 'Final', starred: false },
  { id: '7', name: 'SOP_Manufacturing_v5.docx', type: 'DOCX', size: '1.8 MB', owner: 'QA Team', date: '2 weeks ago', status: 'Verified', starred: false },
  { id: '8', name: 'Packaging_Specs.xlsx', type: 'XLSX', size: '0.9 MB', owner: 'R&D', date: '2 weeks ago', status: 'Draft', starred: false },
];

const typeIcon: Record<string, any> = { PDF: FileText, XLSX: FileSpreadsheet, DOCX: FileText, JPG: Image, PNG: Image };
const statusColors: Record<string, string> = { Verified: 'text-emerald-400 bg-emerald-500/10', Draft: 'text-amber-400 bg-amber-500/10', Final: 'text-blue-400 bg-blue-500/10' };

export default function Documents() {
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach((f) => toast.success(`Uploaded ${f.name}`));
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => toast.success(`Uploaded ${f.name}`));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Documents" subtitle="Centralized document storage with version control and AI search" actions={
        <button className="btn-primary text-sm flex items-center gap-2" onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4" /> Upload
        </button>
      } />
      <KPIGrid cards={kpiCards} />

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver ? 'border-primary-500 bg-primary-500/5' : 'border-surface-700 hover:border-surface-600 bg-surface-900/50'
        }`}
        role="button"
        aria-label="Upload files by dragging and dropping"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
      >
        <div className="w-12 h-12 rounded-xl bg-surface-800 flex items-center justify-center mx-auto mb-3">
          <Upload className={`w-6 h-6 ${dragOver ? 'text-primary-400' : 'text-surface-500'}`} />
        </div>
        <p className="text-sm font-medium text-surface-300 mb-1">
          {dragOver ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-xs text-surface-500">or click to browse — PDF, XLSX, DOCX up to 50 MB</p>
      </div>
      <input ref={fileInputRef} type="file" className="hidden" multiple onChange={handleFileSelect} accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.png" />

      <div className="flex items-center gap-3 p-3 bg-surface-900 border border-surface-800 rounded-xl"><Search className="w-5 h-5 text-surface-500 ml-1 shrink-0" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..." className="flex-1 bg-transparent text-sm text-white placeholder-surface-500 focus:outline-none" aria-label="Search documents" /><Filter className="w-4 h-4 text-surface-500 shrink-0" /></div>

      <div className="card"><div className="flex items-center gap-4 mb-4 pb-3 border-b border-surface-800 overflow-x-auto">{['All', 'PDF', 'XLSX', 'DOCX', 'Images', 'Starred', 'Recent'].map((f) => (<button key={f} className="text-sm text-surface-400 hover:text-white whitespace-nowrap transition-colors">{f}</button>))}</div>
        <div className="space-y-1">{docs.map((d) => {
          const Icon = typeIcon[d.type] || FileIcon;
          return (<div key={d.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-800 transition-colors cursor-pointer" onClick={() => setPreview(preview === d.id ? null : d.id)}>
            <div className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center"><Icon className="w-4 h-4 text-primary-400" /></div>
            <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{d.name}</p><p className="text-xs text-surface-500">{d.type} · {d.size} · {d.owner} · {d.date}</p></div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[d.status] || ''}`}>{d.status}</span>
            {d.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />}
            <button className="btn-ghost p-1.5"><Download className="w-3.5 h-3.5" /></button>
            <button className="btn-ghost p-1.5"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
          </div>);
        })}</div>
      </div>

      {preview && (() => {
        const doc = docs.find((d) => d.id === preview);
        if (!doc) return null;
        return (<div className="card">
          <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><FileText className="w-5 h-5 text-primary-400" /><div><h3 className="font-semibold text-white">{doc.name}</h3><p className="text-xs text-surface-500">{doc.type} · {doc.size} · Uploaded {doc.date}</p></div></div><div className="flex items-center gap-2"><button className="btn-secondary text-xs px-3 py-1.5"><Download className="w-3.5 h-3.5" /></button></div></div>
          <div className="h-48 bg-surface-800 rounded-xl flex items-center justify-center"><div className="text-center"><FileText className="w-12 h-12 text-surface-600 mx-auto mb-2" /><p className="text-sm text-surface-500">Preview available for supported formats</p></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">{['AI Summary: Compliance document verified', 'Version: 2.0', 'Last modified by QA Team'].map((t) => (<div key={t} className="flex items-center gap-2 text-sm text-surface-400 p-2 bg-surface-800/50 rounded-lg"><Bot className="w-3.5 h-3.5 text-primary-400 shrink-0" />{t}</div>))}</div>
        </div>);
      })()}
    </div>
  );
}
