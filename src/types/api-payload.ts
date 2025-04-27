export type ApiPayload<T, V = unknown> = {
  endpoint: string | ((variables: V) => string);
  key: string[];
  isFormData?: boolean;
  withCredentials?: boolean;
};
