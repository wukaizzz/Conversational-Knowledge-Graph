import type { RawGraphData } from "@/knowledge_graph/types/kgData";
type ChatRole = "user" | "assistant";
export interface ChatMessage {
  id: string;
  role: ChatRole;
  type: 'text' | 'graph' | 'loading';
  content?: string;
  graphData?: RawGraphData;
  isResumeCard: boolean,
  snapshotUrl?:string;
  timestamp: number;
}
