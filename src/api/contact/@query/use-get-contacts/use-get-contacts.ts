import { useQuery } from "@tanstack/react-query";
import {
  GetContactsOutput,
  getContacts,
} from "../../get-contacts/get-contacts";
import queryClient from "@/utils/query-client-server/query-client-server";

export const useGetContactsQuery = () => {
  return useQuery({
    queryKey: ["useGetContactsQuery"],
    queryFn: getContacts,
  });
};

export const prefetchGetContactsQuery = async () => {
  let data: GetContactsOutput;

  try {
    data = await getContacts();
  } catch {
    data = [];
  }

  await queryClient.prefetchQuery({
    queryKey: ["useGetContactsQuery"],
    queryFn: getContacts,
  });

  return data;
};
