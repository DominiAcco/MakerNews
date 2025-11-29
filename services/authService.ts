export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    error?: string;
}

export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include" // ✅ IMPORTANTE
      });

      const responseData = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: responseData.error || "Erro ao fazer login"
        };
      }

      return { success: true, user: responseData.user };
    } catch (error: any) {
      console.error("Erro no serviço de login:", error);
      return {
        success: false,
        error: "Erro de conexão. Tente novamente."
      };
    }
  },

  async getCurrentUser() {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // ✅ IMPORTANTE
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        return data.user;
      }
      return null;
    } catch {
      return null;
    }
  }
};