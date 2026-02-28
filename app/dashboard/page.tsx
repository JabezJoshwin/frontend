"use client";

import React, { useState, useRef, useMemo } from "react";
import { 
  BrainCircuit, Activity, AlertTriangle, ShieldCheck, 
  ChevronDown, ChevronUp, Play, FileText, Zap, 
  Target, Network, CheckCircle2, Loader2, Sparkles,
  Mic, Square, UploadCloud, Paperclip
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

export default function DashboardPage() {
  const { user } = useUser();
  
  /** * FIX: Removed the duplicate expandedTicket state and 
   * used the strictly typed Convex ID from Doc<"tickets">
   */
  const [expandedTicket, setExpandedTicket] = useState<Doc<"tickets">["_id"] | null>(null);
  
  // --- Convex Hooks ---
  const saveTickets = useMutation(api.tickets.saveAITickets);
  const updateStatus = useMutation(api.tickets.updateTicketStatus);
  const liveTickets = useQuery(api.tickets.getTickets, user ? { clerkId: user.id } : "skip");

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Derived Insights ---
  const insights = useMemo(() => {
    if (!liveTickets || liveTickets.length === 0) return null;
    
    const highPriorityCount = liveTickets.filter(t => t.priority >= 45).length;
    const totalPoints = liveTickets.reduce((acc, t) => acc + (t.story_points || 0), 0);
    
    /**
     * FIX: Added nullish coalescing (?? 0) to handle 
     * potential undefined values from the AI payload
     */
    const avgUrgency = liveTickets.length > 0 
        ? liveTickets.reduce((acc, t) => acc + (t.urgency_score ?? 0), 0) / liveTickets.length 
        : 0;
    
    return {
      summary: `System analyzed ${liveTickets.length} tickets. ${highPriorityCount} items require immediate attention based on severity and urgency scores.`,
      sprintProbability: Math.max(30, 100 - (totalPoints * 2)), 
      riskLevel: totalPoints > 20 ? "High" : totalPoints > 10 ? "Moderate" : "Low",
      bottlenecks: liveTickets
        .filter(t => t.severity === "High")
        .map(t => `${t.category}: ${t.title.substring(0, 30)}...`)
    };
  }, [liveTickets]);

  // --- Handlers ---
  const loadSampleInput = () => {
    setInput(
      "Meeting Transcript:\nAlex (Frontend): The payment gateway crashes on iOS Safari when using Apple Pay. This needs an immediate fix.\nSarah (Backend): I can look into the Apple Pay webhook. Also, we need to migrate the user database to v2, which will take a while."
    );
  };

  const handleGenerate = async () => {
    if (!input || !user) return;
    setIsLoading(true);

    try {
      const response = await fetch("https://agile-makes-sense-backend.onrender.com/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }), 
      });

      if (!response.ok) throw new Error("API is waking up or failed.");
      const data = await response.json();

      await saveTickets({
        tickets: data.tickets,
        clerkId: user.id,
      });

      setInput(""); 
    } catch (error) {
      console.error("Integration Error:", error);
      alert("The ML API is likely waking up from a cold start. Please try again in 10-15 seconds!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setInput((prev) => prev + " [Voice dictation active: Analyzing technical debt...] ");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setInput((prev) => prev + `\n[Transcribing: ${file.name}...]`);
    }
  };

  const getPriorityColor = (score: number) => {
    if (score >= 45) return "text-rose-400 bg-rose-400/10 border-rose-400/20";
    if (score >= 25) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  };

  const getRiskColor = (level: string) => {
    if (level === "High") return "text-rose-400";
    if (level === "Moderate") return "text-amber-400";
    return "text-emerald-400";
  };

  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans selection:bg-indigo-500 selection:text-white p-6 md:p-12">
      
      {/* Header (Styling preserved) */}
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
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <UploadCloud className="h-4 w-4 text-slate-300" />
                  <span className="hidden sm:inline">Upload Audio</span>
                </button>
                <input type="file" accept="audio/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

                <button 
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isRecording 
                      ? "bg-rose-500/20 border border-rose-500/50 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                      : "bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300"
                  }`}
                >
                  {isRecording ? <><Square className="h-4 w-4 fill-current animate-pulse" /> Recording...</> : <><Mic className="h-4 w-4" /> Dictate</>}
                </button>
                
                <div className="h-6 w-px bg-white/10 mx-1"></div>
                <button onClick={loadSampleInput} className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4">
                  Load Sample Input
                </button>
              </div>
            </div>

            {audioFile && (
              <div className="mb-4 flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-2 rounded-lg w-fit">
                <Paperclip className="h-4 w-4" /> Attached: {audioFile.name}
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

        {/* RESULTS SECTION */}
        {liveTickets && liveTickets.length > 0 && insights && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* INSIGHTS BENTO GRID (Styling preserved) */}
            <section className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-purple-400">
                  <BrainCircuit className="h-5 w-5" />
                  <h3 className="font-semibold">AI Summary</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{insights.summary}</p>
                <div className="flex gap-4 border-t border-white/5 pt-4 mt-auto">
                  <div><div className="text-2xl font-bold">{liveTickets.length}</div><div className="text-xs text-slate-500">Extracted</div></div>
                  <div><div className="text-2xl font-bold text-rose-400">{liveTickets.filter(t => t.priority >= 45).length}</div><div className="text-xs text-slate-500">Critical</div></div>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <Target className="h-5 w-5" />
                  <h3 className="font-semibold">Sprint Risk Profile</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center"><span className="text-slate-400 text-sm">Completion Prob.</span><span className="text-xl font-mono font-bold">{insights.sprintProbability}%</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400 text-sm">Risk Level</span><span className={`text-sm font-bold uppercase tracking-wider ${getRiskColor(insights.riskLevel)}`}>{insights.riskLevel}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400 text-sm">Total Story Pts</span><span className="text-xl font-mono">{liveTickets.reduce((acc, t) => acc + (t.story_points || 0), 0)}</span></div>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-amber-400">
                  <Network className="h-5 w-5" />
                  <h3 className="font-semibold">Detected Bottlenecks</h3>
                </div>
                <ul className="space-y-3">
                  {insights.bottlenecks.map((bottleneck, i) => (
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
                {liveTickets.map((ticket) => {
                  const isExpanded = expandedTicket === ticket._id;
                  
                  return (
                    <div key={ticket._id} className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                      <div 
                        onClick={() => setExpandedTicket(isExpanded ? null : ticket._id)}
                        className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 border border-white/10">
                                {ticket.category}
                              </span>
                              <span className={`text-[10px] font-bold uppercase ${ticket.status === "Done" ? "text-emerald-400" : "text-slate-500"}`}>
                                {ticket.status}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{ticket.title}</h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 md:gap-8">
                          <div className="text-center shrink-0">
                            <div className="text-xs text-slate-500 mb-1">Story Pts</div>
                            <div className="font-mono">{ticket.story_points}</div>
                          </div>
                          <div className={`text-center shrink-0 px-4 py-2 rounded-xl border ${getPriorityColor(ticket.priority)}`}>
                            <div className="text-[10px] uppercase tracking-wider mb-0.5">Priority Score</div>
                            <div className="font-mono text-xl font-bold">{ticket.priority.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-white/5 bg-black/50 p-6 animate-in slide-in-from-top-2 duration-200">
                          <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                                <h4 className="font-semibold text-indigo-100">AI Logic Breakdown</h4>
                              </div>
                              <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-indigo-500/30 pl-4">
                                &quot;{ticket.explanation}&quot;
                              </p>
                            </div>
                            
                            <div className="flex flex-col gap-2 min-w-[140px]">
                               <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">Update Status</span>
                               <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    updateStatus({ ticketId: ticket._id, status: "In Progress" }); 
                                }}
                                className="text-xs py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                               >
                                Start Work
                               </button>
                               <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    updateStatus({ ticketId: ticket._id, status: "Done" }); 
                                }}
                                className="text-xs py-2 px-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
                               >
                                Complete
                               </button>
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