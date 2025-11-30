import api from "@/lib/api";
import { AdminData, AdminFormData } from "@/types/adminSchema";

const RESOURCE = "/adminUser";

export const AdminService = {
    list: async (): Promise<AdminData[]> => {
        const response = await api.get<AdminData[]>(RESOURCE, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    },

    create: async (data: AdminFormData): Promise<AdminData> => {
        const response = await api.post(RESOURCE, {
            name: data.name,
            email: data.email,
            password: data.password,
        });
        return response.data;
    },

    update: async (id: string, data: Partial<AdminFormData>): Promise<AdminData> => {
        const response = await api.put<AdminData>(`${RESOURCE}/${id}`, {
            name: data.name,
            email: data.email,
            password: data.password,
        });
        return response.data;
    },

    delete: async (id: string) => {
        const { data } = await api.delete(`${RESOURCE}/${id}`);
        return data;
    },
};


