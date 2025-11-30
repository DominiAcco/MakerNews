
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
  DialogClose
} from "@/components/ui/dialog";

export function LogoutModal() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center  gap-2  px-2 py-2 rounded-md text-#020202-500 hover:text-red-600">
        <LogOut size={18} />
        <span>Sair</span>   
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex gap-3 mt-4">
          <DialogClose asChild>
            <button className="border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-100">
              Cancelar
            </button>
          </DialogClose>

          <button
            onClick={handleLogout}
            className="border border-red-500 text-red-600 px-4 py-2 rounded-md hover:bg-red-50"
          >
            Sair
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
