"use client";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    PublicationSchema,
    PublicationFormData,
    PublicationData
} from "@/types/publication";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "./ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { PublicationService } from "@/services/publicationService";
import { CATEGORIES } from "@/consts/categories";
import { useState } from "react";
import { validateImage } from "@/utils/imageUtils";
import { Upload, Trash2 } from "lucide-react";
import { fileUploadService } from "@/services/fileUploadService";
import { Spinner } from "./ui/spinner";
import Image from "next/image";

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

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(publication.image_url || "");
    const [isSaving, setIsSaving] = useState(false);
    const [removeOldImage, setRemoveOldImage] = useState(false);

    const defaultCategory = CATEGORIES.includes(publication.category as any)
        ? (publication.category as typeof CATEGORIES[number])
        : undefined;

    const methods = useForm<PublicationFormData>({
        resolver: zodResolver(PublicationSchema),
        defaultValues: {
            title: publication.title,
            description: publication.description,
            content: publication.content,
            status: publication.status,
            category: defaultCategory,
            image_url: publication.image_url || "",
        },
    });

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const error = await validateImage(file);
        if (error) {
            toast.error(error);
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    const onSubmit = async (values: PublicationFormData) => {
        try {
            setIsSaving(true);

            let imageUrl = values.image_url;

            if (removeOldImage && publication.image_url) {
                await fileUploadService.deleteImage(publication.image_url);
                imageUrl = "";
            }

            if (selectedFile) {

                if (publication.image_url && !removeOldImage) {
                    await fileUploadService.deleteImage(publication.image_url);
                }

                const uploadedUrl = await fileUploadService.uploadImage(selectedFile);
                methods.setValue("image_url", uploadedUrl);
                imageUrl = uploadedUrl;
            }

            const updatedData: PublicationFormData = {
                ...values,
                image_url: imageUrl,
            };

            await PublicationService.update(publication._id, updatedData);

            toast.success("Publicação atualizada com sucesso!");
            onSuccess?.();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error("Erro ao atualizar publicação");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>Editar Publicação</DialogTitle>
                    <DialogDescription></DialogDescription>
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

                        <FormField
                            control={methods.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conteúdo</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Conteúdo completo da publicação"
                                            className="break-all max-h-52"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={methods.control}
                            name="image_url"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Imagem</FormLabel>

                                    <div className="space-y-3">
                                        <Input
                                            type="file"
                                            id="file-input"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />

                                        <label
                                            htmlFor="file-input"
                                            className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                                        >
                                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600">
                                                {selectedFile ? "Alterar imagem" : previewUrl ? "Alterar imagem" : "Clique para adicionar uma imagem"}
                                            </span>
                                        </label>

                                        {(previewUrl || selectedFile) && (
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">

                                                <div className="relative w-16 h-16">
                                                    <Image
                                                        src={selectedFile ? URL.createObjectURL(selectedFile) : previewUrl}
                                                        alt="Preview"
                                                        fill
                                                        sizes="64px"
                                                        loading="lazy"
                                                        quality={75}
                                                        className="object-cover rounded"
                                                        
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    {selectedFile && (
                                                        <>
                                                            <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                            </p>
                                                        </>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setRemoveOldImage(true);
                                                        setSelectedFile(null);
                                                        setPreviewUrl("");
                                                        methods.setValue("image_url", "");
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4 hover:cursor-pointer" />
                                                </button>
                                            </div>
                                        )}

                                    </div>

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
                                                <SelectTrigger className="sm:min-w-40">
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
                                                <SelectTrigger className="sm:min-w-40">
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
                                onClick={() => onClose?.()}
                                disabled={isSaving}
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="submit"
                                variant="purple"
                                className="min-w-30 flex items-center gap-2"
                                disabled={isSaving}
                            >
                                {isSaving && <Spinner className="w-4 h-4" />}
                                {isSaving ? "Salvando..." : "Salvar"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}