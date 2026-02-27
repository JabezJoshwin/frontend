import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {
  ArrowRight, Mic, Network, BrainCircuit,
  Zap, Play, ChevronRight, Activity, BarChart3,
  CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans selection:bg-indigo-500 selection:text-white">

      {/* Cinematic Ambient Glow (Netflix/Apple style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Glassmorphism Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-black" fill="currentColor" />
            </div>
            <span className="font-semibold text-xl tracking-tight">AgileMakesSense</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <SignedOut>
              <Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link>
              <Link href="/sign-up" className="hover:text-white transition-colors">Sign Up</Link>
            </SignedOut>
            <Link href="/dashboard" className="text-white bg-white/10 border border-white/10 px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300">
              Launch Dashboard
            </Link>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section (Tesla / Apple inspired) */}
      <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          AURELION 2026 Hackathon Build
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[1.1]">
          Manage less.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
            Ship faster.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl font-light tracking-wide">
          The first autonomous sprint planner. Convert voice notes to code-ready tickets. Identify bottlenecks before they break your release.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link href="/dashboard" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 w-full sm:w-auto justify-center">
            Start Free Trial
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-colors w-full sm:w-auto justify-center">
            <Play className="h-5 w-5" fill="currentColor" />
            Watch Keynote
          </button>
        </div>

        {/* Tesla-style Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-24 pt-12 border-t border-white/10 text-left w-full max-w-4xl">
          <div>
            <div className="text-3xl font-mono font-bold text-white">0.8s</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">Ticket Gen Latency</div>
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-white">100%</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">Explainable AI</div>
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-white">Llama 3</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">Featherless Inference</div>
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-white">Zero</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">Manual Board Updates</div>
          </div>
        </div>
      </header>

      {/* Apple-style Bento Box Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">Intelligence built-in.</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Bento Item 1: Voice */}
          <div className="md:col-span-1 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/80 transition-colors group">
            <div className="h-14 w-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Mic className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Voice to Ticket.</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Powered by ElevenLabs and Web Speech API. Dictate regional language bugs while commuting. We structure the JSON automatically.
            </p>
            <div className="font-mono text-xs text-blue-400 bg-blue-400/10 p-3 rounded-lg flex items-center gap-2">
              <Activity className="h-4 w-4" /> Live processing active
            </div>
          </div>


          {/* Bento Item 2: AI Priority & Sprint Risk Engine */}
          <div className="md:col-span-2 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/80 transition-colors group relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="h-14 w-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-semibold mb-3">AI Priority & Sprint Risk Engine.</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Turn your tracker into a decision engine. We use ML regression and dependency analysis to score tasks and predict completion probabilities.
                </p>
                <ul className="text-slate-400 space-y-3 mb-6 font-medium">
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-400" /> What should we fix first?</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-400" /> Will we complete this sprint?</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-400" /> Who is overloaded?</li>
                </ul>
              </div>

              {/* UI Mockup Dashboard Card */}
              <div className="flex-1 bg-black/60 border border-white/5 rounded-2xl p-6 w-full shadow-2xl backdrop-blur-md">
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-slate-400 font-medium">Priority Score</span>
                    <span className="text-2xl font-mono font-bold text-emerald-400">87<span className="text-sm text-emerald-600">/100</span></span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-slate-400 font-medium">Sprint Probability</span>
                    <span className="text-2xl font-mono font-bold text-blue-400">62%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-400 font-medium">Backend Team</span>
                    <span className="text-sm font-mono text-red-400 flex items-center gap-2 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
                      <AlertTriangle className="h-4 w-4" /> 30% Overloaded
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Explainable AI Insights (Trust Layer) */}
          <div className="md:col-span-3 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-zinc-900/80 transition-colors">
            <div className="flex-1">
              <div className="h-14 w-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-3xl font-semibold mb-3">Explainable AI (Trust Layer).</h3>
              <p className="text-slate-400 leading-relaxed text-lg mb-4">
                Judges want intelligence, not black boxes. See exactly WHY a task is flagged as high priority with SHAP-inspired feature breakdowns.
              </p>
            </div>

            {/* Code/Logic Breakdown Block */}
            <div className="flex-1 bg-black/60 border border-white/10 rounded-2xl p-6 w-full font-mono text-sm text-slate-300 shadow-2xl">
              <div className="text-slate-500 mb-5 pb-3 border-b border-white/5 flex items-center justify-between">
                <span>// AI Priority Decision Matrix</span>
                <span className="text-xs bg-white/5 px-2 py-1 rounded text-slate-400">Task: AUTH-902</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between group">
                  <span className="text-slate-300 group-hover:text-white transition-colors">Impacts Payment Module</span>
                  <span className="text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-md border border-emerald-400/20">+30 pts</span>
                </div>
                <div className="flex items-center justify-between group">
                  <span className="text-slate-300 group-hover:text-white transition-colors">Deadline in 2 days</span>
                  <span className="text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">+20 pts</span>
                </div>
                <div className="flex items-center justify-between group">
                  <span className="text-slate-300 group-hover:text-white transition-colors">Blocks 3 other tasks</span>
                  <span className="text-purple-400 bg-purple-400/10 px-3 py-1 rounded-md border border-purple-400/20">+15 pts</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Total Priority Shift</span>
                  <span className="text-emerald-400">+65 pts</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Deep Dive / CTA */}
      <section className="py-32 border-t border-white/10 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">Experience the future of Agile.</h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto">
          Fully integrated with Next.js, FastAPI, Supabase, and Featherless AI. Built to scale from day one.
        </p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-slate-200 transition-colors text-lg">
          Initialize Workspace
        </Link>
      </section>
    </div>
  );
}