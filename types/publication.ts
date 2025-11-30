import { z } from "zod";
import { CATEGORIES } from "../consts/categories";

export type PublicationData = {
    _id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    status: "published" | "archived";
    createdBy: {
        userId: string;
        name: string;
        role: string;
    };
    createdAt: string;
    updatedAt: string;
    image_url?: string,
}

export const PublicationSchema = z.object({
    title: z.string().min(1, "Informe o título"),
    description: z.string().min(1, "Informe a descrição"),
    category: z.enum(CATEGORIES, "Selecione uma categoria"),
    content: z.string().min(1, "Informe o conteúdo"),
    status: z.enum(["published", "archived"]),
    createdBy: z.object({
        userId: z.string(),
        name: z.string(),
        role: z.string(),
    }),
    image_url: z
        .union([
            z.instanceof(File),
            z.string().url().optional(),
            z.literal("").optional(),
        ])
        .optional()
        .refine(
            (value) => {
                if (value instanceof File) {
                    const allowedTypes = ["image/jpeg", "image/png"];
                    const isAllowedType = allowedTypes.includes(value.type);
                    const isUnderLimit = value.size <= 10 * 1024 * 1024;
                    return isAllowedType && isUnderLimit;
                }
                return true;
            },
            {
                message: "Envie uma imagem válida (PNG/JPG, até 10MB)",
            }
        ),
});

export type PublicationFormData = z.infer<typeof PublicationSchema>;
export type Category = PublicationFormData["category"];
export type Status = PublicationFormData["status"];

