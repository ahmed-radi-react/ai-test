import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/configs/requests";

const headers = {
  " Content-Type": "application/json",
};

export const mutationRequest = (options: {
  url: string,
  method: string,
  isAuth?: boolean,
  onSuccess?: (data: any) => void,
  params?: boolean
}) => {
  const { url, method, isAuth, onSuccess, params } = options;

  return {
    mutate: useMutation({
      mutationFn: (body: object | { data: string }) =>
        apiRequest({
          url: params ? url + (body as { data: string }).data : url,
          body,
          headers,
          method,
          isAuth,
        }),
      onSuccess,
    }),
  };
};


export const queryRequest = (options: {
  url: string,
  method: string,
  key: string,
  cb?: any
}) => {
  const { url, method, key, cb } = options;

  return useQuery({
    queryKey: [key],
    queryFn: async (body: object) => {
      const data = await apiRequest({ url, body, headers, method, isAuth: true });
      cb && cb(data?.data?.items);
      return data;
    }
  });
};
