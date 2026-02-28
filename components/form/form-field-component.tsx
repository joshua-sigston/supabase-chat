"use client";

import { Field, FieldError } from "@/components/ui/field";
import { Input } from "../ui/input";
import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";

interface FormFieldComponentProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
}

export default function FormFieldComponent<T extends FieldValues>({
  name,
  form,
}: FormFieldComponentProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Input
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder="Create Room Name"
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
