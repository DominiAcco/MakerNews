import api from "@/lib/api";
import { AdminLoginFormData } from "@/types/adminSchema";

export const LoginService = {
  login: async (data: AdminLoginFormData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
