"use client";

import { useGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactCard from "../contact-card/contact-card";
import ContactHeader from "../contact-header/contact-header";
import Tab from "@/components/shared/tab/tab";
import Modal from "@/components/shared/modal/modal";
import { useMemo, useState } from "react";
import ContactModalAddEdit from "../contact-modal-add-edit/contact-modal-add-edit";
import useDeleteContact from "@/api/contact/@mutation/use-delete-contact/use-delete-contact";
import { notify } from "@/components/shared/toaster/toaster";
import { ERROR_NOT_FOUND } from "@/constants/error";
import ContactInterface from "@/interfaces/contact/contact.interface";
import ContactTabEnum from "@/app/enum/contact/contact-tab.enum";

const tabOptions = [
  {
    label: "All",
    value: ContactTabEnum.ALL,
  },
  {
    label: "Favorites",
    value: ContactTabEnum.FAVORITES,
  },
];

const ContactList = () => {
  const [openModalDelete, setOpenModalDelete] = useState(0);
  const [openModalAddEdit, setOpenModalAddEdit] = useState(-1);
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const [favoriteContacs, setFavoriteContacs] = useState<
    Record<number, ContactInterface>
  >({});

  const { data: contacts = [], refetch } = useGetContactsQuery();

  const { mutate: deleteContact } = useDeleteContact(openModalAddEdit);

  const handleClickTab = (value: string) => {
    setActiveTab(value as ContactTabEnum);
  };

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

  const handleFavoriteContact = (contact: ContactInterface) => {
    if (favoriteContacs.hasOwnProperty(contact.id)) {
      const currentFavorites = { ...favoriteContacs };
      delete currentFavorites[contact.id];

      setFavoriteContacs(currentFavorites);
      return;
    }

    setFavoriteContacs((prev) => ({
      ...prev,
      [contact.id]: contact,
    }));
  };

  const currentContacts = useMemo(() => {
    return activeTab === ContactTabEnum.ALL
      ? contacts
      : Object.values(favoriteContacs);
  }, [activeTab, favoriteContacs, contacts]);

  return (
    <div className='p-4'>
      <ContactHeader onOpenModalAdd={handleOpenModalAddEdit} />

      <div className='px-4 mt-4'>
        <Tab
          options={tabOptions}
          onClickTab={handleClickTab}
          defaultValue={activeTab}
        />
      </div>

      {currentContacts.length === 0 ? (
        <div className='flex justify-center items-center p-8 mt-8'>
          <h5>
            The {activeTab === ContactTabEnum.ALL ? "contacts" : "favorites"} is
            empty...
          </h5>
        </div>
      ) : null}

      {/* TODO: sort */}

      <div className='flex flex-wrap gap-4 px-4 mt-4'>
        {currentContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            isFavorite={favoriteContacs.hasOwnProperty(contact.id)}
            onDeleteContact={() => handleOpenModalDelete(contact.id)}
            onEditContact={() => handleOpenModalAddEdit(contact.id)}
            onFavoriteContact={() => handleFavoriteContact(contact)}
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
