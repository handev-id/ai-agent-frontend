export * from "./use-modal";
export * from "./modal";

export { default as Modal } from "./modal";

export type ModalType = {
  title: string;
  children: React.ReactNode;
};
