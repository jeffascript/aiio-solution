import { forwardRef } from "react";

type CheckboxInputProps = {
  name: string;
  label: string;
  id: number | string;
} & React.ComponentPropsWithoutRef<"input">;

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <>
        <label htmlFor={id.toString()}>{label}</label>
        <input type="checkbox" ref={ref} {...props} />
      </>
    );
  }
);

export default CheckboxInput;
