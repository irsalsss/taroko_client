import { useQuery } from "@tanstack/react-query";
import {
  GetContactsOutput,
  getContacts,
} from "../../get-contacts/get-contacts";
import queryClient from "@/utils/query-client-server/query-client-server";
import { CustomError } from "@/utils/fetch-json/fetch-json";

export const useGetContactsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["useGetContactsQuery"],
    queryFn: getContacts,
    enabled,
  });
};

export const prefetchGetContactsQuery = async () => {
  let data: GetContactsOutput;

  try {
    data = await getContacts();
  } catch (error) {
    data = [];

    throw new CustomError((error as CustomError).message, {
      api: (error as CustomError).api,
      statusCode: (error as CustomError).statusCode,
    });
  }

  await queryClient.prefetchQuery({
    queryKey: ["useGetContactsQuery"],
    queryFn: getContacts,
  });

  return data;
};
