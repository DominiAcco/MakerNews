"use client";

import { useEffect, useState } from "react";
import { PublicationService } from "@/services/publicationService";
import { PublicationData } from "@/types/publication";
import { PublicationCard } from "./CardPublications";
import { AlertCircle } from "lucide-react";

export function PublicationList() {
  const [publications, setPublications] = useState<PublicationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        const data = await PublicationService.list();
        
        const sortedAndLimited = data
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6);
        
        setPublications(sortedAndLimited);
      } catch (err) {
        console.error("Erro ao carregar publicações:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  const PublicationSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
          <div className="lg:w-2/3">
            <a className="text-[#5421CD] font-bold">
              PUBLICAÇÕES
            </a>
            <p className="text-2xl lg:w-2/3 md:text-4xl font-bold text-black mt-3 ">
              Inspire-se, aprenda e 
              cresça com nossos projetos!
            </p>
          </div>
          
          <div className="lg:w-1/2 lg:text-right">
            <p className="text-gray-700 text-lg leading-relaxed mt-8">
              Conheça algumas das iniciativas desenvolvidas no nosso espaço maker. 
              Cada projeto representa colaboração, criatividade e aprendizado na prática.
            </p>
          </div>
        </div>
        
        {!loading && publications.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            Mostrando {publications.length} projeto{publications.length !== 1 ? 's' : ''} mais recente{publications.length !== 1 ? 's' : ''}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PublicationSkeleton key={i} />
            ))}
          </div>
        ) : publications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <PublicationCard 
                key={pub._id} 
                publication={pub} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Nenhuma publicação encontrada
            </h3>
            <p className="text-gray-600">
              Parece que ainda não há publicações disponíveis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}