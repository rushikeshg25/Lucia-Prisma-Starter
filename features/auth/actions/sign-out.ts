"use server";

import { redirect } from "next/navigation";
import { getAuth } from "../queries/get-auth";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

const signOut = async () => {
  const { session } = await getAuth();

  if (!session) redirect("/sign-in");

  await lucia.invalidateSession(session?.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/sign-in");
};

export { signOut };
