"use client";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface FormFieldComponentProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
}

export default function FormFieldComponent<T extends FieldValues>({
  name,
  form,
  label,
}: FormFieldComponentProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation="horizontal">
          <Checkbox
            {...field}
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
          <FieldContent>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  );
}
