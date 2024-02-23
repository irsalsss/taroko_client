"use client";

import useCreateContact from "@/api/contact/@mutation/use-create-contact/use-create-contact";
import Input from "@/components/shared/input/input";
import Modal from "@/components/shared/modal/modal";
import { ContactFormField } from "@/interfaces/contact/contact.interface";
import { contactValidation } from "@/validations/contact/contact.validation";
import { Controller, useForm } from "react-hook-form";

interface ContactModalAddEditProps {
  activeId: number;
  onClose: () => void;
}

const ContactModalAddEdit = ({
  activeId,
  onClose,
}: ContactModalAddEditProps) => {
  const isAddMode = activeId === 0;

  const { mutate: createContact } = useCreateContact();

  const { control, handleSubmit } = useForm<ContactFormField>({
    mode: "onChange",
  });

  const onSubmit = (data: ContactFormField) => {
    createContact(data, {
      onSuccess: () => {
        console.log("successfully created");
      },
      onError: () => {
        console.log("error created");
      },
    });
  };

  const content = (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='firstName'>First name:</label>

        <Controller
          name='firstName'
          control={control}
          defaultValue=''
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
          defaultValue=''
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
          defaultValue=''
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
          defaultValue=''
          rules={{
            required: "This field is required",
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

  return (
    <Modal
      title={isAddMode ? "Add Contact" : "Edit Contact"}
      content={content}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      size='large'
    />
  );
};

export default ContactModalAddEdit;
