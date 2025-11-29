"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminRegisterSchema } from "@/types/adminSchema";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { registerService } from "@/services/registerService";

export default function RegisterForm() {
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
        const result = adminRegisterSchema.safeParse(form);

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

        const result = await registerService.registerAdmin(form);

        if (result.success) {
            toast.success("Administrador registrado com sucesso!");
            setForm({ name: "", email: "", password: "" });
            setErrors({});
        } else {
            toast.error(result.error);
        }

        setLoading(false);
    };

    const handleBlur = (field: string) => {
        if (form[field as keyof typeof form]) {
            try {
                const fieldSchema = adminRegisterSchema.pick({ [field]: true });
                fieldSchema.parse({ [field]: form[field as keyof typeof form] });

                if (errors[field]) {
                    setErrors(prev => ({ ...prev, [field]: "" }));
                }
            } catch (error: any) {
               
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-xl shadow-lg border border-border p-8 backdrop-blur-sm">
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
                        <div className="space-y-2">
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
                                    className={`pl-10 transition-all duration-200 ${errors.name
                                        ? "focus-visible:ring-muted-foreground"
                                        : "focus-visible:ring-primary"
                                        }`}
                                />
                            </div>

                            {errors.name && (
                                <p className="text-destructive text-sm flex items-center gap-1 animate-in fade-in duration-200">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
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
                                    className={`pl-10 transition-all duration-200 ${errors.email
                                        ? " focus-visible:ring-muted-foreground"
                                        : "focus-visible:ring-primary"
                                        }`}
                                />
                            </div>

                            {errors.email && (
                                <p className="text-destructive text-sm flex items-center gap-1 animate-in fade-in duration-200">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
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
                                    className={`pl-10 pr-10 transition-all duration-200 ${errors.password
                                        ? "focus-visible:ring-muted-foreground"
                                        : "focus-visible:ring-primary"
                                        }`}
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
                            disabled={loading}
                            className="w-full h-11 font-montserrat font-medium transition-all duration-200 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

                    <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-xs text-muted-foreground text-center font-lato">
                            Ao criar uma conta, você concorda com nossos{" "}
                            <a href="#" className="text-primary hover:underline font-medium">
                                Termos de Serviço
                            </a>{" "}
                            e{" "}
                            <a href="#" className="text-primary hover:underline font-medium">
                                Política de Privacidade
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}