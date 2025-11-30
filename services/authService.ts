
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("makernews_token")?.value;
  if (!token) return null;

  const { valid, payload } = await verifyJwt(token);
  if (!valid) return null;

  return payload;  
}
