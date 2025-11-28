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
            status: data.status,
            category: data.category,
            createdBy: data.createdBy,
            image_url: data.image_url,
        });
        return response.data;
    }

};  