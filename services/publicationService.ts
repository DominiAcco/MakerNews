import api from "@/lib/api";
import { PublicationData, PublicationFormData } from "@/types/publication";

const RESOURCE = "/publications";

export const PublicationService = {
    async list(): Promise<PublicationData[]> {
        try {
            const res = await fetch("/api/publications", {
                method: "GET",
                credentials: "include" // Importante para enviar cookies
            });

            if (!res.ok) {
                throw new Error(`Erro ${res.status}: ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            console.error("Erro no PublicationService.list:", error);
            throw error;
        }
    },

    async create(data: any): Promise<PublicationData> {
        try {
            console.log("📤 Enviando dados para criação de publicação:", data);
            console.log("🔐 Verificando se há token...");

            // Verificar se há token antes de fazer a requisição
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            console.log("🔐 Token presente nos cookies:", !!token);

            const res = await fetch("/api/publications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            console.log("📨 Status da resposta:", res.status);
            console.log("📨 URL da resposta:", res.url);

            if (!res.ok) {
                const errorData = await res.json();
                console.error("❌ Erro na resposta:", errorData);
                throw new Error(errorData.error || `Erro ${res.status} ao criar publicação`);
            }

            const result = await res.json();
            console.log("✅ Publicação criada com sucesso:", result);
            return result;

        } catch (error: any) {
            console.error("❌ Erro no PublicationService.create:", error);
            throw error;
        }
    },

    update: async (id: string, data: PublicationFormData): Promise<PublicationData> => {
        const response = await api.put<PublicationData>(`${RESOURCE}/${id}`, {
            title: data.title,
            description: data.description,
            status: data.status,
            category: data.category,
            createdBy: data.createdBy,
        });
        return response.data;
    },
    delete: async (id: string) => {
        const { data } = await api.delete(`/publications/${id}`);
        return data;
    },

};  