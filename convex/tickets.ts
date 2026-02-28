import {query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ------------------------------------------------------------------
// 1. BATCH CREATE: Save the array of tickets from the Python ML API
// ------------------------------------------------------------------
// convex/tickets.ts
export const saveAITickets = mutation({
  args: {
    tickets: v.array(
      v.object({
        title: v.string(),
        category: v.string(),
        severity: v.string(),
        priority: v.number(),
        story_points: v.number(),
        urgency_score: v.number(),
        explanation: v.string(),
      })
    ),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) throw new Error("User not found");

    for (const ticket of args.tickets) {
      await ctx.db.insert("tickets", {
        ...ticket, // This spreads title, category, severity, priority, etc.
        status: "Backlog",
        userId: user._id,
      });
    }
  },
});

// ------------------------------------------------------------------
// 2. SINGLE CREATE: Manually add one ticket (Bypass AI)
// ------------------------------------------------------------------
export const createTicket = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    priority: v.number(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) throw new Error("User not found in Convex database.");

    return await ctx.db.insert("tickets", {
      title: args.title,
      category: args.category,
      priority: args.priority,
      status: "Backlog",
      userId: user._id,
    });
  },
});

// ------------------------------------------------------------------
// 3. UPDATE DETAILS: Edit title, category, or priority
// ------------------------------------------------------------------
export const updateTicket = mutation({
  args: {
    ticketId: v.id("tickets"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    priority: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Destructure out the ticketId, the rest are the fields we want to update
    const { ticketId, ...updates } = args;
    
    // ctx.db.patch only updates the fields provided, leaving the rest intact
    await ctx.db.patch(ticketId, updates);
  },
});

// ------------------------------------------------------------------
// 4. UPDATE STATUS: Move between columns & stamp completion time
// ------------------------------------------------------------------
export const updateTicketStatus = mutation({
  args: {
    ticketId: v.id("tickets"),
    status: v.string(), // e.g., "Backlog", "In Progress", "Done"
  },
  handler: async (ctx, args) => {
    const updates: { status: string; completedAt?: number } = { 
      status: args.status 
    };

    // Time-Tracking Logic
    if (args.status === "Done") {
      updates.completedAt = Date.now(); 
    } else {
      updates.completedAt = undefined; // Strip the time if moved out of Done
    }

    await ctx.db.patch(args.ticketId, updates);
  },
});

// Add this to the bottom of convex/tickets.ts

export const getTickets = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    // 1. Find the user first
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) return [];

    // 2. Fetch all tickets for this user
    const tickets = await ctx.db
      .query("tickets")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // 3. Return them sorted by priority score (Highest first)
    return tickets.sort((a, b) => b.priority - a.priority);
  },
});