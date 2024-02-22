import { prefetchGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactList from "@/components/contact/contact-list/contact-list";
import queryClient from "@/utils/query-client-server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const ContactsPage = () => {
  // prefetchGetContactsQuery()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactList />
    </HydrationBoundary>
  )
}

export default ContactsPage