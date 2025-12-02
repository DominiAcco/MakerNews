"use client";

import { PublicationData } from "@/types/publication";
import { AlertCircle, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface PublicationCardProps {
    publication: PublicationData;
}

export function PublicationCard({ publication }: PublicationCardProps) {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                {publication.image_url ? (
                    <img
                        src={publication.image_url}
                        alt={publication.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-400">
                                {publication.title.charAt(0)}
                            </div>
                        </div>
                    </div>
                )}

                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full shadow-sm">
                        {publication.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col grow">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {publication.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {publication.description}
                    </p>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>
                                {new Date(publication.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                        </div>

                    </div>

                    <Link href={`/publicacoes/${publication._id}`}>
                        <Button variant="purple" className="hover:bg-primary-hover text-white border-radius-md">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Ver Detalhes
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}