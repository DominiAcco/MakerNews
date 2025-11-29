"use client";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PublicationSchema, PublicationFormData, PublicationData } from "@/types/publication";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { PublicationService } from "@/services/publicationService";
import { CATEGORIES } from "@/consts/categories";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface EditPublicationModalProps {
    publication: PublicationData;
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function EditPublicationModal({
    publication,
    open,
    onClose,
    onSuccess
}: EditPublicationModalProps) {

    const defaultCategory = CATEGORIES.includes(publication.category as any)
        ? (publication.category as typeof CATEGORIES[number])
        : undefined;

    const methods = useForm<PublicationFormData>({
        resolver: zodResolver(PublicationSchema),
        defaultValues: {
            title: publication.title,
            description: publication.description,
            status: publication.status,
            category: defaultCategory,
            createdBy: publication.createdBy,
            image_url: publication.image_url || "",
        },
    });

    const onSubmit = async (values: PublicationFormData) => {
        try {
            await PublicationService.update(publication._id, values);
            toast.success("Publicação atualizada com sucesso!");
            onSuccess?.();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error("Erro ao atualizar publicação");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>Editar Publicação</DialogTitle>
                </DialogHeader>

                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={methods.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Título" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={methods.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descrição"
                                            className="break-all max-h-52"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between gap-4">
                            <FormField
                                control={methods.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="published">Publicado</SelectItem>
                                                <SelectItem value="archived">Arquivado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methods.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CATEGORIES.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="light"
                                className="min-w-30"
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="purple"
                                className="min-w-30"
                            >
                                Salvar
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
