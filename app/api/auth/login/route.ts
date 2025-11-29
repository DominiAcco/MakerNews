import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/admin";
import { AuthService } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Verificar senha
    const isPasswordValid = await AuthService.comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Gerar token (agora é async)
    const token = await AuthService.generateToken({
      userId: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role
    });

    console.log("✅ Token gerado para:", admin.email);

    // Criar response
    const response = NextResponse.json({
      success: true,
      user: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

    // Configurar cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    console.log("✅ Cookie 'token' configurado");

    return response;

  } catch (error) {
    console.error("❌ ERRO API LOGIN:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}