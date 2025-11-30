import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/admin";
import { hash } from "bcryptjs";
import { AdminRegisterSchema } from "@/types/adminSchema";
import { requireAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

        const parsed = AdminRegisterSchema.partial().safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Erro de validação",
                    details: parsed.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const updateData = { ...parsed.data };

        if (updateData.password) {
            updateData.password = await hash(updateData.password, 10);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            params.id,
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedAdmin) {
            return NextResponse.json(
                { error: "Administrador não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Administrador atualizado com sucesso", updatedAdmin },
            { status: 200 }
        );

    } catch (error) {
        console.error("ERRO PUT ADMIN:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const admin = await requireAdmin();

        if (!admin) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        await connectDB();

        const deleted = await Admin.findByIdAndDelete(params.id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Administrador não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Administrador removido com sucesso" },
            { status: 200 }
        );

    } catch (error) {
        console.error("ERRO DELETE ADMIN:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}

