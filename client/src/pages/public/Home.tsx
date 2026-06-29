import { Link } from 'react-router-dom';
import { Brain, Shield, Zap, Users, BarChart3, Bot, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Company Brain',
    desc: 'Upload documents, emails, and data. AI learns everything about your business.',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    desc: 'Sales, research, and email agents that work 24/7 to grow your business.',
  },
  {
    icon: Users,
    title: 'Customer Intelligence',
    desc: 'Deep profiles with history, products, meetings, and AI-powered insights.',
  },
  {
    icon: Zap,
    title: 'Pitch Generator',
    desc: 'Custom presentations and proposals tailored to each customer.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Real-time dashboard with revenue, growth, and AI recommendations.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'Role-based access, audit logs, and enterprise-grade encryption.',
  },
];

const stats = [
  { value: '10x', label: 'Faster Research' },
  { value: '85%', label: 'Time Saved on Emails' },
  { value: '3x', label: 'More Conversions' },
  { value: '99.9%', label: 'Uptime' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-surface-950 to-surface-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-8">
              <Bot className="w-4 h-4" />
              AI-Powered Business Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Your Company's{' '}
              <span className="gradient-text">Second Brain</span>
            </h1>
            <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Shodhan AI learns from your documents, emails, and data. It answers questions,
              writes emails, generates pitches, and manages your entire business workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="card text-center">
              <p className="text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-surface-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-surface-400 text-lg max-w-xl mx-auto">
            One platform to manage customers, documents, emails, and AI-powered insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card-hover group">
              <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center mb-4 group-hover:bg-primary-600/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-surface-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="card gradient-border p-12 lg:p-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-surface-400 text-lg max-w-xl mx-auto mb-8">
            Join Shodhan AI and let your company's knowledge work for you.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
