interface TicketExplanation {
  urgency: number;
  complexity: number;
  impact: number;
  dependency: number;
}

interface Ticket {
  id: string; // Added for frontend mapping
  title: string;
  category: "Bug" | "Feature" | "Task" | "Improvement";
  priority: number;
  story_points: number;
  urgency_score: number;
  explanation: TicketExplanation;
}

interface DashboardData {
  tickets: Ticket[];
  sprintProbability: number;
  riskLevel: "Low" | "Moderate" | "High";
  bottlenecks: string[];
  summary: string;
}