// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(), 
  }).index("by_clerkId", ["clerkId"]),

  tickets: defineTable({
    title: v.string(),
    category: v.string(),
    severity: v.optional(v.string()), // Added this
    priority: v.number(),
    story_points: v.optional(v.number()),
    urgency_score: v.optional(v.number()),
    explanation: v.optional(v.string()), // Updated to string to match your API
    status: v.string(), 
    userId: v.id("users"),
    completedAt: v.optional(v.number()), 
  }).index("by_user", ["userId"]),
});