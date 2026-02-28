"use client";

import AuthFormContainer from "@/components/form/auth-form-container";
import CreateRoomForm from "@/components/form/create-room-form";

export default function NewRoomPage() {
  return (
    <div className="h-full grid place-items-center">
      <AuthFormContainer title="Create Room" description="Create a new room">
        <CreateRoomForm />
      </AuthFormContainer>
    </div>
  );
}
