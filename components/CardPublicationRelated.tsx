"use client";

import Image from "next/image";
import Link from "next/link";
import { PublicationData } from "@/types/publication";
import { capitalize } from "@/utils/capitalize";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { formatDateBR } from "@/utils/date";

interface CardPublicationRelatedProps {
    publication: PublicationData;
}

export default function CardPublicationRelated({ publication }: CardPublicationRelatedProps) {
    return (
        <div className="rounded-lg flex flex-col h-full ">

            <div className="relative w-full h-48 md:h-56 mb-4">
                <Image
                    src={publication.image_url?.trim() ? publication.image_url : "/notFound.png"}
                    alt={publication.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover rounded-lg bg-gray-100"
                    quality={75}
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                    <p className="text-lg font-bold">{capitalize(publication.title)}</p>
                    <p className="text-[#5B5B5B] line-clamp-3 mt-6 mb-6">{publication.description}</p>
                </div>

                <div className="flex flex-col 2xl:flex-row justify-between items-center gap-4">

                    <Link href={`/publicacoes/${publication._id}`} className="w-full 2xl:w-auto">
                        <Button
                            variant="purple"
                            size="homeButtonSize"
                            className="w-full"
                        >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Ver Detalhes
                        </Button>
                    </Link>

                    <p className="text-[#5B5B5B] line-clamp-1 2xl:whitespace-nowrap">
                        {formatDateBR(publication.createdAt)}
                    </p>
                </div>
            </div>
        </div>
    );
}
