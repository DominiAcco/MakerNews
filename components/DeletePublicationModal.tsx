"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PublicationService } from "@/service/publicationService";
import { PublicationData } from "@/types/publication";

interface DeletePublicationModalProps {
    publication: PublicationData;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function DeletePublicationModal({
    publication,
    open,
    onClose,
    onSuccess
}: DeletePublicationModalProps) {

    const handleDelete = async () => {
        try {
            await PublicationService.delete(publication._id);
            toast.success("Publicação excluída com sucesso!");
            onSuccess?.();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error("Erro ao excluir publicação");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] w-full">
                <DialogHeader>
                    <DialogTitle>Excluir Publicação</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir a publicação <strong>{publication.title}</strong>? Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        type="button"
                        variant="light"
                        onClick={onClose}
                        className="min-w-30"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        className="min-w-30"
                    >
                        Excluir
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
