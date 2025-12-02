"use client"
import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import { Pagination } from "./Pagination"

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

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 p-1">
        <div className="w-full xs:w-auto">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Buscar..."
              value={filter ?? ""}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 shadow-xs lg:shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-[#5421CD]">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 lg:px-6 py-3 lg:py-4 text-left text-white font-semibold text-xs lg:text-sm uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`transition-colors duration-150 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 lg:px-6 py-3 lg:py-4 text-gray-900 text-sm font-normal lg:font-medium whitespace-nowrap"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 lg:py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <div className="text-3xl lg:text-4xl mb-2 lg:mb-3"><Search/></div>
                      <h3 className="text-base lg:text-lg font-semibold mb-1">Nenhum resultado encontrado</h3>
                      <p className="text-xs lg:text-sm">Tente ajustar os filtros de busca</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage!}
        totalPages={totalPages!}
        onNextPage={onNextPage!}
        onPreviousPage={onPreviousPage!}
      />
      
    </div>
  )
}