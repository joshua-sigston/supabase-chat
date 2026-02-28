import CreateRoomButton from "@/components/animate-btn";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MessagesSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="h-full grid place-items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-12">
            <MessagesSquare className="size-6" />
          </EmptyMedia>
          <EmptyTitle className="text-4xl text-white font-bold">
            No Chat Rooms
          </EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty text-md">
            Create your first chat room to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateRoomButton />
        </EmptyContent>
      </Empty>
    </div>
  );
}
