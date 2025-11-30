"use client";

import { AdminService } from "@/services/adminService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

interface DeleteAdminModalProps {
    open: boolean;
    onClose: () => void;
    adminId: string;
    adminName: string;
    onDeleted: () => void;
}

export default function DeleteAdminModal({
    open,
    onClose,
    adminId,
    adminName,
    onDeleted
}: DeleteAdminModalProps) {

    const handleDelete = async () => {
        try {
            await AdminService.delete(adminId);
            toast.success("Administrador excluído com sucesso!");
            onDeleted();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir administrador");
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] w-full">
                <DialogHeader>
                    <DialogTitle>Excluir Administrador</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir o administrador{" "}
                        <strong>{adminName}</strong>? <br />
                        Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        type="button"
                        variant="light"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Excluir
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
