import { CircleAlert } from "lucide-react";
import React from "react";

export default function ErrorNotification({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="w-full h-9 bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <CircleAlert className="h-4 w-4" />

      <p>{message}</p>
    </div>
  );
}
