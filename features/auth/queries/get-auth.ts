import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { lucia } from "@/lib/lucia";

export const getAuth = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    // console.log(cookies());
    // console.log(cookies().get(lucia.sessionCookieName));
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // console.log("result", result);
    // console.log(result.session);
    // console.log(result.session?.fresh);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);
