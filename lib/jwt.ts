import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJwt(payload: Record<string, unknown>, expiresIn = process.env.JWT_EXPIRES_IN || "7d") {
     
  const now = Math.floor(Date.now() / 1000);
  const exp = (() => {
    
    const match = /^(\d+)([smhd])$/.exec(expiresIn);
    if (match) {
      const n = Number(match[1]);
      const unit = match[2];
      switch (unit) {
        case "s": return now + n;
        case "m": return now + n * 60;
        case "h": return now + n * 3600;
        case "d": return now + n * 3600 * 24;
      }
    }
    
    return now + 7 * 24 * 3600;
  })();

  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: err };
  }
}