"use client";

import { useEffect, useState } from "react";
import PublicationsStatus from "@/components/PublicationsStatus";
import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, SearchIcon } from "lucide-react";

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

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

    // Podemos usar um service futuramente para abstrair a chamada API
    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/publications", {
                    method: "GET",
                    cache: "no-store",
                });

                const data = await res.json();

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

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
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

                <PublicationsStatus
                    total={stats.total}
                    active={stats.active}
                    archived={stats.archived}
                    thisMonth={stats.thisMonth}
                />
            </main>
        </div>
    );
}