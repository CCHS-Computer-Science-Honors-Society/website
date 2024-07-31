import "@/styles/globals.css";

import { NavbarDemo } from "@/components/nav";
import { getServerAuthSession } from "@/server/auth";


export const metadata = {
  title: "Cherry Creek Computer Science Honor Society",
  description: "The offical website of the Cherry Creek Computer Science Honor Society",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <NavbarDemo isAuthed={session?.user ? true : false} isAdmin={session?.user?.isAdmin ?? false} />
      {children}
    </div>
  );
}
