"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AdminLoginFormData, AdminLoginSchema } from "@/types/adminSchema";
import { LoginService } from "@/services/loginService";

export default function LoginForm() {
    const router = useRouter();

    const [form, setForm] = useState<AdminLoginFormData>({ email: "", password: "" });
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
        const result = AdminLoginSchema.safeParse(form);

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

    const handleBlur = (field: string) => {
        if (form[field as keyof typeof form]) {
            try {
                const fieldSchema = AdminLoginSchema.pick({ [field]: true });
                fieldSchema.parse({ [field]: form[field as keyof typeof form] });

                if (errors[field]) {
                    setErrors(prev => ({ ...prev, [field]: "" }));
                }
            } catch (err: any) {
                const message = err.errors?.[0]?.message;
                if (message) {
                    setErrors(prev => ({ ...prev, [field]: message }));
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            await LoginService.login(form);
            toast.success("Login realizado com sucesso!");
            router.push("/admin/dashboard");
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Erro ao fazer login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-xl shadow-lg border border-border p-8 backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-card-foreground">
                            Login Administrativo
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Acesse o painel de publicações
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-card-foreground">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
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

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-card-foreground">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Sua senha"
                                    value={form.password}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("password")}
                                    className="pl-10 pr-10"
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
                            className="w-full h-11 font-medium transition-all duration-200 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    <span>Entrando...</span>
                                </div>
                            ) : (
                                "Entrar"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
