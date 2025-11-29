
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import Admin from "@/models/admin";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 400 });
    }

    const admin = await Admin.findOne({ email }).lean() as
      | { _id: string; email: string; password: string; role: string }
      | null;

    if (!admin) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const passwordMatches = await bcrypt.compare(password, admin.password);
    if (!passwordMatches) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const token = await signJwt({
      sub: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    const response = NextResponse.json({ message: "Login realizado com sucesso" });

    response.cookies.set("makernews_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
