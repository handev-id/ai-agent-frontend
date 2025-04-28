import { GLOBAL_ICONS } from "../utils/icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { faqs } from "../utils/faqs";
import Tab, { TabGroup } from "../components/Tab";
import CodeDisplay from "../components/CodeDisplay";
import { responseJSON } from "../utils/code-display";

type MenuKey = "api" | "integration" | "faq";

const docsMenu = [
  {
    value: "api",
    label: "API Reference",
    icon: GLOBAL_ICONS.api, // Misal: <FiCode />
  },
  {
    value: "integration",
    label: "Integration Guide",
    icon: GLOBAL_ICONS.integration, // Misal: <FiLink />
  },
  {
    value: "faq",
    label: "FAQ",
    icon: GLOBAL_ICONS.faq, // Misal: <FiHelpCircle />
  },
];

const Docs = () => {
  const [activeMenu, setActiveMenu] = useState("api");

  // Konten untuk masing-masing menu
  const menuContents = {
    api: (
      <div className="space-y-6">
        <div>
          <h3 className="h2">API Reference</h3>
          <p className="text-base">
            Our API provides endpoints for integrating with our platform. Below
            are the available methods:
          </p>

          <CodeDisplay
            language="javascript"
            code={`
// Example API Request
fetch('${window.location.protocol}//${window.location.host}/api/agent?clientId=YOUR_CLIENT_ID', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'Hello, how can I help you today?'
    })
    })
    .then(response => response.json())
    .then(data => console.log(data));
    `.trim()}
          />
        </div>
        <div>
          <h3 className="h2">Response Example</h3>
          <p className="text-base">Success:</p>
          <CodeDisplay
            language="javascript"
            code={responseJSON().success.trim()}
          />
        </div>
        <div>
          <p className="text-base">Error:</p>
          <CodeDisplay
            language="javascript"
            code={responseJSON().error.trim()}
          />
        </div>
      </div>
    ),
    integration: (
      <div className="space-y-6">
        <h3 className="h2">Integration Guide</h3>
        <p>Follow these steps to integrate our widget into your application:</p>

        <CodeDisplay
          language="html"
          code={`
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <!-- Add this to your HTML -->
  <script type="text/javascript">
    window.theme = "#1f2937";
    window.clientId = "YOUR_CLIENT_ID";
  </script>
  <script async src="${window.location.protocol}//${window.location.host}/static/widget.js"></script>
</body>
</html>
          `.trim()}
        />
      </div>
    ),
    faq: (
      <div className="space-y-6">
        <h2 className="h2">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-neutral rounded-md overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between p-4 font-semibold bg-white hover:bg-gray-50 transition-colors">
                      <h4 className="h4 text-left">{faq.question}</h4>
                      <motion.div
                        animate={{ rotate: open ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2"
                      >
                        {GLOBAL_ICONS.arrow}
                      </motion.div>
                    </Disclosure.Button>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Disclosure.Panel className="px-4 pb-4 pt-2 text-sm text-gray-600">
                            {faq.answer}
                          </Disclosure.Panel>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  };

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
          <div className="col-span-2 cn-box-base space-y-4">
            <h2 className="h1 border-b border-base pb-3">Documentation</h2>
            <TabGroup className="flex-col">
              {docsMenu.map((menu, i) => (
                <Tab
                  key={i}
                  icon={menu.icon}
                  isActive={activeMenu === menu.value}
                  onClick={() => setActiveMenu(menu.value)}
                >
                  {menu.label}
                </Tab>
              ))}
            </TabGroup>
          </div>

          <div className="col-span-4 cn-box-base">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu}
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
                className="space-y-4 p-4"
              >
                {menuContents[activeMenu as MenuKey]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Docs;
