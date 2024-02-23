"use client";

import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import { createQueryString } from "@/utils/create-query-string/create-query-string";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { debounce } from "lodash-es";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

interface ContactHeaderProps {
  onOpenModalAdd: (id: number) => void;
}

const Header = ({ onOpenModalAdd }: ContactHeaderProps) => {
  const pathname = usePathname();
  const query = useSearchParams();
  const { push } = useRouter();

  const search = query.get("search") ?? "";

  const [value, setValue] = useState(search);

  const handleDebounceFn = debounce((keyword: string) => {
    push(
      pathname + "?" + createQueryString(query.toString(), "search", keyword)
    );

    // TODO: do client filter here
  }, 1000);

  const handleSearch = (keyword: string) => {
    handleDebounceFn(keyword);
    setValue(keyword);
  };

  return (
    <div className='flex flex-wrap items-center justify-between w-full px-4 gap-4'>
      <h3>Contact List</h3>

      <Input
        type='text'
        placeholder='search here...'
        onChange={(e) => handleSearch(e.target.value)}
        value={value}
        icon={<MagnifyingGlassIcon />}
      />

      <Button label='Add' onClick={() => onOpenModalAdd(0)} />
    </div>
  );
};

const ContactHeader = (props: ContactHeaderProps) => {
  return (
    <Suspense>
      <Header {...props} />
    </Suspense>
  );
};

export default ContactHeader;
