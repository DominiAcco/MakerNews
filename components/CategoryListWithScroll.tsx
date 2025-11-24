"use client";

import { useState } from "react";
import { CATEGORY_COLORS } from "@/components/colors";
import { Category } from "@/types/category";


interface CategoryListWithScrollProps {
    categories: Category[];
}


export default function CategoryListWithScroll({ categories }: CategoryListWithScrollProps) {
    const [showAll, setShowAll] = useState(false);
    const displayCategories = showAll ? categories : categories.slice(0, 6);

    return (
        <div className="bg-white ">
            <div className={`space-y-4 ${!showAll ? 'max-h-80' : ''} overflow-y-auto pr-2`}>
                {displayCategories.map((cat, index) => (
                    <div
                        key={cat.category}
                        className="flex items-center justify-between p-3 pl-0 rounded-xl border border-gray-200 transition-all duration-300 group relative"
                    >
                        <div
                            className="w-3 h-full rounded-l-xl absolute left-0 top-0"
                            style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                        />

                        <div className="flex items-center gap-4 flex-1 min-w-0 pl-10">
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 truncate">
                                    {cat.category}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {cat.count} publicação{cat.count !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>

                        <div className="text-right shrink-0 ml-4">
                            <div className="text-lg font-bold text-[#5421CD]">
                                {cat.percent.toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-500">
                                do total
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}