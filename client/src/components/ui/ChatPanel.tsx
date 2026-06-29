import { useState } from 'react';
import { Bot, ChevronDown, ChevronUp, Send } from 'lucide-react';

interface Props {
  quickActions?: string[];
}

export default function ChatPanel({ quickActions = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  return (
    <div className="card">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-400" />
          </div>
          <h2 className="text-base font-semibold text-white">AI Assistant</h2>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-surface-400" /> : <ChevronUp className="w-4 h-4 text-surface-400" />}
      </button>
      {open && (
        <div className="mt-4 space-y-3">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-primary-400" />
              </div>
              <div className="bg-surface-800 rounded-xl px-3 py-2 max-w-[80%]">
                <p className="text-sm text-surface-200">Hello! I'm your AI assistant. Ask me anything about your business.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { setInput(''); } }}
              placeholder="Ask anything..."
              className="input-field text-sm flex-1"
            />
            <button className="btn-primary px-4" onClick={() => setInput('')}>
              <Send className="w-4 h-4" />
            </button>
          </div>
          {quickActions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {quickActions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs px-3 py-1.5 bg-surface-800 hover:bg-surface-700 text-surface-400 hover:text-surface-200 rounded-lg border border-surface-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
