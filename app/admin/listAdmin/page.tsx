"use client"
import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { AdminData } from "@/types/adminSchema";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";



export default function ListAdmin() {
    const [admins, setAdmins] = useState<AdminData[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const seekAdmins = async (page: number): Promise<void> => {
        try {
         /*    const response = await ProductService.list(page, perPage)

            setAdmins(response.data);
            setCurrentPage(response.meta.current_page);
            setTotalPages(response.meta.total_pages); */

        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response && err.response.status === 404) {
                    toast.error("Erro ao carregar dados");
                } else {
                    toast.error("Erro ao carregar dados da API.");
                }
            } else {
                console.error("Erro desconhecido:", err);
                toast.error(`Erro: ${err}`);
            }
        }
    };

    useEffect(() => {
        seekAdmins(currentPage);
    }, [currentPage]);

    const handleNextPage = (): void => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            seekAdmins(nextPage);
        } else {
            toast.error("Você já está na última página!");
        }
    };

    const handlePreviousPage = (): void => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            seekAdmins(prevPage);
        } else {
            toast.error("Você já está na primeira página!");
        }
    };

    const handleUpdatePage = (): void => {
        seekAdmins(1);
    }

    const handleProductCreated = (): void => {
        seekAdmins(1);
        setIsDialogOpen(false);
    }


    return (
        <main className="min-h-screen p-10">
            <header className="bg-neutral-700 rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Produtos</h1>
                        <p className="text-white mt-2">Gerencie todas os produtos do estabelecimento</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="purple" className="cursor-pointer">
                                <Plus size={18} />
                                Cadastro de Produto
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cadastro de Produto</DialogTitle>
                                <DialogDescription>Formulário de cadastro de novo produto.</DialogDescription>
                            </DialogHeader>
                     
                        </DialogContent>
                    </Dialog>

                </div>
            </header>

            <div className="p-5">
                {admins.length > 0 ? (
                    <DataTable
                        columns={columns(handleUpdatePage)}
                        data={admins}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                    />
                ) : (
                    <h2 className="p-5 text-xl">Não foi possível buscar os produtos no sistema!</h2>
                )}
            </div>
        </main>
    );
}