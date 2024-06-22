"use server";

import { prisma } from "@/lib/db";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: formDataRaw.email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    console.log(formDataRaw.password, user.hashedPassword);
    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      formDataRaw.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    // console.log(session);
    // console.log("first");
    // console.log(sessionCookie);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.log(error);
  }
};
export default signIn;
