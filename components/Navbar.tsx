// components/Navbar.tsx
"use client";

import { CircuitBoard, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
    theme?: "light" | "dark";
}

export default function Navbar({ theme = "light" }: NavbarProps) {
    const isLight = theme === "light";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const scrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (pathname !== "/") {
            router.push("/");
            
            setTimeout(() => {
                const contactSection = document.getElementById("contato");
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
            return;
        }
        
        const contactSection = document.getElementById("contato");
        if (contactSection) {
            setIsMenuOpen(false);
            
            contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    useEffect(() => {
        if (pathname === "/" && window.location.hash === "#contato") {
            setTimeout(() => {
                const contactSection = document.getElementById("contato");
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 500);
        }
    }, [pathname]);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Publicações", path: "/publicacoes" },
    ];

    return (
        <div className={`relative ${isLight ? "text-black" : "text-white"}`}>
            <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <CircuitBoard
                        size={48}
                        color={isLight ? "black" : "white"}
                        className="w-8 h-8 sm:w-12 sm:h-12"
                    />
                    <p className="font-bold text-2xl sm:text-4xl">
                        Maker<span className="text-[#5421CD]">News</span>
                    </p>

                </Link>

                <div className="hidden md:flex items-center text-lg gap-8 lg:gap-20 font-bold">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`relative cursor-pointer after:block after:h-0.5 after:transition-all after:duration-300 ${isActive
                                        ? "after:w-full"
                                        : "after:w-0 hover:after:w-full"
                                    } ${isLight
                                        ? "after:bg-black"
                                        : "after:bg-white"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                    <button
                        onClick={scrollToContact}
                        className={`relative cursor-pointer after:block after:h-0.5 after:transition-all after:duration-300 after:w-0 hover:after:w-full ${
                            isLight 
                                ? "after:bg-black" 
                                : "after:bg-white"
                        }`}
                    >
                        Contato
                    </button>
                </div>

                <button
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {isMenuOpen ? (
                        <X size={32} color={isLight ? "black" : "white"} />
                    ) : (
                        <Menu size={32} color={isLight ? "black" : "white"} />
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 rounded-lg mt-2">
                    <div className="flex flex-col p-4 text-black">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`py-3 px-4 text-lg font-semibold border-b last:border-b-0 transition-colors ${isActive
                                            ? "bg-purple-50 text-[#5421CD] border-purple-100"
                                            : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <button
                            onClick={scrollToContact}
                            className="py-3 px-4 text-lg font-semibold border-b last:border-b-0 transition-colors text-left hover:bg-gray-100"
                        >
                            Contato
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}