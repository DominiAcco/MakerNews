"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef, 
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  currentPage?: number
  totalPages?: number
  onNextPage?: () => void
  onPreviousPage?: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: DataTableProps<TData, TValue>) {
  const [filter, setFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const { theme } = useTheme();

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-2">
        <h1>Filtro: </h1>
        <div className="flex items-center justify-between">
          <Input
            placeholder="Filtrar..."
            value={filter ?? ""}
            onChange={(e) => setFilter(e.target.value)}
            className={`max-w-sm border border-solid ${theme === 'dark' ? "border-white" : "border-black"}`}
          />
        </div>
      </div>

      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center bg-[#353333] text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  Nenhum resultado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {currentPage && totalPages && (

        <div className="flex justify-between items-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={currentPage <= 1}
            className={`hover:cursor-pointer ${theme === 'dark' ? "border border-solid border-white" : "border border-solid border-black"}`}
          >
            Anterior
          </Button>
          <span className={`text-sm ${theme === 'dark' ? "text-white" : "text-black"}`}>
            Página {currentPage} de {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
            className={`hover:cursor-pointer ${theme === 'dark' ? "border border-solid border-white" : "border border-solid border-black"}`}
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  )
}