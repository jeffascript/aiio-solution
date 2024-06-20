import React, { forwardRef } from "react";
import CheckBoxInput from "@/atoms/CheckboxInput";
import SelectInput from "@/atoms/SelectInput";
import SearchInput from "@/atoms/SearchInput";

type PolymorphicInputProps<T extends React.ElementType> = {
  as?: T;
  type?: "checkbox" | "select" | "search";
  options?: string[]; // Only for select type
  name: string;
} & React.ComponentPropsWithoutRef<T>;

const PolymorphicInput = forwardRef(
  <T extends React.ElementType = "input">(
    { as, type, options = [], name, ...props }: PolymorphicInputProps<T>,
    ref: React.Ref<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
  ) => {
    const Component = as || "input";

    switch (type) {
      case "checkbox":
        return (
          <CheckBoxInput
            {...props}
            ref={ref as React.Ref<HTMLInputElement>}
            name={name}
          />
        );
      case "select":
        return (
          <SelectInput
            ref={ref as React.Ref<HTMLSelectElement>}
            name={name}
            options={options || []}
            {...props}
          />
        );
      case "search":
        return (
          <SearchInput
            ref={ref as React.Ref<HTMLInputElement>}
            name={name}
            {...props}
          />
        );
      default:
        return (
          <Component
            ref={ref as React.Ref<HTMLInputElement>}
            name={name}
            {...props}
          />
        );
    }
  }
);

export default PolymorphicInput;
