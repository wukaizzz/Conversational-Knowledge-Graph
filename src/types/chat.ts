export interface ChatMessage {
  id:string;
  role: 'user' | 'assistant';
  content: string,
  status: 'pending' | 'completed' | 'error';
  timestamp: number;
}