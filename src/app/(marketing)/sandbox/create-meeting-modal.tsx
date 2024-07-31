/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { z } from "zod";
import { DateTimePicker } from "@/components/ui/dt-picker";

const schema = z.object({
  date: z.object({
    date: z.date(),
    hasTime: z.boolean().default(true),
  }),
  name: z.string().nullable().optional(),
  isEvent: z.boolean().optional(),
  location: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export const CreateMeetingModal = ({ authorId }: { authorId: string }) => {
  const router = useRouter();
  const { mutate: create } = api.meetings.create.useMutation({
    onSuccess: () => {
      toast.success("Meeting created");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isEvent: false,
      isPublic: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast(
      "form" +
        data.date.date.toString() +
        format(data.date.date, "hh:mm a") +
        data.date.hasTime,
    );
    console.log("form date" + data.date.date.toISOString());
    create({
      createdById: authorId,
      date: data.date.date,
      name: data.name,
      isEvent: data.isEvent,
      location: data.location,
      isPublic: data.isPublic,
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Meeting</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <DialogTitle>Create a Meeting</DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <DateTimePicker {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isEvent"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Is this an event?</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormDescription>This field is optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Is this public?</FormLabel>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <div>
            <DialogClose>Close</DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
