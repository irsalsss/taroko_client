"use client";

import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import { createQueryString } from "@/utils/create-query-string/create-query-string";
import { useDebounce } from "@/utils/use-debounce/use-debounce";
import useHasMounted from "@/utils/use-has-mounted/use-has-mounted";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface ContactHeaderProps {
  onOpenModalAdd: (id: number) => void;
}

const Header = ({ onOpenModalAdd }: ContactHeaderProps) => {
  const pathname = usePathname();
  const { push } = useRouter();

  const query = useSearchParams();
  const hasMounted = useHasMounted();

  const search = query.get("search") ?? "";

  const [value, setValue] = useState(search);
  const debouncedValue = useDebounce<string>(value, 500);

  const handleSearch = (keyword: string) => {
    setValue(keyword);
  };

  useEffect(() => {
    if (hasMounted) {
      push(
        pathname +
          "?" +
          createQueryString(query.toString(), "search", debouncedValue)
      );
    }
  }, [debouncedValue]);

  return (
    <div className='flex flex-wrap items-center justify-between w-full px-4 gap-4'>
      <h3>Contact List</h3>

      <Input
        type='text'
        placeholder='search fullname, job, description...'
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
