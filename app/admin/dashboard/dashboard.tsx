"use client";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Plus,
    SearchIcon,
    PieChart,
    Calendar,
    MoveLeft,
    ShieldUser
} from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import PublicationsStatus from "@/components/PublicationsStatus";
import { Button } from "@/components/ui/button";
import CategoryChart from "@/components/CategoryChart";
import CategoryListWithScroll from "@/components/CategoryListWithScroll";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import PublicationCardDashboard from "@/components/PublicationCardDashboard";
import { capitalize } from "@/utils/capitalize";
import { DialogHeader } from "@/components/ui/dialog";
import RegisterPublicationModal from "@/components/RegisterPublicationModal";
import { CATEGORIES } from "@/consts/categories";
import { PublicationData } from "@/types/publication";
import { PublicationService } from "@/services/publicationService";
import { toast } from "sonner";
import { getMonthYearFormatted } from "@/utils/date";
import { LogoutModal } from "@/components/LogoutModal";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Dashboard() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [publications, setPublications] = useState<PublicationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [categories, setCategories] = useState<{
        category: string;
        count: number;
        percent: number
    }[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        archived: 0,
        thisMonth: 0,
    });
    const todayFormatted = getMonthYearFormatted();

    const seekPublications = async (): Promise<void> => {
        setLoading(true);
        try {
            const data = await PublicationService.list();
            setPublications(data);
            computeStats(data);
            computeCategories(data);
        } catch (err) {
            toast.error("Erro ao carregar publicações.");
        } finally {
            setLoading(false);
        }
    }

    const computeStats = (data: PublicationData[]) => {
        const total = data.length;
        const active = data.filter(p => p.status === "published").length;
        const archived = data.filter(p => p.status === "archived").length;

        const now = new Date();

        const thisMonth = data.filter(p => {
            const created = new Date(p.createdAt);
            return (
                created.getMonth() === now.getMonth() &&
                created.getFullYear() === now.getFullYear()
            );
        }).length;

        setStats({ total, active, archived, thisMonth });
    }

    const computeCategories = (data: PublicationData[]) => {
        const countMap: Record<string, number> = {};

        data.forEach(p => {
            const cat = p.category || "Sem Categoria";
            countMap[cat] = (countMap[cat] || 0) + 1;
        });

        const categoryArray = Object.entries(countMap)
            .map(([category, count]) => ({
                category,
                count,
                percent: data.length > 0 ? (count / data.length) * 100 : 0,
            }))
            .sort((a, b) => b.percent - a.percent);

        setCategories(categoryArray);
    }

    useEffect(() => {
        seekPublications();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => clearTimeout(handler);
    }, [search]);

    const filteredPublications = publications.filter((pub) => {
        const term = debouncedSearch.toLowerCase();

        const matchesSearch = pub.title.toLowerCase().includes(term);

        const matchesStatus = statusFilter ? pub.status === statusFilter : true;

        const matchesCategory = categoryFilter
            ? pub.category === categoryFilter
            : true;

        return matchesSearch && matchesStatus && matchesCategory;
    });


    return (
        <div className="flex justify-center min-h-screen bg-[#F7F4FF] px-4">
            <main className="w-[80%]">
                <header className="flex flex-col lg:flex-row lg:justify-between gap-6 mt-8">
                    <div className="flex-1">
                        <Link href="/" className="flex items-center gap-2 text-[#5421CD] font-bold hover:underline mb-2">
                            <MoveLeft className="w-5 h-5" />
                            Voltar Home
                        </Link>

                        <h1 className="text-4xl font-bold mb-2">Publicações</h1>
                        <p className="text-[#5421CD] text-base">
                            Gerencie e acompanhe todas as suas publicações
                        </p>
                        <div className="flex mt-4">
                            <Calendar className="inline w-6 h-6 text-[#929292] mr-2" />
                            <p className="text-lg text-[#929292]">{todayFormatted}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg items-center">
                        <div className="flex justify-center sm:justify-start lg:justify-end order-3 sm:order-1">
                            <LogoutModal />
                        </div>

                        <Link
                            href="/admin/manage"
                            className="order-2 sm:col-span-1"
                        >
                            <Button
                                variant="purpleGhost"
                                size="lg"
                                className="w-full justify-center"
                            >
                                Gerenciar Admins
                                <ShieldUser className="ml-2" />
                            </Button>
                        </Link>

                        <div className="order-1 sm:order-3">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full" variant="purple" size="lg">
                                        Adicionar
                                        <Plus />
                                    </Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Cadastro de Publicação</DialogTitle>
                                        <DialogDescription>Formulário de cadastro de nova publicação.</DialogDescription>
                                    </DialogHeader>
                                    <RegisterPublicationModal
                                        onClose={() => setIsDialogOpen(false)}
                                        onSuccess={seekPublications}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
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

                <div className="bg-white border border-[#AEAEAE] rounded-xl p-8 mb-10">
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
                        <div className="text-gray-600">
                            {categories.length} Categorias
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

                <div className="flex flex-col lg:flex-row flex-wrap gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:flex-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold whitespace-nowrap min-w-[200px]">
                            Todas as Publicações
                        </h3>

                        <InputGroup className="bg-white border border-[#AEAEAE] w-full sm:flex-1 max-w-lg">
                            <InputGroupInput
                                placeholder="Pesquisar publicações"
                                className="placeholder:text-[#AEAEAE] py-2 sm:py-3 text-sm sm:text-base w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <InputGroupAddon className="px-3 sm:px-4">
                                <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                        <NativeSelect
                            className="border border-[#AEAEAE] w-full sm:w-40 lg:w-44"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <NativeSelectOption value="">Todos os Status</NativeSelectOption>
                            <NativeSelectOption value="published">Publicados</NativeSelectOption>
                            <NativeSelectOption value="archived">Arquivados</NativeSelectOption>
                        </NativeSelect>

                        <NativeSelect
                            className="border border-[#AEAEAE] w-full sm:w-48 lg:w-52"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <NativeSelectOption value="">Todas Categorias</NativeSelectOption>
                            {CATEGORIES.map((cat) => (
                                <NativeSelectOption key={cat} value={cat}>
                                    {capitalize(cat)}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[200px]">
                    {filteredPublications.length > 0 ? (
                        filteredPublications.map((pub) => (
                            <PublicationCardDashboard
                                key={pub._id}
                                publication={pub}
                                onUpdate={seekPublications}
                            />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-36">
                            <p className="text-2xl font-semibold text-gray-500 mb-2">
                                Nenhuma correspondência encontrada
                            </p>
                            <p className="text-gray-400 text-lg">
                                Tente alterar os filtros ou a busca para encontrar publicações.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}