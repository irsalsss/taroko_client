import { env } from "@/config/env";

import * as uuid from "uuid";

const BASE_URL = typeof window === "undefined" ? env.API_URL : "";

export const fetchJson = async <JSONDataType = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSONDataType> => {
  const url = BASE_URL + input;

  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Request-ID": uuid.v4(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return data;
};

export default fetchJson;
