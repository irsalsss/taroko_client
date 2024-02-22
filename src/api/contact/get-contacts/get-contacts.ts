import AccountInterface from "@/interfaces/contact/account.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

interface GetContactsData {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

export type GetContactsOutput = ReadonlyArray<AccountInterface>

interface GetContactsResponse
  extends ResponseInterface {
  data: ReadonlyArray<GetContactsData>;
}

export const getContacts = async (
  options?: RequestInit
): Promise<GetContactsOutput> => {
  const response = await fetchJson<GetContactsResponse>(
    "/api/contacts",
    options
  );

  return mapToCamelCase(response.data);
};