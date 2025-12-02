import api from "@/lib/api";
import { PublicationData, PublicationFormData } from "@/types/publication";

const RESOURCE = "/publications";

export const PublicationService = {
    list: async (): Promise<PublicationData[]> => {
        const response = await api.get<PublicationData[]>(RESOURCE, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    },

    create: async (data: PublicationFormData): Promise<PublicationData> => {
        const response = await api.post(RESOURCE, {
            title: data.title,
            description: data.description,
            content: data.content,
            status: data.status,
            category: data.category,
            image_url: data.image_url,
        });
        return response.data;
    },

    update: async (id: string, data: PublicationFormData): Promise<PublicationData> => {
        const response = await api.put<PublicationData>(`${RESOURCE}/${id}`, {
            title: data.title,
            description: data.description,
            content: data.content,
            status: data.status,
            category: data.category,
            image_url: data.image_url
        });
        return response.data;
    },

    delete: async (id: string) => {
        const { data } = await api.delete(`${RESOURCE}/${id}`);
        return data;
    },

    getById: async (id: string): Promise<PublicationData | null> => {
        try {
            const res = await api.get(`${RESOURCE}/${id}`);
            return res.data;
        } catch (error: any) {
            return null;
        }
    }



};  