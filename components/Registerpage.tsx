"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminRegisterSchema } from "@/types/adminSchema";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { AdminService } from "@/services/adminService";

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const result = AdminRegisterSchema.safeParse(form);

        if (result.success) {
            setErrors({});
            return true;
        }

        const fieldErrors = result.error.flatten().fieldErrors;
        const formattedErrors: { [k: string]: string } = {};

        for (const key in fieldErrors) {
            const arr = fieldErrors[key as keyof typeof fieldErrors];
            if (Array.isArray(arr) && arr.length > 0) {
                formattedErrors[key] = arr[0];
            }
        }

        setErrors(formattedErrors);

        const firstError = Object.values(formattedErrors)[0];
        if (firstError) toast.error(firstError);

        return false;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            await AdminService.create(form);

            toast.success("Administrador registrado com sucesso!");
            setForm({ name: "", email: "", password: "" });
            setErrors({});

            if (onSuccess) onSuccess();

        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Erro ao registrar administrador");

        } finally {
            setLoading(false);
        }
    };


    const handleBlur = (field: string) => {
        if (form[field as keyof typeof form]) {
            try {
                const fieldSchema = AdminRegisterSchema.pick({ [field]: true });
                fieldSchema.parse({ [field]: form[field as keyof typeof form] });

                if (errors[field]) {
                    setErrors(prev => ({ ...prev, [field]: "" }));
                }
            } catch (error: any) {

            }
        }
    };

    return (
        <div className="mb-10">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-card-foreground font-montserrat">
                    Criar Conta
                </h1>
                <p className="text-muted-foreground mt-2 font-lato">
                    Preencha os dados para registrar um novo administrador
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="gap-4 flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-card-foreground font-montserrat">
                        Nome completo
                    </label>

                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="name"
                            name="name"
                            placeholder="Digite seu nome completo"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={() => handleBlur("name")}
                            className="pl-10"
                        />
                    </div>

                    {errors.name && (
                        <p className="text-destructive text-sm flex items-center gap-1 animate-in fade-in duration-200">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="gap-4 flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-card-foreground font-montserrat">
                        E-mail
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={() => handleBlur("email")}
                            className="pl-10"
                        />
                    </div>

                    {errors.email && (
                        <p className="text-destructive text-sm flex items-center gap-1 animate-in fade-in duration-200">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="gap-4 flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-card-foreground font-montserrat">
                        Senha
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Crie uma senha segura"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={() => handleBlur("password")}
                            className="pl-10"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-destructive text-sm flex items-center gap-1 animate-in fade-in duration-200">
                            {errors.password}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="purple"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            <span>Registrando...</span>
                        </div>
                    ) : (
                        "Criar Conta"
                    )}
                </Button>
            </form>
        </div>
    );
}