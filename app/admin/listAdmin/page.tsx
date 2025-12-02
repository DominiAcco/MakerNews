"use client"
import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { AdminData } from "@/types/adminSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AdminService } from "@/services/adminService";
import RegisterForm from "@/components/Registerpage";

export default function ListAdmin() {
    const [admins, setAdmins] = useState<AdminData[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const seekAdmins = async (page: number): Promise<void> => {
        try {
            const data = await AdminService.list();

            const total = data.length;
            const pages = Math.ceil(total / perPage);

            setTotalPages(pages);
            setCurrentPage(page);

            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const paginated = data.slice(startIndex, endIndex);

            setAdmins(paginated);
        } catch (error) {
            toast.error("Erro ao buscar administradores");
        }
    };


    useEffect(() => {
        seekAdmins(currentPage);
    }, [currentPage]);

    const handleSuccess = () => {
        seekAdmins(1);
        setIsDialogOpen(false);
    };

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

    return (
        <div className="flex justify-center min-h-screen bg-[#F7F4FF] px-4">
            <main className="w-[80%] mt-20">
                <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#AEAEAE] ">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-black">Admin</h1>
                            <p className="text-[#5B5B5B] mt-2">Gerencie todos os administradores</p>
                        </div>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="purple" className="cursor-pointer">
                                    <Plus size={18} />
                                    Cadastrar Admin
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <RegisterForm onSuccess={handleSuccess} />
                            </DialogContent>
                        </Dialog>

                    </div>
                </header>

                <div>
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
        </div>

    );
}