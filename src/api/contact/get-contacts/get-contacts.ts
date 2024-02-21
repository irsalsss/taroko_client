import ResponseInterface from "@/interfaces/response.interface";
import fetchJson from "@/utils/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

interface GetContactsData {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

interface GetContactsOutput {
  id: number;
  firstName: string;
  lastName: string;
  job: string;
  description: string;
}

interface GetContactsResponse
  extends ResponseInterface {
  data: ReadonlyArray<GetContactsData>;
}

export const getContacts = async (
  options?: RequestInit
): Promise<ReadonlyArray<GetContactsOutput>> => {
  const response = await fetchJson<GetContactsResponse>(
    "/api/contacts",
    options
  );

  return mapToCamelCase(response.data);
};