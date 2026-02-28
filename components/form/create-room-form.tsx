"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FieldGroup } from "../ui/field";
import FormFieldComponent from "./form-field-component";
import { Button } from "../ui/button";
import { useState } from "react";
import CheckboxFieldComponent from "./checkbox-field-component";
import { createRoom } from "@/app/services/supabase/actions/rooms";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1).trim(),
  isPublic: z.boolean(),
});

/**
 * CreateRoomForm is a client-side component that provides a UI for creating a new chat room.
 * It uses react-hook-form for state management and Zod for validation.
 */
export default function CreateRoomForm() {
  // 1. Manage loading state to disable the submit button during API calls
  const [isLoading, setIsLoading] = useState(false);

  // 2. Initialize the form with default values and our Zod schema resolver
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      isPublic: false,
    },
    resolver: zodResolver(formSchema),
  });

  // 3. Handle the form submission
  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Call our server action to interact with Supabase
    const { error, message } = await createRoom(data);

    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
    }

    setIsLoading(false);
  }

  // 4. Render the form UI
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        {/* Input field for the room name */}
        <FormFieldComponent name="name" form={form} />
        {/* Toggle for public vs private room */}
        <CheckboxFieldComponent name="isPublic" form={form} label="Public" />
        {/* Submit button, disabled while creating the room */}
        <Button type="submit" disabled={isLoading}>
          Create Room
        </Button>
      </FieldGroup>
    </form>
  );
}
