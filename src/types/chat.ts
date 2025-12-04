import type { TransformedData } from "@/knowledge_graph/types/kgData";
type ChatRole = "user" | "assistant";
export interface ChatMessage {
  id: string;
  role: ChatRole;
  type: 'text' | 'graph' | 'loading';
  content?: string;
  graphData?: TransformedData;
  isResumeCard: boolean,
  snapshotUrl?:string;
  timestamp: number;
}
export type ChatSessions = Record<string, ChatMessage[]>;