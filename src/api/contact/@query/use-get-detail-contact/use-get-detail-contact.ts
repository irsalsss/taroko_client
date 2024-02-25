import { useQuery } from "@tanstack/react-query";
import queryClient from "@/utils/query-client-server/query-client-server";
import {
  GetDetailContactsOutput,
  getDetailContacts,
} from "../../get-contact-detail/get-detail-contact";

export const useGetDetailContactsQuery = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ["useGetDetailContactsQuery", id],
    queryFn: () => getDetailContacts(id),
    enabled,
  });
};

export const prefetchGetContactsQuery = async (id: number) => {
  let data: GetDetailContactsOutput | undefined;

  try {
    data = await getDetailContacts(id);
  } catch {
    data = undefined;
  }

  await queryClient.prefetchQuery({
    queryKey: ["useGetDetailContactsQuery"],
    queryFn: () => getDetailContacts(id),
  });

  return data;
};
