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
      userId: watch("userId"),
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
      const baseURL = `${import.meta.env.VITE_WS_URL}`;
      const newSocket = io(baseURL, {
        transports: ["websocket"],
        auth: {
          token: watch("agent")?.credentials?.clientId,
          userId: watch("userId"),
        },
        path: "/ws/socket.io"
      });

      setSocket(newSocket);

      newSocket.on(`agent-typing:${watch("userId")}`, (isType: boolean) => {
        setIsTyping(isType);
        handleScrollRoom(messagesRef);
      });

      newSocket.on(`reply-message:${watch("userId")}`, (message: string) => {
        append({
          role: "model",
          text: message,
        });
        handleScrollRoom(messagesRef);
      });

      return () => {
        newSocket.off(`reply-message:${watch("userId")}`);
        newSocket.disconnect();
      };
    }
  }, [watch("agent")?.credentials?.clientId, watch("userId")]);

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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 items-start">
          <div
            id="ai-agent-detail"
            className="md:col-span-2 relative cn-box-base"
          >
            <div className="text-center items-center box-header">
              <div className="flex gap-2 justify-center items-center">
                <span className="text-xl md:text-2xl">
                  {GLOBAL_ICONS_FA.bot}
                </span>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                  AI Agent List
                </h2>
              </div>

              <p className="text-sm md:text-base mt-1 text-center">
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
                      userId: generateUserId(),
                      messages: [],
                    });
                  }}
                >
                  <span className="truncate">{ai.name}</span>
                </Tab>
              ))}
            </TabGroup>
          </div>
          {watch("agent")?.id ? (
            createPortal(
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden w-full max-w-[90vw] md:w-[500px] bg-neutral rounded-lg shadow-xl"
                >
                  <div className="flex items-center justify-between text-white bg-gray-800 h-14 md:h-16 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-xl">
                        {GLOBAL_ICONS_FA.bot}
                      </span>
                      <h2 className="text-base md:text-lg font-semibold truncate max-w-[180px] md:max-w-[300px]">
                        {watch("agent")?.name}
                      </h2>
                    </div>
                    <button
                      onClick={closeChat}
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                      aria-label="Close chat"
                    >
                      <svg
                        width="20"
                        height="20"
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
                    className="h-[60vh] max-h-[400px] px-3 md:px-4 overflow-y-auto bg-white scrollbar"
                  >
                    {messages.length > 0 ? (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          } py-3`}
                        >
                          <div
                            className={`flex gap-2 items-start max-w-[90%] p-2 md:p-3 rounded-lg ${
                              message.role === "user"
                                ? "bg-gray-800 text-white"
                                : "bg-[#e5e7eb]"
                            }`}
                          >
                            <p
                              className="text-xs md:text-sm whitespace-pre-line"
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
                      <div className="h-full flex items-center justify-center text-gray-500 text-sm md:text-base">
                        Start a conversation with {watch("agent")?.name}
                      </div>
                    )}
                    {isTyping && (
                      <div className="text-xs md:text-sm text-gray-500 pb-2 pt-2 animate-bounce">
                        Typing...
                      </div>
                    )}
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-2 items-center w-full py-3 px-3 md:px-4 bg-white border-t border-base"
                  >
                    <input
                      className="border border-base w-full text-xs md:text-sm h-9 md:h-10 px-3 md:px-4 rounded-md focus:border-gray-800 duration-500 outline-none"
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
                      className="rounded-md bg-gray-800 hover:bg-gray-700 text-white px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm transition-colors disabled:opacity-50"
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
            <div className="md:col-span-4 cn-box-base flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <h2 className="text-lg md:text-xl lg:text-2xl text-center font-semibold">
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
