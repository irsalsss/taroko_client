import { useMutation } from "@tanstack/react-query";
import deleteContact, { DeleteContactOutput } from "../../delete-contact/delete-contact";
import { CustomError } from "@/utils/fetch-json/fetch-json";

export const useDeleteContact = () => {
  return useMutation<DeleteContactOutput, CustomError, number>({
    mutationFn: deleteContact,
    mutationKey: ['useDeleteContact']
  });
};

export default useDeleteContact;