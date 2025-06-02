import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tab, { TabGroup } from "./components/Tab";
import AiAgentList from "./pages/ai-agent/list";
import Account from "./pages/account";
import { UserModel } from "./apis/models/user";
import Credentials from "./pages/credentials";
import Testing from "./pages/testing";
import Docs from "./pages/docs";

const TABS = [
  { key: "account", label: "Account" },
  { key: "ai_agents", label: "AI Agent" },
  { key: "credentials", label: "Credentials" },
  { key: "testing", label: "Testing" },
  { key: "docs", label: "Docs" },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState<UserModel | null>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <Account setUser={setUser} />;
      case "ai_agents":
        return <AiAgentList />;
      case "credentials":
        return <Credentials />;
      case "testing":
        return <Testing />;
      case "docs":
        return <Docs />;
      default:
        return null;
    }
  };
  return (
    <div
      id="main"
      className="w-full h-screen p-4 overflow-x-hidden overflow-y-auto lg:px-20 lg:py-10 space-y-6 bg-gradient-to-bl from-blue-700 to-blue-400"
    >
      <motion.div
        className="cn-box-base w-full scrollbar overflow-x-scroll"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <TabGroup className="w-[400px] lg:w-full">
          {TABS.map((tab, i) => (
            <Tab
              key={tab.key}
              disabled={!user && i !== 0 ? true : false}
              title={!user && i !== 0 ? "Please login first" : tab.label}
              onClick={() => setActiveTab(tab.key)}
              isActive={activeTab === tab.key}
            >
              {tab.label}
            </Tab>
          ))}
        </TabGroup>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
