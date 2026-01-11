export type ApiResponse<T> =
  | ({ response: 'success' } & T)
  | { response: 'error'; error: string };
