import { z } from "zod";
import { CATEGORIES } from "./categories";

export interface CreatedBy {
    userId: string;
    name: string;
    role: string;
}

export interface Publication {
    _id: string;
    title: string;
    description: string;
    category: string;
    status: "published" | "archived";
    createdBy: CreatedBy;
    createdAt: string;
    updatedAt: string;
}


export const PublicationSchema = z.object({
    title: z.string().min(1, "Informe o título"),
    description: z.string().min(1, "Informe a descrição"),
    category: z.enum(CATEGORIES, "Selecione uma categoria"),
    status: z.enum(["published", "archived"]),
    createdBy: z.object({
        userId: z.string(),
        name: z.string(),
        role: z.string(),
    }),
});

export type PublicationFormData = z.infer<typeof PublicationSchema>;
export type Category = PublicationFormData["category"];
export type Status = PublicationFormData["status"];

