import CardPublicationRelated from "@/components/CardPublicationRelated";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PublicationService } from "@/services/publicationService";
import { capitalize } from "@/utils/capitalize";
import { formatDateBR } from "@/utils/date";
import { MoveLeft, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800">ID inválido</h1>
          <p className="text-gray-600">A publicação solicitada não pôde ser encontrada.</p>
          <Button asChild variant="purple">
            <Link href="/publicacoes">Voltar para publicações</Link>
          </Button>
        </div>
      </div>
    );
  }

  const publication = await PublicationService.getById(id);

  if (!publication) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">📄</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Publicação não encontrada</h1>
            <p className="text-gray-600">A publicação que você está procurando não existe ou foi removida.</p>
          </div>
          <Button asChild variant="purple" size="lg">
            <Link href="/publicacoes" className="flex items-center gap-2">
              <MoveLeft className="size-5" />
              Voltar para publicações
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const allPublications = await PublicationService.list();

  const relatedPublications = allPublications
    .filter(p => p.category === publication.category && p._id !== publication._id)
    .slice(0, 3);

  return (
    <main className="mt-6 md:mt-10 flex justify-center items-center">
      <div className="w-[90%] md:w-[80%]">
        <Navbar />
        
        <div className="mb-8">
          <Link href="/publicacoes">
            <Button
              variant="purple"
              size="lg"
              className="mt-15"
            >
              <MoveLeft className="size-6" />
              Voltar para publicações
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">
              <Tag className="size-4" />
              {capitalize(publication.category)}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="inline-flex items-center gap-2 text-gray-600">
              <Calendar className="size-4" />
              {formatDateBR(publication.createdAt)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {capitalize(publication.title)}
          </h1>

        </div>

        <div className="mb-10 md:mb-12">
          <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={publication.image_url?.trim() ? publication.image_url : "/notFound.png"}
              alt={publication.title}
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {publication.description && (
          <div className="mb-10">
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-light italic border-l-4 border-purple-500 pl-6 py-3">
              {publication.description}
            </p>
          </div>
        )}

        <article className="prose prose-lg md:prose-xl max-w-none">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100">
            <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
              {publication.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-10 rounded-xl">
          <h2 className="font-bold text-4xl mb-6">Relacionados</h2>
          {relatedPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-30">
              {relatedPublications.map(pub => (
                <CardPublicationRelated key={pub._id} publication={pub} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">Nenhum item relacionado encontrado.</p>
          )}

        </div>
      </div>
    </main>
  );
}