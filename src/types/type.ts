export type ApiResponse<T> = {
  status: number;
  payload: {
    message: string;
    data?: T;
  };
};
