"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, SearchIcon } from "lucide-react";

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Dashboard() {
  const date = new Date();

  const month = capitalize(date.toLocaleString("pt-BR", { month: "long" }));
  const year = date.getFullYear();
  const todayFormatted = `${month}, ${year}`;

  return (
    <div className="flex justify-center min-h-screen bg-[#F7F4FF]">
      <main className="w-[80%]">
        <header className="flex justify-between mt-8">
          <div className="w-1/2">
            <p className="text-lg text-[#929292] mb-2">{todayFormatted}</p>
            <h1 className="text-4xl font-bold mb-2">Publicações</h1>
            <p className="text-[#5421CD] text-base">
              Gerencie e acompanhe todas as suas publicações
            </p>
          </div>

          <div className="w-1/3 flex items-center gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Pesquisar publicações" />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <Button variant="purple" size="lg">
              Adicionar
              <Plus />
            </Button>
          </div>
        </header>
      </main>
    </div>
  );
}
