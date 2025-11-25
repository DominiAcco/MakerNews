"use client";

import { useEffect, useState } from "react";
import PublicationsStatus from "@/components/PublicationsStatus";
import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, SearchIcon, PieChart } from "lucide-react";
import CategoryChart from "@/components/CategoryChart";
import CategoryListWithScroll from "@/components/CategoryListWithScroll";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import PublicationCardDashboard from "@/components/PublicationCardDashboard";
import type { Publication } from "@/types/publication";
import { capitalize } from "@/app/utils/capitalize";


export default function Dashboard() {
    const date = new Date();
    const month = capitalize(date.toLocaleString("pt-BR", { month: "long" }));
    const year = date.getFullYear();
    const todayFormatted = `${month}, ${year}`;

    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        archived: 0,
        thisMonth: 0,
    });

    const [categories, setCategories] = useState<
        { category: string; count: number; percent: number }[]
    >([]);

    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const res = await fetch("/api/publications", {
                    cache: "no-store",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!res.ok) {
                    throw new Error('Falha ao carregar dados');
                }

                const data: Publication[] = await res.json();
                setPublications(data);

                const total = data.length;
                const active = data.filter((p: any) => p.status === "published").length;
                const archived = data.filter((p: any) => p.status === "archived").length;

                const now = new Date();
                const thisMonth = data.filter((p: any) => {
                    const created = new Date(p.createdAt);
                    return (
                        created.getMonth() === now.getMonth() &&
                        created.getFullYear() === now.getFullYear()
                    );
                }).length;

                setStats({ total, active, archived, thisMonth });

                const countMap: Record<string, number> = {};

                data.forEach((p: any) => {
                    const category = p.category || 'Sem Categoria';
                    countMap[category] = (countMap[category] || 0) + 1;
                });

                const categoryArray = Object.entries(countMap).map(
                    ([category, count]) => ({
                        category,
                        count,
                        percent: total > 0 ? (count / total) * 100 : 0,
                    })
                ).sort((a, b) => b.percent - a.percent);

                setCategories(categoryArray);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <div className="flex justify-center min-h-screen bg-[#F7F4FF] px-4">
            <main className="w-[80%]">
                <header className="flex flex-col lg:flex-row lg:justify-between gap-6 mt-8">
                    <div className="flex-1">
                        <p className="text-lg text-[#929292] mb-2">{todayFormatted}</p>
                        <h1 className="text-4xl font-bold mb-2">Publicações</h1>
                        <p className="text-[#5421CD] text-base">
                            Gerencie e acompanhe todas as suas publicações
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:w-[40%]">
                        <InputGroup className="bg-white border border-[#AEAEAE]">
                            <InputGroupInput
                                placeholder="Pesquisar publicações"
                                className="placeholder:text-[#AEAEAE]"
                            />
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <Button className="w-full sm:w-auto" variant="purple" size="lg">
                            Adicionar
                            <Plus />
                        </Button>
                    </div>
                </header>

                <div className="mb-12">
                    <PublicationsStatus
                        total={stats.total}
                        active={stats.active}
                        archived={stats.archived}
                        thisMonth={stats.thisMonth}
                    />
                </div>

                <div className="bg-white border border-[#AEAEAE] rounded-xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 ">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <PieChart className="w-7 h-7 text-[#5421CD]" />
                                Análise de Categorias
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Distribuição percentual das publicações por categoria
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 mt-4 lg:mt-0">
                            <div className="text-gray-600">
                                {categories.length} Categorias
                            </div>
                            <Button className="w-full sm:w-auto" variant="purple" size="lg">
                                Adicionar Categoria
                                <Plus />
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5421CD]"></div>
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-stretch">

                            <CategoryListWithScroll categories={categories} />

                            <div className="flex flex-col h-full">
                                <CategoryChart data={categories} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500 mb-2">
                                Nenhuma categoria encontrada
                            </h3>
                            <p className="text-gray-400">
                                Comece adicionando suas primeiras publicações
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-6 mb-10 justify-center sm:justify-start">
                    <NativeSelect className="border border-[#AEAEAE]" >
                        <NativeSelectOption value="">Todos os Status</NativeSelectOption>
                        <NativeSelectOption value="published">Publicados</NativeSelectOption>
                        <NativeSelectOption value="archived">Arquivados</NativeSelectOption>
                    </NativeSelect>

                    <NativeSelect className="border-[#AEAEAE]">
                        <NativeSelectOption value="">Todas Categorias</NativeSelectOption>
                        {categories.map((cat) => (
                            <NativeSelectOption key={cat.category} value={cat.category}>
                                {capitalize(cat.category)}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {publications.map((pub) => (
                        <PublicationCardDashboard key={pub._id} publication={pub} />
                    ))}
                </div>
            </main>
        </div>
    );
}