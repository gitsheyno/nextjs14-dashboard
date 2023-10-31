"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const [params, setParams] = useState(new URLSearchParams());
  const [term, setTerm] = useState("");

  function handleSearch(term: string) {
    // const params = new URLSearchParams(searchParams);
    setParams(new URLSearchParams(searchParams));
    setTerm(term);
  }

  //------------------<< added debunce >>------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("clicked");
      console.log(
        `pathName = ${pathName} searchParam = ${searchParams.toString()}`
      );
      if (term) params.set("query", term);
      else {
        params.delete("query");
      }

      replace(`${pathName}?${params.toString()}`);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams, term]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
