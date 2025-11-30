import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/admin";
import { hash } from "bcryptjs";
import { adminRegisterSchema } from "@/types/adminSchema";
import { requireAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }
    
    await connectDB();

    const body = await req.json();

    const parsed = adminRegisterSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Erro de validação",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return Response.json(
        { error: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      { message: "Administrador criado com sucesso", adminId: newAdmin._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERRO API REGISTER:", error);
    return Response.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
