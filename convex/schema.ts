import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 1. USERS: Just the core identity synced from Clerk
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(), 
  }).index("by_clerkId", ["clerkId"]),

  // 2. TICKETS: Owned strictly by the individual user
  tickets: defineTable({
    // --- AI Generated Fields ---
    title: v.string(),
    category: v.union(v.literal("Bug"), v.literal("Feature"), v.literal("Task"), v.literal("Improvement")),
    priority: v.number(),
    story_points: v.number(),
    urgency_score: v.number(),
    explanation: v.object({
      urgency: v.number(),
      complexity: v.number(),
      impact: v.number(),
      dependency: v.number(),
    }),
    
    // --- Lifecycle & Ownership ---
    status: v.union(v.literal("Backlog"), v.literal("In Progress"), v.literal("In Review"), v.literal("Done")),
    userId: v.id("users"), // Directly links to the single user
    
    // --- Time Tracking ---
    completedAt: v.optional(v.number()), // Set when status hits "Done"
  }).index("by_user", ["userId"]), // Crucial for fast querying on the dashboard

  // 3. COMMENTS (Optional): For the user to leave personal notes on their tickets
  comments: defineTable({
    ticketId: v.id("tickets"),
    userId: v.id("users"),
    content: v.string(),
  }).index("by_ticket", ["ticketId"]),
});