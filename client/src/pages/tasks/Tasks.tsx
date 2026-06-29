import { useState, useCallback, useRef, useEffect } from 'react';
import { Plus, Calendar, User, CheckSquare, Clock, AlertCircle, Trash2, X, Bot } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import type { KPICardData } from '../../components/ui/KPICard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Design new product dashboard', description: 'Create wireframes for the new product analytics dashboard with AI insights', status: 'todo', priority: 'high', assignee: 'Priya M.', dueDate: 'Jul 5' },
  { id: '2', title: 'Update customer onboarding flow', description: 'Revise the onboarding steps based on user feedback from Q2', status: 'todo', priority: 'medium', assignee: 'Amit K.', dueDate: 'Jul 8' },
  { id: '3', title: 'API integration for payment gateway', description: 'Integrate Razorpay API for subscription billing', status: 'todo', priority: 'urgent', assignee: 'Rahul S.', dueDate: 'Jul 3' },
  { id: '4', title: 'Build email template builder', description: 'Drag-and-drop email template builder for marketing campaigns', status: 'in-progress', priority: 'high', assignee: 'Neha W.', dueDate: 'Jul 10' },
  { id: '5', title: 'AI chatbot training data cleanup', description: 'Clean and deduplicate training data for the AI chatbot', status: 'in-progress', priority: 'medium', assignee: 'Raj P.', dueDate: 'Jul 6' },
  { id: '6', title: 'KPI report automation', description: 'Automate weekly KPI report generation and email distribution', status: 'in-progress', priority: 'high', assignee: 'Priya M.', dueDate: 'Jul 12' },
  { id: '7', title: 'Security audit preparation', description: 'Prepare documentation and run security scans for quarterly audit', status: 'review', priority: 'urgent', assignee: 'Amit K.', dueDate: 'Jul 4' },
  { id: '8', title: 'User feedback analysis', description: 'Analyze NPS survey results and compile actionable insights', status: 'review', priority: 'medium', assignee: 'Neha W.', dueDate: 'Jul 7' },
  { id: '9', title: 'Implement dark mode toggle', description: 'Add dark mode support across the entire application', status: 'done', priority: 'medium', assignee: 'Rahul S.', dueDate: 'Jun 28' },
  { id: '10', title: 'Database migration script', description: 'Write migration script for moving from PostgreSQL to Neon DB', status: 'done', priority: 'high', assignee: 'Raj P.', dueDate: 'Jun 25' },
  { id: '11', title: 'Customer import tool', description: 'Build CSV import tool for bulk customer data upload', status: 'done', priority: 'low', assignee: 'Priya M.', dueDate: 'Jun 20' },
];

const priorityColors: Record<string, string> = {
  low: 'bg-surface-600 text-surface-300',
  medium: 'bg-blue-500/10 text-blue-400',
  high: 'bg-amber-500/10 text-amber-400',
  urgent: 'bg-red-500/10 text-red-400',
};

const columns = [
  { id: 'todo', label: 'To Do', color: 'border-t-surface-500', dropColor: 'border-t-surface-400' },
  { id: 'in-progress', label: 'In Progress', color: 'border-t-blue-500', dropColor: 'border-t-blue-400' },
  { id: 'review', label: 'Review', color: 'border-t-amber-500', dropColor: 'border-t-amber-400' },
  { id: 'done', label: 'Done', color: 'border-t-emerald-500', dropColor: 'border-t-emerald-400' },
];

