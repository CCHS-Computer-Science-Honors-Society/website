import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Mew() {
  const session = await getServerAuthSession();
  if (!session?.user.isAdmin) {
    redirect(`/api/auth/signin`);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center text-5xl">
      🤫🧏
    </div>
  );
}
