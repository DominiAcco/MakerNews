
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
import { LoginService } from "@/services/loginService";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export function LogoutModal() {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);

  async function handleLogout() {
    try {
      setIsLogout(true)
      await LoginService.logout();
      router.replace("/login");
      toast.success("Logout realizado com sucesso");
    } catch (err: any) {
      toast.error("Erro ao deslogar");
    } finally {
      setIsLogout(false)
    }
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
            <Button
              variant="light"
              className="min-w-25"
              disabled={isLogout}
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            className="min-w-25"
            onClick={handleLogout}
            disabled={isLogout}
          >
            {isLogout && <Spinner className="w-4 h-4" />}
            {isLogout ? "Saindo..." : "Sair"}
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
