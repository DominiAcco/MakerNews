import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Publication from "@/models/publication";

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
    const body = await req.json();
    await connectDB();
    const created = await Publication.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao criar publicação" }, { status: 500 });
  }
}
