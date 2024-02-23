"use client";

import { useGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactCard from "../contact-card/contact-card";
import ContactHeader from "../contact-header/contact-header";
import Tab from "@/components/shared/tab/tab";
import Modal from "@/components/shared/modal/modal";
import { useState } from "react";
import ContactModalAddEdit from "../contact-modal-add-edit/contact-modal-add-edit";
import useDeleteContact from "@/api/contact/@mutation/use-delete-contact/use-delete-contact";
import { notify } from "@/components/shared/toaster/toaster";
import { ERROR_NOT_FOUND } from "@/constants/error";

const tabOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Favorites",
    value: "favorites",
  },
];

const ContactList = () => {
  const [openModalDelete, setOpenModalDelete] = useState(0);
  const [openModalAddEdit, setOpenModalAddEdit] = useState(-1);

  const { data: contacts = [], refetch } = useGetContactsQuery();

  const { mutate: deleteContact } = useDeleteContact();

  const handleOpenModalDelete = (id: number) => {
    setOpenModalDelete(id);
  };

  const handleOpenModalAddEdit = (id: number) => {
    setOpenModalAddEdit(id);
  };

  const handleDeleteContact = () => {
    const id = openModalDelete;

    deleteContact(id, {
      onSuccess: () => {
        const deletedContact = contacts.find((contact) => contact.id === id);

        setOpenModalDelete(0);
        notify(
          `${deletedContact?.firstName} ${deletedContact?.lastName} has been deleted`
        );
        refetch();
      },
      onError: (response) => {
        if (response.statusCode === ERROR_NOT_FOUND) {
          notify(response.message);
          return;
        }

        notify(`Something went wrong, please try again`);
      },
    });
  };

  const handleEditContact = () => {
    // TODO: will be implemented on card {card-number}
  };

  const handleFavoriteContact = () => {
    // TODO: will be implemented on card {card-number}
  };

  return (
    <div className='p-4'>
      <ContactHeader onOpenModalAdd={handleOpenModalAddEdit} />

      <div className='px-4 mt-4'>
        <Tab options={tabOptions} />
      </div>

      <div className='flex flex-wrap gap-4 px-4 mt-4'>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            // TODO: mapping the favorite
            isFavorite={false}
            onDeleteContact={() => handleOpenModalDelete(contact.id)}
            onEditContact={handleEditContact}
            onFavoriteContact={handleFavoriteContact}
          />
        ))}
      </div>

      {openModalDelete > 0 ? (
        <Modal
          title='Delete Contact'
          content='Are you sure want to delete this contact?'
          onClose={() => handleOpenModalDelete(0)}
          onSubmit={handleDeleteContact}
        />
      ) : null}

      {openModalAddEdit > -1 ? (
        <ContactModalAddEdit
          activeId={openModalAddEdit}
          onClose={() => handleOpenModalAddEdit(-1)}
        />
      ) : null}
    </div>
  );
};

export default ContactList;
