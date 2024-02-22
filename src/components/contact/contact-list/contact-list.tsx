"use client";

import { useGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactCard from "../contact-card/contact-card";
import ContactHeader from "../contact-header/contact-header";
import Tab from "@/components/shared/tab/tab";

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
  const { data: contacts = [] } = useGetContactsQuery();

  const handleDeleteContact = () => {
    // TODO: will be implemented on card {card-number}
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
            onDeleteContact={handleDeleteContact}
            onEditContact={handleEditContact}
            onFavoriteContact={handleFavoriteContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
