import type { LoaderArgs } from "@remix-run/node";
import kv from "@vercel/kv";

export async function loader({ request }: LoaderArgs) {
  await kv.del("common");

  return new Response("Cache invalidated");
}
