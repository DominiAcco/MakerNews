"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
    onPageSelect?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
    onPageSelect,
}) => {
    if (!currentPage || !totalPages) return null;

    const handlePageClick = (page: number) => {
        if (onPageSelect) onPageSelect(page);
    };

    return (
        <div className="flex flex-col xs:flex-row justify-between items-center gap-3 lg:gap-4 px-1 mt-6">
            <p className="text-xs lg:text-sm text-gray-600 order-2 xs:order-1">
                Página <span className="font-semibold text-gray-900">{currentPage}</span> de{" "}
                <span className="font-semibold text-gray-900">{totalPages}</span>
            </p>

            <div className="flex items-center gap-3 lg:gap-5">
                <button
                    onClick={onPreviousPage}
                    disabled={currentPage <= 1}
                    className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700"
                >
                    <ChevronLeft className="h-3 lg:h-4 w-3 lg:w-4" />
                    <span className="hidden xs:inline">Anterior</span>
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageClick(pageNum)}
                                className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg text-xs lg:text-sm font-medium transition-all ${currentPage === pageNum
                                        ? "bg-[#5421CD] text-white shadow-xs"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    {totalPages > 3 && (
                        <>
                            <span className="text-gray-400 text-xs">...</span>
                            <button
                                onClick={() => handlePageClick(totalPages)}
                                className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg text-xs lg:text-sm font-medium transition-all ${currentPage === totalPages
                                        ? "bg-[#5421CD] text-white shadow-xs"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {totalPages}
                            </button>

                        </>
                    )}
                </div>

                <button
                    onClick={onNextPage}
                    disabled={currentPage >= totalPages}
                    className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700"
                >
                    <span className="hidden xs:inline">Próximo</span>
                    <ChevronRight className="h-3 lg:h-4 w-3 lg:w-4" />
                </button>
            </div>
        </div>
    );
};
