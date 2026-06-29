import { useState } from 'react';
import { BookOpen, Search, FileText, FileSpreadsheet, FileImage, Upload, Bot, ChevronRight, Download, ExternalLink, FolderOpen, Star, Clock, Plus } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Total Documents', value: '342', change: '+28', trend: 'up', icon: FileText, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'AI Indexed', value: '100%', change: 'All', trend: 'up', icon: Bot, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
  { label: 'Storage Used', value: '2.4 GB', change: '+12%', trend: 'up', icon: FolderOpen, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
  { label: 'Recent Uploads', value: '18', change: '+6', trend: 'up', icon: Upload, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
];

const sections = [
  { name: 'Company Docs', count: 45, icon: FileText, color: 'text-blue-400', items: ['Employee Handbook', 'Company Policies', 'Organization Chart', 'Brand Guidelines', 'Annual Reports'] },
  { name: 'Research', count: 89, icon: BookOpen, color: 'text-purple-400', items: ['API Research Papers', 'Clinical Trial Data', 'Formulation Studies', 'Stability Reports', 'Patent Filings'] },
  { name: 'Certificates', count: 67, icon: FileImage, color: 'text-emerald-400', items: ['FDA Certificates', 'WHO-GMP', 'EU-GMP', 'ISO 9001', 'Export Licenses'] },
  { name: 'SOP', count: 52, icon: FileText, color: 'text-amber-400', items: ['Manufacturing SOP', 'Quality Control SOP', 'Storage SOP', 'Transport SOP', 'Safety Protocols'] },
  { name: 'Policies', count: 38, icon: FileSpreadsheet, color: 'text-rose-400', items: ['Quality Policy', 'Environmental Policy', 'Data Privacy', 'Code of Conduct', 'Whistleblower Policy'] },
  { name: 'Product Catalog', count: 51, icon: BookOpen, color: 'text-cyan-400', items: ['Product Brochures', 'Price Lists', 'Technical Data Sheets', 'MSDS Documents', 'Packaging Specs'] },
];

const recentDocs = [
  { name: 'FDA_Cert_2026.pdf', section: 'Certificates', date: '2 hours ago', size: '2.4 MB' },
  { name: 'Duloxetine_Study_v3.pdf', section: 'Research', date: 'Yesterday', size: '8.1 MB' },
  { name: 'Q3_Price_List.xlsx', section: 'Product Catalog', date: '2 days ago', size: '1.2 MB' },
  { name: 'GMP_Compliance_Report.pdf', section: 'Certificates', date: '3 days ago', size: '4.7 MB' },
  { name: 'Employee_Handbook_2026.pdf', section: 'Company Docs', date: '1 week ago', size: '3.3 MB' },
];

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Knowledge Base" subtitle="Centralized document management with AI-powered search" actions={<button className="btn-primary text-sm flex items-center gap-2"><Upload className="w-4 h-4" /> Upload</button>} />
      <KPIGrid cards={kpiCards} />

      {/* AI Search */}
      <div className="card"><div className="flex items-center gap-3 p-1 bg-surface-800 border border-surface-700 rounded-xl"><Search className="w-5 h-5 text-surface-500 ml-3 shrink-0" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ask anything... 'Show me FDA approved products' or 'Find latest SOP documents'" className="flex-1 bg-transparent text-sm text-white placeholder-surface-500 focus:outline-none py-2.5" /><span className="text-xs text-surface-500 mr-3 flex items-center gap-1"><Bot className="w-3.5 h-3.5" /> AI Search</span></div></div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <div key={s.name} className={`card-hover cursor-pointer ${activeSection === s.name ? 'ring-2 ring-primary-500' : ''}`} onClick={() => setActiveSection(activeSection === s.name ? null : s.name)}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center"><s.icon className={`w-5 h-5 ${s.color}`} /></div>
              <div><h3 className="font-semibold text-white">{s.name}</h3><p className="text-xs text-surface-500">{s.count} documents</p></div>
            </div>
            {activeSection === s.name && (
              <div className="space-y-1.5 mt-2 pt-3 border-t border-surface-800">
                {s.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-surface-400 hover:text-white p-1.5 rounded-lg hover:bg-surface-800 transition-colors cursor-pointer">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="flex-1 truncate">{item}</span>
                    <Download className="w-3 h-3 text-surface-600 shrink-0" />
                  </div>
                ))}
              </div>
            )}
            {activeSection !== s.name && (
              <p className="text-xs text-surface-500 flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Click to browse</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-primary-400" /><h2 className="text-base font-semibold text-white">Recent Uploads</h2></div>
        <div className="space-y-1">{recentDocs.map((d) => (
          <div key={d.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-800 transition-colors cursor-pointer">
            <FileText className="w-4 h-4 text-primary-400 shrink-0" />
            <div className="flex-1 min-w-0"><p className="text-sm text-surface-200 truncate">{d.name}</p><p className="text-xs text-surface-500">{d.section} · {d.size}</p></div>
            <span className="text-xs text-surface-600 shrink-0">{d.date}</span>
          </div>
        ))}</div>
      </div>
    </div>
  );
}
