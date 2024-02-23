import { env } from "@/constants/env";

import * as uuid from "uuid";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, { statusCode }: { statusCode: number }) {
    super(message);
    this.statusCode = statusCode
  }
}

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
    throw new CustomError(data.message, { statusCode: data.statusCode });
  }

  return data;
};

export default fetchJson;
