export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    error?: string;
}

export const registerService = {
    async registerAdmin(data: RegisterData): Promise<RegisterResponse> {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    error: responseData.error || "Erro ao registrar administrador"
                };
            }

            return { success: true };
        } catch (error: any) {
            console.error("Erro no serviço de registro:", error);
            return {
                success: false,
                error: "Erro de conexão. Tente novamente."
            };
        }
    }
};