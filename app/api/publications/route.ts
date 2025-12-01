import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Publication from "@/models/publication";
import z, { ZodError } from "zod"
import { PublicationSchema } from "@/types/publication";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const docs = await Publication.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(docs);
  } catch (err) {
    return NextResponse.json({ error: "Erro ao buscar publicações" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const data = PublicationSchema.parse(body);
    await connectDB();
    const created = await Publication.create(data);

    return NextResponse.json(created, { status: 201 });

  } catch (err: any) {
    console.error(err);

    if (err instanceof ZodError) {
      return NextResponse.json(
        { errors: z.treeifyError(err) },
        { status: 400 }
      );
    }

    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno ao criar publicação" },
      { status: 500 }
    );
  }
}
