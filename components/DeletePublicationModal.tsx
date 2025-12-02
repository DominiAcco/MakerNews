"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PublicationService } from "@/services/publicationService";
import { PublicationData } from "@/types/publication";
import { fileUploadService } from "@/services/fileUploadService";
import { Spinner } from "./ui/spinner";
import { useState } from "react";

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

    const [isSaving, setIsSaving] = useState(false);

    const handleDelete = async () => {
        try {
            setIsSaving(true);
            if (publication.image_url) {
                await fileUploadService.deleteImage(publication.image_url);
            }
            await PublicationService.delete(publication._id);
            toast.success("Publicação excluída com sucesso!");
            onSuccess?.();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error("Erro ao excluir publicação");
        } finally {
            setIsSaving(false)
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
                        disabled={isSaving}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        className="min-w-30"
                        disabled={isSaving}
                    >
                       
                        {isSaving && <Spinner className="w-4 h-4" />}
                        {isSaving ? "Excluindo..." : " Excluir"}
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
}
