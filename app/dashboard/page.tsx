"use client";

import React, { useState, useRef } from "react";
import { 
  BrainCircuit, Activity, AlertTriangle, ShieldCheck, 
  ChevronDown, ChevronUp, Play, FileText, Zap, 
  Target, Network, CheckCircle2, Loader2, Sparkles,
  Mic, Square, UploadCloud, Paperclip
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";


export default function DashboardPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  
  // --- New Media States ---
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Helper Functions ---
  const loadSampleInput = () => {
    setInput(
      "Meeting Transcript:\nAlex (Frontend): The payment gateway crashes on iOS Safari when using Apple Pay. This needs an immediate fix.\nSarah (Backend): I can look into the Apple Pay webhook. Also, we need to migrate the user database to v2, which will take a while and blocks the new profile page features.\nManager: Okay, let's also add a task to update the documentation for the new API endpoints."
    );
  };

  // --- Audio Handlers ---
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, you'd stop the MediaRecorder here and send the blob to Whisper.
      // For the UI demo, we simulate the transcription finishing:
      setInput((prev) => prev + " [Voice Dictation: The checkout button is unresponsive on mobile devices. Needs immediate attention.]");
    } else {
      setIsRecording(true);
      // Initialize navigator.mediaDevices.getUserMedia() here for real implementation
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      // Simulate sending file to backend for transcription
      setInput((prev) => prev + `\n[Transcribing uploaded file: ${file.name}...]`);
      setTimeout(() => {
        setInput("Transcribed Audio:\nWe need to refactor the authentication middleware. It's causing a 2-second delay on every page load, which is completely blocking the new dashboard release.");
      }, 1500);
    }
  };

  const handleGenerate = async () => {
    if (!input && !audioFile) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setData({
        tickets: [
          {
            id: "TKT-001",
            title: "Fix Apple Pay Crash on iOS Safari",
            category: "Bug",
            priority: 95,
            story_points: 3,
            urgency_score: 90,
            explanation: { urgency: 40, complexity: 15, impact: 30, dependency: 10 }
          },
          {
            id: "TKT-002",
            title: "Migrate User Database to v2",
            category: "Task",
            priority: 75,
            story_points: 8,
            urgency_score: 50,
            explanation: { urgency: 10, complexity: 35, impact: 10, dependency: 20 }
          },
          {
            id: "TKT-003",
            title: "Update API Documentation",
            category: "Improvement",
            priority: 30,
            story_points: 2,
            urgency_score: 20,
            explanation: { urgency: 5, complexity: 10, impact: 10, dependency: 5 }
          }
        ],
        sprintProbability: 62,
        riskLevel: "Moderate",
        bottlenecks: [
          "TKT-002 (Database Migration) blocks 3 downstream frontend tasks.",
          "Backend team is over-allocated by 25%."
        ],
        summary: "Extracted 3 tickets. 1 critical bug identified impacting payments. Overall sprint risk is moderate due to the heavy database migration blocking frontend work."
      });
      setIsLoading(false);
    }, 1500);
  };

  const getPriorityColor = (score: number) => {
    if (score >= 80) return "text-rose-400 bg-rose-400/10 border-rose-400/20";
    if (score >= 50) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  };

  const getRiskColor = (level: string) => {
    if (level === "High") return "text-rose-400";
    if (level === "Moderate") return "text-amber-400";
    return "text-emerald-400";
  };

  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans selection:bg-indigo-500 selection:text-white p-6 md:p-12">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Zap className="h-6 w-6 text-indigo-400" />
            AI Workspace
          </h1>
          <p className="text-slate-400 mt-2 font-light">Autonomous Ticket Extraction & Priority Engine</p>
        </div>
        <UserButton showName/>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* 1. INPUT SECTION */}
        <section className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-400" /> Context Input
              </h2>
              
              {/* Media Toolbar */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <UploadCloud className="h-4 w-4 text-slate-300" />
                  <span className="hidden sm:inline">Upload Audio</span>
                </button>
                <input 
                  type="file" 
                  accept="audio/*" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />

                <button 
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isRecording 
                      ? "bg-rose-500/20 border border-rose-500/50 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                      : "bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="h-4 w-4 fill-current animate-pulse" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      Dictate
                    </>
                  )}
                </button>
                
                <div className="h-6 w-px bg-white/10 mx-1"></div>

                <button 
                  onClick={loadSampleInput}
                  className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  Load Sample Input
                </button>
              </div>
            </div>

            {/* Audio File Indicator */}
            {audioFile && (
              <div className="mb-4 flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-2 rounded-lg w-fit">
                <Paperclip className="h-4 w-4" />
                Attached: {audioFile.name}
              </div>
            )}
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste meeting transcripts, dictate notes, or upload an audio file..."
              className={`w-full h-40 bg-black/50 border rounded-xl p-4 text-slate-300 focus:outline-none focus:ring-1 transition-all resize-none mb-6 font-mono text-sm leading-relaxed ${
                isRecording ? "border-rose-500/50 focus:ring-rose-500 shadow-[inset_0_0_20px_rgba(244,63,94,0.05)]" : "border-white/10 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
            />
            
            <div className="flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={(!input && !audioFile) || isLoading || isRecording}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                {isLoading ? "Analyzing Context..." : "Generate Tickets"}
              </button>
            </div>
          </div>
        </section>

        {/* RESULTS SECTION (Unchanged, rendering data conditionally below) */}
        {data && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* INSIGHTS BENTO GRID */}
            <section className="grid md:grid-cols-3 gap-6">
              
              {/* Summary Insight */}
              <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-purple-400">
                  <BrainCircuit className="h-5 w-5" />
                  <h3 className="font-semibold">AI Summary</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {data.summary}
                </p>
                <div className="flex gap-4 border-t border-white/5 pt-4 mt-auto">
                  <div>
                    <div className="text-2xl font-bold">{data.tickets.length}</div>
                    <div className="text-xs text-slate-500">Extracted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-400">
                      {data.tickets.filter(t => t.priority >= 80).length}
                    </div>
                    <div className="text-xs text-slate-500">High Priority</div>
                  </div>
                </div>
              </div>

              {/* Sprint Risk */}
              <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <Target className="h-5 w-5" />
                  <h3 className="font-semibold">Sprint Risk Profile</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Completion Probability</span>
                    <span className="text-xl font-mono font-bold">{data.sprintProbability}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Risk Level</span>
                    <span className={`text-sm font-bold uppercase tracking-wider ${getRiskColor(data.riskLevel)}`}>
                      {data.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Total Story Points</span>
                    <span className="text-xl font-mono">{data.tickets.reduce((acc, t) => acc + t.story_points, 0)}</span>
                  </div>
                </div>
              </div>

              {/* Bottlenecks */}
              <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-amber-400">
                  <Network className="h-5 w-5" />
                  <h3 className="font-semibold">Detected Bottlenecks</h3>
                </div>
                <ul className="space-y-3">
                  {data.bottlenecks.map((bottleneck, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300 bg-black/40 p-3 rounded-lg border border-white/5">
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{bottleneck}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* EXTRACTED TICKETS LIST */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Structured Backlog</h2>
              <div className="space-y-4">
                {data.tickets.map((ticket) => {
                  const isExpanded = expandedTicket === ticket.id;
                  
                  return (
                    <div key={ticket.id} className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                      <div 
                        onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                        className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 border border-white/10">
                                {ticket.category}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{ticket.title}</h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0">
                          <div className="text-center shrink-0">
                            <div className="text-xs text-slate-500 mb-1">Story Pts</div>
                            <div className="font-mono">{ticket.story_points}</div>
                          </div>
                          <div className="text-center shrink-0">
                            <div className="text-xs text-slate-500 mb-1">Urgency</div>
                            <div className="font-mono">{ticket.urgency_score}</div>
                          </div>
                          <div className={`text-center shrink-0 px-4 py-2 rounded-xl border ${getPriorityColor(ticket.priority)}`}>
                            <div className="text-xs uppercase tracking-wider mb-0.5">Priority Score</div>
                            <div className="font-mono text-xl font-bold">{ticket.priority}</div>
                          </div>
                        </div>
                      </div>

                      {/* Explainability Trust Layer */}
                      {isExpanded && (
                        <div className="border-t border-white/5 bg-black/50 p-6 animate-in slide-in-from-top-2 duration-200">
                          <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="h-5 w-5 text-indigo-400" />
                            <h4 className="font-semibold text-indigo-100">AI Logic Breakdown</h4>
                            <span className="text-xs text-slate-500 ml-2">Why did it score {ticket.priority}?</span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
                            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
                              <div className="text-slate-400 mb-2">Urgency</div>
                              <div className="flex justify-between items-end">
                                <span className="text-2xl text-white">+{ticket.explanation.urgency}</span>
                                <span className="text-xs text-slate-500">pts</span>
                              </div>
                            </div>
                            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
                              <div className="text-slate-400 mb-2">Complexity</div>
                              <div className="flex justify-between items-end">
                                <span className="text-2xl text-white">+{ticket.explanation.complexity}</span>
                                <span className="text-xs text-slate-500">pts</span>
                              </div>
                            </div>
                            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
                              <div className="text-slate-400 mb-2">Impact</div>
                              <div className="flex justify-between items-end">
                                <span className="text-2xl text-white">+{ticket.explanation.impact}</span>
                                <span className="text-xs text-slate-500">pts</span>
                              </div>
                            </div>
                            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
                              <div className="text-slate-400 mb-2">Dependency</div>
                              <div className="flex justify-between items-end">
                                <span className="text-2xl text-white">+{ticket.explanation.dependency}</span>
                                <span className="text-xs text-slate-500">pts</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}