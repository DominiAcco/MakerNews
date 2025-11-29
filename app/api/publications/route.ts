import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Publication from "@/models/publication";
import z, { ZodError } from "zod"
import { PublicationSchema } from "@/types/publication";
import { AuthService } from "@/lib/auth";
import { cookies } from 'next/headers';

export async function GET() {
  console.log("=== API PUBLICATIONS GET CALLED ===");
  try {
    await connectDB();
    console.log("✅ Conectado ao MongoDB");
    
    const docs = await Publication.find().sort({ createdAt: -1 }).lean();
    console.log(`✅ Encontradas ${docs.length} publicações`);
    
    const publications = (docs as any[]).map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: doc._id.toString()
    }));

    console.log("✅ Retornando publicações:", publications.length);
    return NextResponse.json(publications);
    
  } catch (err) {
    console.error("❌ Erro na API de publicações:", err);
    return NextResponse.json(
      { error: "Erro ao buscar publicações" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    console.log("🔐 Token recebido na API:", token ? `Presente (${token.length} chars)` : "Ausente");

    if (!token) {
      console.log("❌ Token não encontrado");
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
      // ✅ CORREÇÃO: Adicionar AWAIT aqui
      const payload = await AuthService.verifyToken(token);
      console.log("✅ Token válido, userId:", payload.userId);

      await connectDB();
      const body = await req.json();
      console.log("📝 Dados recebidos:", body);

      // Validação dos dados com Zod
      const validatedData = PublicationSchema.parse(body);

      // Criar publicação no banco
      const newPublication = await Publication.create({
        ...validatedData,
        createdBy: payload.userId, // ✅ Agora funciona com await
      });

      console.log("✅ Publicação criada com ID:", newPublication._id);
      return NextResponse.json(newPublication, { status: 201 });

    } catch (tokenError: any) {
      console.error("❌ Erro na verificação do token:", tokenError.message);
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

  } catch (error) {
    console.error("ERRO API PUBLICAÇÕES:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}