import { AiAgentModel } from "../models/ai-agent";
import useDeleteApi from "../methods/delete";
import useGetApi from "../methods/get";
import usePostApi from "../methods/post";
import usePutApi from "../methods/put";
import { CredentialsModel } from "../models/credentials";
import useLazyGetApi from "../methods/lazy-get";

export default function AiAgentEndpoint() {
  const index = useGetApi<AiAgentModel[]>({
    endpoint: "/ai-agent",
    key: ["AI_AGENTS"],
    withCredentials: true,
  });

  const create = usePostApi<AiAgentModel, AiAgentModel>({
    endpoint: "/ai-agent",
    key: ["AI_AGENT_UPSERT"],
    withCredentials: true,
  });

  const update = usePutApi<AiAgentModel, AiAgentModel>({
    endpoint: (data) => `/ai-agent/${data.id}`,
    key: ["AI_AGENT_UPSERT"],
    withCredentials: true,
  });

  const destroy = useDeleteApi<AiAgentModel, { id: number }>({
    endpoint: (data) => "/ai-agent/" + data.id,
    key: ["AI_AGENT_DESTROY"],
    withCredentials: true,
  });

  const upsertCredentials = usePostApi<CredentialsModel, CredentialsModel>({
    endpoint: "/ai-agent/credentials",
    key: ["AI_AGENT_CREDENTIALS_UPSERT"],
    withCredentials: true,
  });

  const deleteCredentials = useDeleteApi<CredentialsModel, { id: number }>({
    endpoint: (data) => "/ai-agent/credentials/" + data.id,
    key: ["AI_AGENT_CREDENTIALS_DESTROY"],
    withCredentials: true,
  });

  const showCredentials = useLazyGetApi<CredentialsModel, { id: number }>({
    endpoint: (data) => "/ai-agent/credentials/" + data.id,
    key: ["AI_AGENT_CREDENTIALS"],
    withCredentials: true,
  });

  return {
    index,
    create,
    update,
    destroy,
    upsertCredentials,
    deleteCredentials,
    showCredentials,
  };
}
