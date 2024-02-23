import { useMutation } from "@tanstack/react-query";
import editContact, { EditContactInput, EditContactOutput } from "../../edit-contact/edit-contact";
import { CustomError } from "@/utils/fetch-json/fetch-json";

export const useEditContact = () => {
  return useMutation<EditContactOutput, CustomError, EditContactInput>({
    mutationFn: editContact,
    mutationKey: ['useEditContact']
  });
};

export default useEditContact;