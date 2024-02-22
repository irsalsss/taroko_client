'use client'

import { useGetContactsQuery } from '@/api/contact/@query/use-get-contacts/use-get-contacts'
import ContactCard from '../contact-card/contact-card'
import ContactHeader from '../contact-header/contact-header'
import Tab from '@/components/shared/tab/tab'

const tabOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Favorites',
    value: 'favorites'
  },
]

const ContactList = () => {
  // const { data } = useGetContactsQuery()

  return (
    <div className="p-4">
      <ContactHeader />

      <div className='px-4'>
        <Tab options={tabOptions} />
      </div>

      <ContactCard />
    </div>
  )
}

export default ContactList