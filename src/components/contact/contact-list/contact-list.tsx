'use client'

import { useGetContactsQuery } from '@/api/contact/@query/use-get-contacts/use-get-contacts'

const ContactList = () => {
  const { data } = useGetContactsQuery()

  return (
    <div>ContactList</div>
  )
}

export default ContactList