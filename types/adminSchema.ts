import { z } from 'zod';

export type AdminData = {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export const AdminRegisterSchema = z.object({
    name: z.string()
        .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
        .max(100, { message: "Nome muito longo" })
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" }),

    email: z.email({ message: "E-mail inválido" })
        .min(1, { message: "E-mail é obrigatório" })
        .max(100, { message: "E-mail muito longo" }),

    password: z.string()
        .min(9, { message: "Senha deve ter pelo menos 9 caracteres" })
        .max(100, { message: "Senha muito longa" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
            {message:"Senha deve conter letra maiúscula, minúscula, número e caractere especial",})
});

export const AdminEditSchema = AdminRegisterSchema.pick({
  name: true,
  email: true
});

export const AdminLoginSchema = z.object({
  email: AdminRegisterSchema.shape.email,
  password: AdminRegisterSchema.shape.password,
});

export type AdminFormData = z.infer<typeof AdminRegisterSchema>;
export type AdminLoginFormData = z.infer<typeof AdminLoginSchema>;
