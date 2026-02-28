"use server";

import z from "zod";
import { createRoomSchema } from "../schemas/rooms";
import { getCurrentUser } from "../lib/getCurrentUser";
import { createClient } from "../client";
import { redirect } from "next/navigation";
import { createAdminClient } from "../server";

/**
 * Server action to create a new chat room and add the current user as a member.
 *
 * @param unsafeData - The unvalidated payload containing the room name and privacy setting.
 * @returns An object with error and message if failed, or redirects to the new room on success.
 */
export async function createRoom(unsafeData: z.infer<typeof createRoomSchema>) {
  // 1. Validate the incoming data against our Zod schema
  const { success, data } = createRoomSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "Invalid room data",
    };
  }

  // 2. Fetch the currently authenticated user
  const user = await getCurrentUser();

  if (user == null) return { error: true, message: "User not authenticated" };

  // 3. Create a Supabase admin client to bypass RLS since the user doesn't have
  // permission to insert a room before they are a member (depending on RLS setup)
  // or simply because we are doing a trusted server-side operation.
  const supabase = await createAdminClient();

  // 4. Insert the new chat room record
  const { data: room, error: roomError } = await supabase
    .from("chat_room")
    .insert({
      name: data.name,
      is_public: data.isPublic,
      user_id: user.id,
    })
    .select()
    .single();

  if (roomError || room == null) {
    return {
      error: true,
      message: "Failed to create room",
    };
  }

  // 5. Add the user who created the room as its first member
  const { error: membershipError } = await supabase
    .from("chat_room_member")
    .insert({
      chat_room_id: room.id,
      member_id: user.id,
    });

  if (membershipError) {
    return {
      error: true,
      message: "Failed to create room membership",
    };
  }

  // 6. Redirect the user to their newly created room
  redirect(`/rooms/${room.id}`);
}
