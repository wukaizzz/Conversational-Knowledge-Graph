import type { TransformedData } from "@/knowledge_graph/types/kgData";

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  type: 'text' | 'graph' | 'loading';
  content?: string;
  graphData?: TransformedData;
  isResumeCard: boolean,
  snapshotUrl?:string;
  timestamp: number;
}
