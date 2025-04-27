import { useForm } from "react-hook-form";
import { Modal, useModal } from "../../components/modal";
import { GLOBAL_ICONS } from "../../utils/icons";
import { AiAgentModel } from "../../apis/models/ai-agent";
import { GLOBAL_ICONS_FA } from "../../utils/icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Actions from "../../components/Actions";
import Input from "../../components/form/Input";
import AiAgentEndpoint from "../../apis/endpoints/ai-agent";
import Skeleton from "react-loading-skeleton";
import AiAgentDetail from "./detail";

const AiAgentList = () => {
  const [aiAgentDetail, setAiAgentDetail] = useState<AiAgentModel | null>(null);
  const composeModal = useModal({});

  const aiAgentApi = AiAgentEndpoint();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
  } = useForm<AiAgentModel>();

  const onSubmit = async (data: AiAgentModel) => {
    const newAi = await aiAgentApi.create.mutateAsync(data);
    composeModal.control.close();
    setAiAgentDetail(newAi);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      await aiAgentApi.destroy.mutateAsync({ id });
      await aiAgentApi.index.refetch({});
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {aiAgentDetail ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <AiAgentDetail
              afterUpdate={async () => {
                setAiAgentDetail(null);
                await aiAgentApi.index.refetch();
              }}
              aiAgentDetail={aiAgentDetail}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            id="ai-agents"
            className="cn-box-base"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="text-center box-header">
              <h2 className="h1-lg">Ai Agent</h2>
              <p className="desc mt-1">
                This is the page where you can visit the AI agents you’ve
                previously created. Feel free to make changes and create as many
                chatbots as you like anytime!
              </p>
            </div>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-2">
              {!aiAgentApi.index.data?.length && aiAgentApi.index.isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      style={{ borderRadius: "12px" }}
                      height={"10rem"}
                    />
                  ))
                : aiAgentApi.index.data?.map((ai) => (
                    <div
                      key={ai.id}
                      onClick={() => setAiAgentDetail(ai)}
                      className="rounded-xl cursor-pointer border border-primary/50 flex flex-col justify-center items-center bg-primary/10 hover:bg-primary/20 h-40 shadow-lg hover:shadow duration-300"
                    >
                      <h2 className="h3 font-medium mb-2 text-primary">
                        {ai.name}
                      </h2>
                      <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary text-white text-2xl">
                        {GLOBAL_ICONS_FA.bot}
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(ai.id);
                          }}
                          className="py-1 relative z-10 px-4 border border-red-500 hover:text-white hover:bg-red-500 text-red-500 rounded-md text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              <div
                onClick={() => composeModal.control.open()}
                className="rounded-xl cursor-pointer border-base flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-300 h-40 shadow-lg hover:shadow duration-300"
              >
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-white text-blue-500 text-2xl">
                  {GLOBAL_ICONS.plus}
                </div>
                <h2 className="h2 mt-2 text-white">Create New</h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal title="Create New AI Agent" control={composeModal.control}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            leftItem={GLOBAL_ICONS_FA.bot}
            placeholder="Enter ai agent name"
            {...register("name", { required: "Wajib Diisi" })}
            message={errors.name?.message}
          />
          <Actions
            error={aiAgentApi.create.error}
            loading={aiAgentApi.create.isPending}
          />
        </form>
      </Modal>
    </>
  );
};

export default AiAgentList;
