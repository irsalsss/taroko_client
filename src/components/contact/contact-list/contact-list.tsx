"use client";

import { useGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactCard from "../contact-card/contact-card";
import ContactHeader from "../contact-header/contact-header";
import Tab from "@/components/shared/tab/tab";
import Modal from "@/components/shared/modal/modal";
import { useState } from "react";

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
  const [openModal, setOpenModal] = useState(0);
  const { data: contacts = [] } = useGetContactsQuery();

  const handleOpenModalDelete = (id: number) => {
    setOpenModal(id);
  };

  const handleEditContact = () => {
    // TODO: will be implemented on card {card-number}
  };

  const handleFavoriteContact = () => {
    // TODO: will be implemented on card {card-number}
  };

  return (
    <div className='p-4'>
      <ContactHeader />

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

      {openModal > 0 ? (
        <Modal
          title='Delete Contact'
          content='Are you sure want to delete this contact?'
          onClose={() => handleOpenModalDelete(0)}
          onSubmit={() => {}}
        />
      ) : null}
    </div>
  );
};

export default ContactList;
