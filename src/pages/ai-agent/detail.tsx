import { GLOBAL_ICONS } from "../../utils/icons";
import { useForm } from "react-hook-form";
import { AiAgentModel } from "../../apis/models/ai-agent";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/button/Button";
import TextArea from "../../components/form/TextArea";
import AiAgentEndpoint from "../../apis/endpoints/ai-agent";
import toast from "react-hot-toast";
import Input from "../../components/form/Input";
import LayoutAiDetail, { AiAgentDetailProps } from "./layout";

const AiAgentDetail = ({ aiAgentDetail, afterUpdate }: AiAgentDetailProps) => {
  const [activeTab, setActiveTab] = useState<"general" | "resource">("general");
  const aiAgentApi = AiAgentEndpoint();

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AiAgentModel>();

  useEffect(() => {
    if (aiAgentDetail) {
      reset(aiAgentDetail);
    }
  }, [aiAgentDetail]);

  const handleUpdate = (data: AiAgentModel) => {
    toast.promise(
      aiAgentApi.update.mutateAsync(data, {
        onSuccess: () => {
          afterUpdate();
          reset();
        },
      }),
      {
        loading: "Loading...",
        success: "Berhasil Mengupdate!",
        error: "Terjadi Kesalahan",
      }
    );
  };

  return (
    <LayoutAiDetail
      currentTab={(data) => setActiveTab(data as "general" | "resource")}
      afterUpdate={afterUpdate}
      aiAgentDetail={aiAgentDetail}
    >
      <AnimatePresence mode="wait">
        {activeTab === "general" ? (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -30,
              filter: "blur(8px)",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            className="w-full space-y-6 p-4"
          >
            <Input
              label="Name"
              leftItem={GLOBAL_ICONS.bot}
              placeholder="Enter your AI Agent's Name"
              {...register("name", { required: "Required" })}
              message={errors.name?.message}
            />

            <p className="desc text-center my-4">
              Please provide clear and detailed instructions or commands that
              you would like the AI to follow, including the desired tone,
              communication style, or any specific behavioral traits. For
              instance, you may want the AI to respond in a casual, formal,
              humorous, polite manner, or sound like an expert in a particular
              domain. The more precise and thorough your instructions are, the
              better the AI will be able to meet your expectations and deliver
              consistent interactions.
            </p>

            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="space-y-4 w-full"
            >
              <div className="grid items-start gap-4">
                <TextArea
                  label="Welcome Message"
                  placeholder="Type the initial greeting message here"
                  {...register("welcomeMessage", { required: "Required" })}
                  message={errors.welcomeMessage?.message}
                  className="text-sm scrollbar"
                />
                <TextArea
                  rows={20}
                  label="Detailed Instruction"
                  placeholder="Type your detailed instruction for the AI here"
                  {...register("instruction", { required: "Required" })}
                  message={errors.instruction?.message}
                  className="text-sm scrollbar"
                />
              </div>

              <div className="flex flex-col items-end">
                <Button
                  disabled={aiAgentApi.update.isPending}
                  type="submit"
                  className="ml-auto"
                >
                  Submit
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="resource"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -30,
              filter: "blur(8px)",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            className="w-full space-y-6 p-4"
          >
            <p className="desc text-center my-4">
              Please provide a comprehensive knowledge source or resource
              material that your AI agent can refer to in order to answer
              customer queries more accurately and effectively.
            </p>

            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="space-y-4 w-full"
            >
              <div className="grid items-start gap-4">
                <TextArea
                  rows={20}
                  label="Knowledge Resource"
                  placeholder="Type or paste the reference material here"
                  {...register("resource", { required: "Required" })}
                  message={errors.resource?.message}
                  className="text-sm scrollbar"
                />
              </div>

              <div className="flex flex-col items-end">
                <Button
                  disabled={aiAgentApi.update.isPending}
                  type="submit"
                  className="ml-auto"
                >
                  Submit
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutAiDetail>
  );
};

export default AiAgentDetail;
