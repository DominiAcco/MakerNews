"use client";

import { useEffect, useState } from "react";
import { PublicationData } from "@/types/publication";
import { PublicationCard } from "@/components/CardPublications";
import Navbar from "@/components/Navbar";
import {
  Search,
  FileText,
  AlertCircle,
  SearchIcon,
  MoveLeft
} from "lucide-react";
import { PublicationService } from "@/services/publicationService";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { CATEGORIES } from "@/consts/categories";
import { capitalize } from "@/utils/capitalize";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TodasPublicacoesPage() {
  const [publications, setPublications] = useState<PublicationData[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<PublicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      setLoading(true);
      const data = await PublicationService.list();
      const published = data.filter(pub => pub.status === 'published');
      setPublications(published);
      setFilteredPublications(published);
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

    if (categoryFilter) {
      filtered = filtered.filter(pub => pub.category === categoryFilter);
    }

    setFilteredPublications(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, publications]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPublications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

  const PublicationSkeleton = () => (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-48 bg-linear-to-br from-gray-200 to-gray-300"></div>
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
      <section className="relative flex justify-center min-h-auto">
        <div className="relative w-[90%] md:w-[80%] flex flex-col mt-6 md:mt-10 z-10">
          <Navbar theme="light" />

          <div className="mb-8">
            <Link href="/">
              <Button
                variant="purple"
                size="lg"
                className="mt-15"
              >
                <MoveLeft className="size-6" />
                Voltar para Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center">
        <div className="w-[90%] md:w-[80%]">
          <div className="mb-20">
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
                    <span className="font-bold">{filteredPublications.length}</span> publicações
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                  <InputGroup className="bg-white border border-[#AEAEAE] w-full sm:flex-1 max-w-lg">
                    <InputGroupInput
                      placeholder="Pesquisar publicações"
                      className="placeholder:text-[#AEAEAE] py-2 sm:py-3 text-sm sm:text-base w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroupAddon className="px-3 sm:px-4">
                      <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <NativeSelect
                  className="border border-[#AEAEAE] w-full sm:w-48 lg:w-52"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <NativeSelectOption value="">Todas Categorias</NativeSelectOption>
                  {CATEGORIES.map((cat) => (
                    <NativeSelectOption key={cat} value={cat}>
                      {capitalize(cat)}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>
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

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                onPreviousPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onPageSelect={(page) => setCurrentPage(page)}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">

              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? `Não encontramos resultados para "${searchTerm}". Tente outros termos.`
                  : "Aguarde novas publicações."
                }
              </p>

            </div>
          )}
        </div>
      </section>
    </main>
  );
}