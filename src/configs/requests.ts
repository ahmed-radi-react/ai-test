import axios from "axios";
import { AUTH_URL } from "../utils/constant";
import { getCookie } from "../utils/cookies";
import { IApiRequest } from "~/types/types";

export const apiRequest = async ({
  url,
  body,
  headers,
  method = "get",
  isAuth,
}: IApiRequest) => {
  try {
    const { data } = await axios({
      method,
      url: AUTH_URL ? AUTH_URL + url : "",
      headers: isAuth
        ? { ...headers, Authorization: "Bearer" + " " + getCookie("token") }
        : headers,
      data: body,
    });
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};