const assignees = ['Priya M.', 'Amit K.', 'Rahul S.', 'Neha W.', 'Raj P.', 'Sarah C.'];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '', description: '', priority: 'medium' as Task['priority'], assignee: assignees[0], dueDate: '',
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const getColumnTasks = useCallback((status: string) => tasks.filter((t) => t.status === status), [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const overdueTasks = tasks.filter((t) => {
    if (t.status === 'done') return false;
    const [month, day] = t.dueDate.split(' ');
    const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const due = new Date(2026, months[month] || 6, parseInt(day));
    return due < new Date();
  }).length;

  const kpiCards: KPICardData[] = [
    { label: 'Total Tasks', value: String(totalTasks), change: '+0', trend: 'up', icon: CheckSquare, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
    { label: 'Completed', value: String(completedTasks), change: '+0', trend: 'up', icon: CheckSquare, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
    { label: 'In Progress', value: String(inProgressTasks), change: '+0', trend: 'up', icon: Clock, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
    { label: 'Overdue', value: String(overdueTasks), change: '-0', trend: 'down', icon: AlertCircle, iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
  ];

  const handleDragStart = (id: string) => setDragging(id);

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    setDragOver(colId);
  };

  const handleDrop = (colId: string) => {
    if (!dragging) return;
    setTasks((prev) => prev.map((t) => t.id === dragging ? { ...t, status: colId as Task['status'] } : t));
    setDragging(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOver(null);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success('Task deleted');
  };

  const handleCreate = () => {
    if (!newTask.title.trim() || !newTask.dueDate.trim()) {
      toast.error('Title and due date are required');
      return;
    }
    const task: Task = {
      id: crypto.randomUUID().slice(0, 8),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      status: 'todo',
      priority: newTask.priority,
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ title: '', description: '', priority: 'medium', assignee: assignees[0], dueDate: '' });
    setShowModal(false);
    toast.success('Task created');
  };

  useEffect(() => {
    if (!showModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showModal]);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader
        title="Tasks"
        subtitle="Manage tasks with AI-powered Kanban board"
        actions={
          <button className="btn-primary text-sm flex items-center gap-2" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> New Task
          </button>
        }
      />
      <KPIGrid cards={kpiCards} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const columnTasks = getColumnTasks(col.id);
          return (
            <div
              key={col.id}
              className={`card border-t-2 p-0 overflow-hidden transition-all ${dragOver === col.id ? col.dropColor : col.color} ${dragOver === col.id ? 'ring-2 ring-primary-500/50' : ''}`}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDrop={() => handleDrop(col.id)}
              onDragLeave={() => setDragOver(null)}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-surface-800">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm">{col.label}</h3>
                  <span className="text-xs bg-surface-800 text-surface-400 px-2 py-0.5 rounded-full">{columnTasks.length}</span>
                </div>
              </div>
              <div className="p-3 space-y-3 min-h-[200px]">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    onDragEnd={handleDragEnd}
                    className={`group bg-surface-800/50 rounded-xl p-3 border border-surface-700/50 hover:border-surface-600 transition-all cursor-grab active:cursor-grabbing ${dragging === task.id ? 'opacity-50 ring-2 ring-primary-500' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>{task.priority}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }}
                        className="btn-ghost p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{task.title}</h4>
                    <p className="text-xs text-surface-500 line-clamp-2 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between text-xs text-surface-500">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{task.assignee}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {columnTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-surface-600">
                    <p className="text-xs">Drop tasks here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

        {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowModal(false)} role="dialog" aria-modal="true" aria-label="Create task">
          <div ref={modalRef} className="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white" id="create-task-title">Create Task</h2>
              <button className="btn-ghost p-1" onClick={() => setShowModal(false)} aria-label="Close modal"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-surface-500 mb-1 block" htmlFor="task-title">Title *</label>
                <input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500"
                  placeholder="Enter task title"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs text-surface-500 mb-1 block" htmlFor="task-desc">Description</label>
                <textarea
                  id="task-desc"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500 h-20"
                  placeholder="Optional description"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-surface-500 mb-1 block" htmlFor="task-priority">Priority</label>
                  <select
                    id="task-priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-surface-500 mb-1 block" htmlFor="task-assignee">Assignee</label>
                  <select
                    id="task-assignee"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                  >
                    {assignees.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-surface-500 mb-1 block" htmlFor="task-duedate">Due Date *</label>
                <input
                  id="task-duedate"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500"
                  placeholder="e.g. Jul 15"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button className="btn-ghost text-sm px-4 py-2" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary text-sm px-4 py-2" onClick={handleCreate} aria-label="Create task">Create Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
