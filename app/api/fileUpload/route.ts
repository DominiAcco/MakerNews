import { requireAdmin } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

function extractPublicId(url: string): string | null {
    if (!url) return null;

    const parts = url.split("/");
    const file = parts.pop();
    const folder = parts.pop();

    if (!file || !folder) return null;

    return `${folder}/${file.split(".")[0]}`;
}

export async function POST() {
    const admin = await requireAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: "publications" },
        process.env.CLOUDINARY_SECRET_KEY!
    );

    return NextResponse.json({
        timestamp,
        signature,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        folder: "publications"
    });
}

export async function DELETE(req: NextRequest) {
    try {
        const admin = await requireAdmin();

        if (!admin) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { imageUrl } = await req.json();

        if (!imageUrl)
            return NextResponse.json({ error: "URL não enviada" }, { status: 400 });

        const publicId = extractPublicId(imageUrl);

        if (!publicId)
            return NextResponse.json({ error: "public_id inválido" }, { status: 400 });

        await cloudinary.uploader.destroy(publicId);

        return NextResponse.json({ success: true });

    } catch (err) {
        return NextResponse.json(
            { error: "Erro ao deletar imagem" },
            { status: 500 }
        );
    }
}