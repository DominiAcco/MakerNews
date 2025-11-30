import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongoose";
import Publication from "@/models/publication";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {

    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }
    
    const { id } = await ctx.params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const doc = await Publication.findById(id).lean();

    if (!doc) {
      return NextResponse.json(
        { error: "Publication not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doc);

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Error fetching publication" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {

    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { id } = await ctx.params;
    const body = await req.json();
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const allowedFields = ["title", "description", "category", "status"];

    const filteredData: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) {
        filteredData[key] = body[key];
      }
    }

    if (Object.keys(filteredData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 }
      );
    }

    const updated = await Publication.findByIdAndUpdate(id, filteredData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Publication not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);

  } catch (err: any) {
    console.error("PUT error:", err);

    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Error updating publication" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {

    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { id } = await ctx.params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const deleted = await Publication.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { error: "Publication not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Publication deleted successfully" });

  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: "Error deleting publication" },
      { status: 500 }
    );
  }
}