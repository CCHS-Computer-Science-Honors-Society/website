"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/ui/multiselect";
import { api } from "@/trpc/react";
import { useState } from "react";
import { toast } from "sonner";

export function Log({
  usersMap,
  meetingId,
}: {
  usersMap: {
    label: string;
    value: string;
  }[];
  meetingId: number;
}) {
  const [userIds, setUserIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { mutate: log } = api.meetings.log.useMutation({
    onSuccess: () => {
      setOpen(false);
      toast.success("Logged");
    },
  });

  function onSubmit() {
    // format the data to { userId, meetingId }[]
    const data = userIds.map((userId) => ({ userId, meetingId }));
    log({
      data,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log</DialogTitle>
        </DialogHeader>
        <div>
          <MultiSelect
            options={usersMap}
            defaultValue={userIds}
            onValueChange={setUserIds}
            placeholder="Select users"
            variant="inverted"
            animation={2}
            maxCount={3}
          />
          <div className="h-4" />
          <Button onClick={onSubmit}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
