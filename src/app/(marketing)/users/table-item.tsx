"use client";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TableCell, TableRow } from "@/components/ui/table";
import type { RouterOutput } from "@/server/api/root";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  name: z.string(),
  isAdmin: z.boolean(),
});

export const TableItem = (props: {
  user: RouterOutput["user"]["getTableData"][0];
}) => {
  const { mutate } = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("User updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.user.name!,
      isAdmin: props.user.isAdmin,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate({
      id: props.user.id,
      ...data,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <TableRow>
            <TableCell className="font-semibold">{props.user.id}</TableCell>

            <TableCell className="font-semibold">{props.user.email}</TableCell>
            <TableCell className="font-semibold">
              {props.user.attendances}
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TableCell>
          </TableRow>
        </form>
      </Form>
    </div>
  );
};
