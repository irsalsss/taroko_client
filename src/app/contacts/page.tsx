import { prefetchGetContactsQuery } from "@/api/contact/@query/use-get-contacts/use-get-contacts";
import ContactContainer from "@/components/contact/contact-container/contact-container";
import queryClient from "@/utils/query-client-server/query-client-server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const ContactsPage = () => {
  prefetchGetContactsQuery();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactContainer />
    </HydrationBoundary>
  );
};

export default ContactsPage;
