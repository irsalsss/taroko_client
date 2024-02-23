import { useMutation } from "@tanstack/react-query";
import deleteContact from "../../delete-contact/delete-contact";

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: deleteContact,
    mutationKey: ['useDeleteContact']
  });
};

export default useDeleteContact;