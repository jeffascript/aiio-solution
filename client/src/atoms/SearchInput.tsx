import React, { forwardRef } from "react";

type SearchInputProps = {
  name: string;
} & React.ComponentPropsWithoutRef<"input">;

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = "Search...", ...props }, ref) => {
    return (
      <input type="search" ref={ref} placeholder={placeholder} {...props} />
    );
  }
);

export default SearchInput;
