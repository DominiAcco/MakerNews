"use client";

import { PublicationData } from "@/types/publication";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { capitalize } from "@/utils/capitalize";
import { useState } from "react";
import EditPublicationModal from "@/components/EditPublicationModal";
import DeletePublicationModal from "@/components/DeletePublicationModal"; 

interface PublicationCardDashboardProps {
    publication: PublicationData
    onUpdate?: () => void;
}
export default function PublicationCardDashboard({ publication, onUpdate }: PublicationCardDashboardProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); 
  
    function handleEditSuccess() {
        setIsEditOpen(false);
        onUpdate?.();
    }

    function handleDeleteSuccess() {
        setIsDeleteOpen(false);
        onUpdate?.(); 
    }

    return (
        <>
            <div className="border border-[#AEAEAE] rounded-xl bg-white overflow-hidden w-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 sm:h-40 w-full">
                     <Image
                        src={publication.image_url || "/notFound.png"} 
                        alt={publication.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className={`absolute top-5 left-8 sm:left-6 md:left-8 px-5 py-1 text-xs font-bold rounded-full text-white tracking-wide
                        ${publication.status === "published" ? "bg-green-700" : "bg-gray-700"}`}>
                        {publication.status === "published" ? "Publicado" : "Arquivado"}
                    </span>
                </div>

                <div className="p-4 sm:p-6 md:p-8 min-h-[250px] flex flex-col justify-between">
                    <div className="min-h-28 flex flex-col justify-start">
                        <p className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 line-clamp-2">
                            {publication.title}
                        </p>
                        <p className="text-sm sm:text-base text-[#5B5B5B] line-clamp-3">
                            {publication.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4 sm:mt-5">
                        <div className="text-[#ffffff] font-black px-6 py-2 rounded-full text-sm w-fit border bg-[#5421CD]">
                            {capitalize(publication.category)}
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-[#AEAEAE] text-sm">Publicado em</p>
                            <p className="text-[#5B5B5B] text-sm sm:text-base">
                                {new Date(publication.createdAt).toLocaleDateString("pt-BR")}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-[#B3B3B3] mt-4 sm:mt-6"></div>

                    <div className="mt-4 sm:mt-5 flex justify-between items-center">
                        <SquarePen
                            className="w-5 h-5 text-[#AEAEAE] cursor-pointer hover:text-[#5421CD] transition-colors"
                            onClick={() => setIsEditOpen(true)}
                        />
                        <Trash2
                            className="w-5 h-5 text-[#AEAEAE] cursor-pointer hover:text-red-500 transition-colors"
                            onClick={() => setIsDeleteOpen(true)}
                        />
                    </div>
                </div>
            </div>

            {isEditOpen && (
                <EditPublicationModal
                    publication={publication}
                    open={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    onSuccess={handleEditSuccess}
                />
            )}

            {isDeleteOpen && (
                <DeletePublicationModal
                    publication={publication}
                    open={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onSuccess={handleDeleteSuccess}
                />
            )}
        </>
    );
}
