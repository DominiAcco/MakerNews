"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { AdminService } from "@/services/adminService";
import { AdminData, AdminEditSchema } from "@/types/adminSchema";

export default function EditAdminModal({
  open,
  onClose,
  admin,
  onUpdated
}: {
  open: boolean;
  onClose: () => void;
  admin: AdminData;
  onUpdated: () => void;
}) {
  const [form, setForm] = useState({
    name: admin.name,
    email: admin.email
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const result = AdminEditSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    const formatted: Record<string, string> = {};

    for (const key in fieldErrors) {
      const msgs = fieldErrors[key as keyof typeof fieldErrors];
      if (msgs && msgs.length > 0) {
        formatted[key] = msgs[0];
      }
    }

    setErrors(formatted);
    toast.error(Object.values(formatted)[0]);
    return false;
  };

  const handleBlur = (field: string) => {
    try {
      const fieldSchema = AdminEditSchema.pick({ [field]: true });
      fieldSchema.parse({ [field]: form[field as keyof typeof form] });

      setErrors(prev => ({ ...prev, [field]: "" }));
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message || "Campo inválido";
      setErrors(prev => ({ ...prev, [field]: msg }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await AdminService.update(admin._id, form);
      toast.success("Administrador atualizado!");
      onUpdated();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Erro ao atualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Editar Administrador</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <div>
            <label className="text-sm">Nome</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm">E-mail</label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
