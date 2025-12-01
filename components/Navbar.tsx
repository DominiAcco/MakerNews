import { CircuitBoard, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
    theme?: "light" | "dark";
}

export default function Navbar({ theme = "light" }: NavbarProps) {
    const isLight = theme === "light";
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className={`relative ${isLight ? "text-black" : "text-white"}`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <CircuitBoard 
                        size={48} 
                        color={isLight ? "black" : "white"} 
                        className="w-8 h-8 sm:w-12 sm:h-12"
                    />
                    <h1 className="font-bold text-2xl sm:text-4xl">Maker</h1>
                </div>

                <div className="hidden md:flex items-center text-lg gap-8 lg:gap-20 font-bold">
                    {["Home", "Publicações", "Contato"].map((item) => (
                        <p
                            key={item}
                            className={`relative cursor-pointer after:block after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                                isLight ? "after:bg-black" : "after:bg-white"
                            }`}
                        >
                            {item}
                        </p>
                    ))}
                </div>

                <button 
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Abrir menu"
                >
                    {isMenuOpen ? (
                        <X size={32} color={isLight ? "black" : "white"} />
                    ) : (
                        <Menu size={32} color={isLight ? "black" : "white"} />
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 rounded-lg">
                    <div className={"flex flex-col p-4 text-black"}>
                        {["Home", "Publicações", "Contato"].map((item) => (
                            <a
                                key={item}
                                className="py-3 px-4 text-lg font-semibold border-b last:border-b-0 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}