import { AiAgentModel } from "./ai-agent";

export interface UserModel {
  id: number;
  name: string;
  type: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  aiAgents: AiAgentModel[];
}
