
"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function LogoutModal() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 px-2 py-2 rounded-md text-#020202-500 hover:text-red-600">
        <LogOut size={18} />
        <span>Sair</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
          <DialogDescription>
            Você será desconectado da sua conta.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 mt-4">
          <DialogClose asChild>
            <Button variant="light" className="min-w-25">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            className="min-w-25"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
