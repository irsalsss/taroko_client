"use client";

import { useGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactCard from "../contact-card/contact-card";
import ContactHeader from "../contact-header/contact-header";
import Tab from "@/components/shared/tab/tab";
import Modal from "@/components/shared/modal/modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import ContactModalAddEdit from "../contact-modal-add-edit/contact-modal-add-edit";
import useDeleteContact from "@/api/contact/@mutation/use-delete-contact/use-delete-contact";
import { notify } from "@/components/shared/toaster/toaster";
import { ERROR_NOT_FOUND } from "@/constants/error";
import ContactInterface from "@/interfaces/contact/contact.interface";
import ContactTabEnum from "@/app/enum/contact/contact-tab.enum";
import { useSearchParams } from "next/navigation";
import { lowerCase } from "lodash-es";

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

  const query = useSearchParams();

  const search = query.get("search") ?? "";

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

  const handleFavoriteContact = useCallback(
    (contact: ContactInterface) => {
      const currentFavorites = { ...favoriteContacs };

      if (favoriteContacs.hasOwnProperty(contact.id)) {
        delete currentFavorites[contact.id];
        notify(
          `${contact.firstName} ${contact.lastName} has been removed from favorite`
        );
      } else {
        currentFavorites[contact.id] = contact;
        notify(
          `${contact.firstName} ${contact.lastName} has been added to favorite`
        );
      }

      setFavoriteContacs(currentFavorites);
      localStorage.setItem("favorites", JSON.stringify(currentFavorites));
    },
    [favoriteContacs]
  );

  const currentContacts = useMemo(() => {
    const list =
      activeTab === ContactTabEnum.ALL
        ? contacts
        : Object.values(favoriteContacs);

    if (search.length > 0) {
      return list.filter((contact) => {
        const modifiedSearch = lowerCase(search.trim());

        return (
          lowerCase(contact.description).includes(modifiedSearch) ||
          lowerCase(contact.job).includes(modifiedSearch) ||
          lowerCase(contact.firstName + "" + contact.lastName).includes(
            modifiedSearch
          )
        );
      });
    }

    return list;
  }, [activeTab, favoriteContacs, contacts, search]);

  useEffect(() => {
    const localFavorites = localStorage.getItem("favorites");

    if (localFavorites) {
      const favContacs = JSON.parse(localFavorites);
      setFavoriteContacs(favContacs ?? {});
    }
  }, []);

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
