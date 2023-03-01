import { getSession, commitSession } from "~/sessions";
import type { ActionFunction } from "@remix-run/router";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));

  session.set("preview", "yes");

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
