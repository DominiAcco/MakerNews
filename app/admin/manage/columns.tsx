
import DeleteAdminModal from "@/components/DeleteAdminModal";
import EditAdminModal from "@/components/EditAdminModal";
import { AdminData } from "@/types/adminSchema";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash } from "lucide-react";
import { useState } from "react";


export const columns = (onUpdate: () => void): ColumnDef<AdminData>[] => [
    {
        accessorKey: "_id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "email",
        header: "E-mail",
    },
    {
        accessorKey: "role",
        header: "Cargo",
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const ActionCell = () => {
                const [deleteOpen, setDeleteOpen] = useState(false);
                const [editOpen, setEditOpen] = useState(false);
                const admin = row.original;

                return (
                    <>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                className="cursor-pointer hover:text-green-700 transition-colors"
                                onClick={() => setEditOpen(true)}
                            >
                                <SquarePen size={20} />
                            </button>

                            <button
                                className="cursor-pointer hover:text-red-700 transition-colors"
                                onClick={() => setDeleteOpen(true)}
                            >
                                <Trash size={20} />
                            </button>
                        </div>

                        <EditAdminModal
                            open={editOpen}
                            onClose={() => setEditOpen(false)}
                            admin={admin}
                            onUpdated={onUpdate}
                        />

                        <DeleteAdminModal
                            open={deleteOpen}
                            onClose={() => setDeleteOpen(false)}
                            adminId={admin._id}
                            adminName={admin.name}
                            onDeleted={onUpdate}
                        />
                    </>
                );
            };

            return <ActionCell />;
        }
    },
];
