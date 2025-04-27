type Content = {
  parts: Array<{ text: string }>;
};

export type AiContentList = {
  role: "user" | "model";
  content: Content;
};
