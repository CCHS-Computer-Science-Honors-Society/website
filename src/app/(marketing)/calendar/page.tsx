import { Skeleton } from "@/components/ui/skeleton";
import Upcoming from "@/components/upcoming";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Calendar | Cherry Creek Computer Science Honor Society",
    description:
      "Upcoming events and meetings for the Cherry Creek Computer Science Honor Society.",
  };
}
const FallbackLoader = () => {
  return (
    <div className="container mb-32">
      <div className="mb-12">
        <Skeleton className="mb-4 h-8 w-72" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="rounded-2xl border border-border bg-white p-8 dark:bg-[#121212] md:p-10">
        <div className="flex flex-row justify-between pb-4">
          <div className="flex">
            <Skeleton className="mr-4 h-6 w-24" />
            <Skeleton className="hidden h-6 w-32 md:block" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-16">
          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const session = await getServerAuthSession();
  const user = {
    id: session?.user?.id,
    isAdmin: session?.user?.isAdmin ?? false,
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Suspense fallback={<FallbackLoader />}>
        <Upcoming user={user} />
      </Suspense>
    </div>
  );
}
