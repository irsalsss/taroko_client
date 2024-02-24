"use client";

import useCreateContact from "@/api/contact/@mutation/use-create-contact/use-create-contact";
import { useGetDetailContactsQuery } from "@/api/contact/@query/use-get-detail-contact/use-get-detail-contact";
import Input from "@/components/shared/input/input";
import Modal from "@/components/shared/modal/modal";
import { notify } from "@/components/shared/toaster/toaster";
import { ContactFormField } from "@/interfaces/contact/contact.interface";
import { contactValidation } from "@/validations/contact/contact.validation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { isEmpty } from "lodash-es";
import Loader from "@/components/shared/loader/loader";
import useEditContact from "@/api/contact/@mutation/use-edit-contact/use-edit-contact";
import { ERROR_NOT_FOUND } from "@/constants/error";
import { useQueryClient } from "@tanstack/react-query";

interface ContactModalAddEditProps {
  activeId: number;
  onClose: () => void;
}

const ContactModalAddEdit = ({
  activeId,
  onClose,
}: ContactModalAddEditProps) => {
  const isAddMode = activeId === 0;

  const queryClient = useQueryClient();

  const { data: detailContact, isLoading } = useGetDetailContactsQuery(
    activeId,
    activeId > 0
  );

  const { mutate: createContact } = useCreateContact();

  const { mutate: editContact } = useEditContact(activeId);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    trigger,
  } = useForm<ContactFormField>({
    mode: "onChange",
    defaultValues: detailContact,
  });

  const onSubmit = (data: ContactFormField) => {
    const payload = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      job: data.job.trim(),
      description: data.description.trim(),
    };

    if (isAddMode) {
      createContact(payload, {
        onSuccess: () => {
          queryClient.resetQueries({ queryKey: ["useGetContactsQuery"] });

          notify("Successfully created");
          onClose();
        },
        onError: () => {
          notify("Something went wrong, please try again");
        },
      });

      return;
    }

    editContact(
      { ...payload, id: activeId },
      {
        onSuccess: () => {
          queryClient.resetQueries({ queryKey: ["useGetContactsQuery"] });
          queryClient.resetQueries({
            queryKey: ["useGetDetailContactsQuery", activeId],
            exact: true,
          });

          notify("Successfully edited");
          onClose();
        },
        onError: (response) => {
          if (response.statusCode === ERROR_NOT_FOUND) {
            notify(response.message);
            return;
          }

          notify(`Something went wrong, please try again`);
        },
      }
    );
  };

  useEffect(() => {
    if (!isAddMode && !isEmpty(detailContact)) {
      trigger();
    }
  }, [detailContact]);

  const content = (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='firstName'>First name:</label>

        <Controller
          name='firstName'
          control={control}
          defaultValue={detailContact?.firstName || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.firstName,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='firstName'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='lastName'>Last name:</label>

        <Controller
          name='lastName'
          control={control}
          defaultValue={detailContact?.lastName || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.lastName,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='lastName'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='lastName'>Job:</label>

        <Controller
          name='job'
          control={control}
          defaultValue={detailContact?.job || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.job,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='job'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='lastName'>Description:</label>

        <Controller
          name='description'
          control={control}
          defaultValue={detailContact?.description || ""}
          rules={{
            required: "This field is required",
            validate: contactValidation.description,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='description'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>
    </div>
  );

  const loaderContent = (
    <div className='flex justify-center h-full mt-8'>
      <Loader />
    </div>
  );

  return (
    <Modal
      title={isAddMode ? "Add Contact" : "Edit Contact"}
      content={!isAddMode && isLoading ? loaderContent : content}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isDisableSubmit={!isDirty || !isValid}
      size='large'
    />
  );
};

export default ContactModalAddEdit;
