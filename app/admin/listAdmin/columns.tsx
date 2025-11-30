import { AdminData } from "@/types/adminSchema"
import { ColumnDef } from "@tanstack/react-table"


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
]