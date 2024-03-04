import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SessionProviders = async ({ children }: Props) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviders;
