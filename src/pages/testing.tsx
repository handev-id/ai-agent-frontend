import Tab, { TabGroup } from "../components/Tab";
import { GLOBAL_ICONS_FA } from "../utils/icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
import { AiAgentModel } from "../apis/models/ai-agent";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { generateUserId } from "../utils/generateUserId";
import { io, Socket } from "socket.io-client";
import AiAgentEndpoint from "../apis/endpoints/ai-agent";
import useInteractivity from "../utils/hooks/useInteractivity";

type Message = {
  role: "user" | "model";
  text: string;
};

interface SelectedAgent {
  agent: AiAgentModel;
  userId: string;
  messages: Message[];
}

const Testing = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userId] = useState(generateUserId());
  const [isTyping, setIsTyping] = useState(false);
  const { handleScrollRoom } = useInteractivity();
  const aiAgentApi = AiAgentEndpoint();
  const messagesRef = useRef<HTMLDivElement>(null);

  const {
    reset,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SelectedAgent>({
    defaultValues: {
      agent: {} as AiAgentModel,
      userId: "",
      messages: [],
    },
  });

  const { fields: messages, append } = useFieldArray({
    control,
    name: "messages",
  });

  const onSubmit = async (data: SelectedAgent) => {
    if (!inputMessage.trim()) return;

    append({
      role: "user",
      text: inputMessage,
    });

    handleScrollRoom(messagesRef);

    socket?.emit("send-message", {
      userId,
      text: inputMessage,
      clientId: watch("agent")?.credentials?.clientId,
    });

    setInputMessage("");
  };

  const closeChat = () => {
    socket?.disconnect();
    reset({
      agent: {} as AiAgentModel,
      userId: "",
      messages: [],
    });
  };

  useEffect(() => {
    if (watch("agent")?.credentials?.clientId) {
      const baseURL = "http://localhost:3001";
      const newSocket = io(baseURL, {
        transports: ["websocket"],
        auth: {
          token: watch("agent")?.credentials?.clientId,
          userId: userId,
        },
      });

      setSocket(newSocket);

      newSocket.on(`agent-typing:${userId}`, (isType: boolean) => {
        setIsTyping(isType);
        handleScrollRoom(messagesRef);
      });

      newSocket.on(`reply-message:${userId}`, (message: string) => {
        append({
          role: "model",
          text: message,
        });
        handleScrollRoom(messagesRef);
      });

      return () => {
        newSocket.off(`reply-message:${userId}`);
        newSocket.disconnect();
      };
    }
  }, [watch("agent")?.credentials?.clientId, userId]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="list"
        id="ai-agents"
        initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-6 gap-6 items-start">
          <div id="ai-agent-detail" className="col-span-2 relative cn-box-base">
            <div className="text-center items-center box-header">
              <div className="flex gap-2 justify-center items-center">
                <span className="text-2xl">{GLOBAL_ICONS_FA.bot}</span>
                <h2 className="h1-lg">AI Agent List</h2>
              </div>

              <p className="desc mt-1 text-center">
                Select an AI Agent below to test how well it fits your needs
                before integrating it into your system.
              </p>
            </div>
            <TabGroup className="flex-col">
              {(aiAgentApi.index.data || []).map((ai) => (
                <Tab
                  key={ai.id}
                  icon={GLOBAL_ICONS_FA.bot}
                  isActive={watch("agent")?.id === ai.id}
                  onClick={() => {
                    reset({
                      agent: ai,
                      userId: userId,
                      messages: [],
                    });
                  }}
                >
                  {ai.name}
                </Tab>
              ))}
            </TabGroup>
          </div>
          {watch("agent")?.id ? (
            createPortal(
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden w-[90%] lg:w-[500px] bg-neutral rounded-lg shadow-xl"
                >
                  <div className="flex items-center justify-between text-white bg-gray-800 h-16 px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{GLOBAL_ICONS_FA.bot}</span>
                      <h2 className="h2">{watch("agent")?.name}</h2>
                    </div>
                    <button
                      onClick={closeChat}
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6l12 12M6 18L18 6"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    ref={messagesRef}
                    className="h-[400px] px-4 lg:px-6 overflow-y-auto bg-white scrollbar"
                  >
                    {messages.length > 0 ? (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          } py-4`}
                        >
                          <div
                            className={`flex gap-2 items-start max-w-[80%] p-3 rounded-lg ${
                              message.role === "user"
                                ? "bg-gray-800 text-white"
                                : "bg-[#e5e7eb]"
                            }`}
                          >
                            <p
                              className="text-sm whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: message.text
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    "<strong>$1</strong>"
                                  )
                                  .replace(/\*(.*?)\*/g, "- <em>$1</em>"),
                              }}
                            ></p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        Start a conversation with {watch("agent")?.name}
                      </div>
                    )}
                    {isTyping && (
                      <div className="text-sm text-gray-500 pb-2 pt-2 animate-bounce">
                        Typing...
                      </div>
                    )}
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-2 items-center w-full py-4 px-4 lg:px-6 bg-white border-t border-base"
                  >
                    <input
                      className="border border-base w-full text-sm h-10 px-4 rounded-md focus:border-gray-800 duration-500 outline-none"
                      type="text"
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(onSubmit)();
                        }
                      }}
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm transition-colors"
                      disabled={!inputMessage.trim()}
                    >
                      Send
                    </button>
                  </form>
                </motion.div>
              </div>,
              document.body
            )
          ) : (
            <div className="col-span-4 cn-box-base flex items-center justify-center min-h-[400px]">
              <h2 className="h2 text-center">
                Select an AI agent to get started
              </h2>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Testing;
