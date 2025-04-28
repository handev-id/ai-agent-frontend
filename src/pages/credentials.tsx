import Tab, { TabGroup } from "../components/Tab";
import Button from "../components/button/Button";
import AiAgentEndpoint from "../apis/endpoints/ai-agent";
import Input from "../components/form/Input";
import { motion, AnimatePresence } from "framer-motion";
import { GLOBAL_ICONS_FA } from "../utils/icons/fa";
import { useEffect } from "react";
import { GLOBAL_ICONS } from "../utils/icons";
import { Controller, useForm } from "react-hook-form";
import { CredentialsModel } from "../apis/models/credentials";
import { Modal, useModal } from "../components/modal";
import toast from "react-hot-toast";

const Credentials = () => {
  const aiAgentApi = AiAgentEndpoint();
  const credentialsModal = useModal({});

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CredentialsModel>();

  const onSubmit = async (data: CredentialsModel) => {
    const newCredentials = await aiAgentApi.upsertCredentials.mutateAsync(
      data,
      {
        onError: (err) => {
          toast.error(
            (err.response?.data as { message: string })?.message +
              " " +
              err.status
          );
        },
      }
    );
    reset(newCredentials);
    credentialsModal.control.open();
    await aiAgentApi.index.refetch();
  };

  const onDelete = async () => {
    const isConfirmed = confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      await aiAgentApi.deleteCredentials.mutateAsync(watch());
      await aiAgentApi.index.refetch();
      reset({
        generativeAiKey: "",
        clientId: "",
        apiKey: "",
        callbackUrl: "",
        aiAgentId: undefined,
      });
    }
  };

  const onShow = async () => {
    const credentials = await aiAgentApi.showCredentials.mutateAsync(watch());
    setValue("clientId", credentials.clientId);
    setValue("apiKey", credentials.apiKey);
    credentialsModal.control.open();
  };
  useEffect(() => {
    if (!credentialsModal.control.isOpen) {
      setValue("clientId", "");
      setValue("apiKey", "");
    }
  }, [credentialsModal.control.isOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="list"
          id="ai-agents"
          initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 items-start">
            <div
              id="ai-agent-detail"
              className="lg:col-span-2 md:col-span-1 relative cn-box-base"
            >
              <div className="text-center items-center box-header">
                <div className="flex gap-2 justify-center items-center">
                  <span className="text-2xl">{GLOBAL_ICONS_FA.bot}</span>
                  <h2 className="h1-lg text-lg md:text-xl lg:text-2xl">
                    AI Agent List
                  </h2>
                </div>

                <p className="desc mt-1 text-center">
                  This is a list of your available AI agents. Select an AI agent
                  from the list to create unique credentials that will allow it
                  to operate securely and interact properly with your systems.
                </p>
              </div>
              <TabGroup className="flex-col">
                {(aiAgentApi.index.data || []).map((ai) => (
                  <Tab
                    key={ai.id}
                    icon={GLOBAL_ICONS_FA.bot}
                    isActive={watch("aiAgentId") === ai.id}
                    onClick={() => {
                      reset({
                        id: ai.credentials?.id,
                        aiAgentId: ai.id,
                        generativeAiKey: ai.credentials?.generativeAiKey || "",
                        callbackUrl: ai.credentials?.callbackUrl || "",
                      });
                    }}
                  >
                    {ai.name}
                  </Tab>
                ))}
              </TabGroup>
            </div>
            {watch("aiAgentId") ? (
              <div className="lg:col-span-4 md:col-span-1 cn-box-base">
                <p className="desc mt-1 text-center px-4 text-sm md:text-base">
                  Set up your credentials to allow your AI agent to connect
                  seamlessly with your system. You can integrate via API or
                  simply embed a code snippet into your website or application.
                  Choose the method that best fits your needs.
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-2 md:p-4 space-y-3 md:space-y-4"
                >
                  <Controller
                    control={control}
                    name="generativeAiKey"
                    rules={{ required: "Required" }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        value={value ? value : ""}
                        onChange={onChange}
                        label="Generative Ai Key"
                        leftItem={GLOBAL_ICONS.gembok}
                        placeholder="Enter generative ai key"
                        message={errors.generativeAiKey?.message}
                        type="password"
                      />
                    )}
                  />
                  {!watch("id") ? (
                    <div className="flex justify-end mt-3 md:mt-4">
                      <Button
                        loading={aiAgentApi.upsertCredentials.isPending}
                        type="submit"
                      >
                        Generate
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row justify-between pt-2 gap-2 md:gap-0">
                      <Button
                        loading={aiAgentApi.deleteCredentials.isPending}
                        onClick={onDelete}
                        sizing="sm"
                        coloring="danger"
                        variant="outlined"
                        type="button"
                      >
                        Delete
                      </Button>
                      <div className="flex flex-col md:flex-row items-center gap-2">
                        <Button
                          onClick={onShow}
                          loading={aiAgentApi.showCredentials.isPending}
                          sizing="sm"
                          coloring="primary"
                          variant="outlined"
                          type="button"
                          className="w-full md:w-[150px]"
                        >
                          Show Credentials
                        </Button>
                        <Button
                          loading={aiAgentApi.upsertCredentials.isPending}
                          sizing="sm"
                          coloring="primary"
                          type="submit"
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div className="lg:col-span-4 md:col-span-1 cn-box-base">
                <h2 className="h2 text-center text-lg md:text-xl">
                  Select an AI agent to generate credentials
                </h2>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <Modal control={credentialsModal.control} title="Credentials">
        <p className="desc my-1 text-sm md:text-base">
          Make sure to copy and store this key safely, as it will not be shown
          again.
        </p>
        <div className="space-y-3 md:space-y-4">
          <Input
            label="Client ID"
            leftItem={GLOBAL_ICONS.gembok}
            {...register("clientId")}
            rightItem={GLOBAL_ICONS.copy}
          />
          <Input
            label="Api Key"
            leftItem={GLOBAL_ICONS.gembok}
            {...register("apiKey")}
          />
        </div>
      </Modal>
    </>
  );
};

export default Credentials;
