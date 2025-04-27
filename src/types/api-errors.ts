export type ValidationErrors = {
  message: string;
  rule: string;
  field: string;
  label?: string;
  meta?: Record<string, any>;
}

export type UnknownError = {
  message: string;
};
