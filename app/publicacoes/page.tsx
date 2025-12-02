"use client";

import { useEffect, useState } from "react";
import { PublicationData } from "@/types/publication";
import { PublicationCard } from "@/components/CardPublications";
import Navbar from "@/components/Navbar";
import { 
  Search, 
  Calendar,
  FileText,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TodasPublicacoesPage() {
  const [publications, setPublications] = useState<PublicationData[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<PublicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/publications');
      const data = await response.json();
      setPublications(data);
      setFilteredPublications(data);
    } catch (err) {
      console.error("Erro ao carregar publicações:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...publications];

    if (searchTerm) {
      filtered = filtered.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(pub => pub.category === selectedCategory);
    }

    setFilteredPublications(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, publications]);

  const categories = ["all", ...new Set(publications.map(pub => pub.category))];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPublications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

  const PublicationSkeleton = () => (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <main>
      <section className="relative flex justify-center min-h-auto overflow-hidden">
        <div className="relative w-[90%] md:w-[80%] flex flex-col mt-6 md:mt-10 z-10">
          <Navbar theme="light" />
        </div>
      </section>

      <section className="mt-15 md:mt-30 flex justify-center items-center">
        <div className="w-[90%] md:w-[80%]">
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="lg:w-2/3">
                <h1 className="text-[#5421CD] font-bold">
                  TODAS AS PUBLICAÇÕES
                </h1>
                <p className="text-2xl lg:w-2/3 md:text-4xl font-bold text-black mt-3">
                  Explore nosso catálogo completo de projetos
                </p>
              </div>
              
              <div className="lg:w-1/2 lg:text-right">
                <p className="text-gray-700 text-lg leading-relaxed mt-8">
                  Descubra todas as iniciativas desenvolvidas no nosso espaço maker. 
                  Cada projeto é uma história de colaboração e inovação.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    <span className="font-bold">{filteredPublications.length}</span> projetos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    <span className="font-bold">
                      {publications.filter(p => p.status === 'published').length}
                    </span> publicados
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar projetos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5421CD] focus:border-transparent"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5421CD] focus:border-transparent"
                >
                  <option value="all">Todas as categorias</option>
                  {categories.filter(cat => cat !== "all").map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(searchTerm || selectedCategory !== "all") && (
              <div className="text-sm text-gray-600 mb-4">
                {filteredPublications.length} resultado{filteredPublications.length !== 1 ? 's' : ''} encontrado{filteredPublications.length !== 1 ? 's' : ''}
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="ml-3 text-[#5421CD] hover:text-[#4520A5]"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <PublicationSkeleton key={i} />
              ))}
            </div>
          ) : currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentItems.map((pub) => (
                  <PublicationCard 
                    key={pub._id} 
                    publication={pub} 
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg ${
                            currentPage === pageNum
                              ? 'bg-[#5421CD] text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {searchTerm || selectedCategory !== "all"
                  ? "Nenhum projeto encontrado"
                  : "Nenhum projeto disponível"
                }
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `Não encontramos resultados para "${searchTerm}". Tente outros termos.`
                  : "Aguarde novas publicações."
                }
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}