import { CircleCheck } from "lucide-react";
import React from "react";

export default function SuccessNotification({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="h-9 bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CircleCheck className="h-4 w-4" />

      <p>{message}</p>
    </div>
  );
}
