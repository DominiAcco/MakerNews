import api from "@/lib/api";
import { AdminData, AdminFormData } from "@/types/adminSchema";


const RESOURCE = "/register";

export const AdminService = {
    create: async (data: AdminFormData): Promise<AdminData> => {
        const response = await api.post(RESOURCE, {
            name: data.name,
            email: data.email,
            password: data.password,
        });
        return response.data;
    },
};
