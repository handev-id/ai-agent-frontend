import { useEffect, useState } from "react";
import Tab, { TabGroup } from "../../components/Tab";
import { AiAgentModel } from "../../apis/models/ai-agent";
import { GLOBAL_ICONS } from "../../utils/icons";
import { GLOBAL_ICONS_FA } from "../../utils/icons/fa";
import { aiAgentTabs } from "../../utils/ai-agent";

export type AiAgentDetailProps = {
  aiAgentDetail: AiAgentModel;
  afterUpdate: () => void;
  currentTab?: (tab: string) => void;
};

const LayoutAiDetail = ({
  afterUpdate,
  aiAgentDetail,
  children,
  currentTab,
}: AiAgentDetailProps & { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("general");

  useEffect(() => {
    currentTab?.(activeTab);
  }, [activeTab]);

  return (
    <div className="grid lg:grid-cols-6 gap-6 items-start">
      <div id="ai-agent-detail" className="lg:col-span-2 relative cn-box-base">
        <div className="absolute top-3 left-3">
          <button
            onClick={() => afterUpdate()}
            className="text-2xl border border-base p-2 rounded-lg hover:bg-neutral dark:hover:bg-neutralHoverDark cursor-pointer"
          >
            {GLOBAL_ICONS.arrowBack}
          </button>
        </div>
        <div className="text-center items-center box-header">
          <div className="flex gap-2 justify-center items-center">
            <span className="text-2xl">{GLOBAL_ICONS_FA.bot}</span>
            <h2 className="h1-lg"> {aiAgentDetail.name}</h2>
          </div>
          <p className="desc mt-1">
            Configure how your AI agent interacts with your customers.
          </p>
        </div>
        <TabGroup className="flex-col">
          {aiAgentTabs.map((tab, i) => (
            <Tab
              key={i}
              onClick={() => setActiveTab(tab.value)}
              icon={tab.icon}
              isActive={activeTab === tab.value}
            >
              {tab.label}
            </Tab>
          ))}
        </TabGroup>
      </div>
      <div className="lg:col-span-4 cn-box-base">{children}</div>
    </div>
  );
};

export default LayoutAiDetail;
