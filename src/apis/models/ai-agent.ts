import { AiContentList } from "../../types/ai-content";
import { CredentialsModel } from "./credentials";
import { UserModel } from "./user";

export interface AiAgentModel {
  id: number;
  name: string;
  resource: string;
  welcomeMessage: string;
  instruction: string;
  histories: AiContentList[];
  userId: number;
  user: UserModel;
  credentials?: CredentialsModel;
  createdAt: string;
  updatedAt: string;
}
