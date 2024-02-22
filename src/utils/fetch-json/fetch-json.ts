import { env } from "@/config/env";

import * as uuid from "uuid";

export const fetchJson = async <JSONDataType = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSONDataType> => {
  const url = env.API_URL + input;

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
    throw new Error("Something went wrong");
  }

  return data;
};

export default fetchJson;
