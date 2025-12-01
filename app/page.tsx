"use client";

import { JSX, useEffect, useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HomeBanner1 from "@/components/HomeBanner1";
import HomeBanner2 from "@/components/HomeBanner2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PublicationList } from "@/components/PublicationsList";

type Banner = {
  image: string;
  component: JSX.Element;
  navbarTheme: "dark" | "light";
};

const banners: Banner[] = [
  {
    image: "/backgroundBanner-1.jpg",
    component: <HomeBanner1 />,
    navbarTheme: "dark",
  },
  {
    image: "/backgroundBanner-2.jpg",
    component: <HomeBanner2 />,
    navbarTheme: "light",
  },
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentBannerRef = useRef(currentBanner);

  useEffect(() => {
    currentBannerRef.current = currentBanner;
  }, [currentBanner]);

  const handleBannerChange = useCallback((newIndex: number) => {
    if (newIndex === currentBannerRef.current || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentBanner(newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning]);

  const nextBanner = useCallback(() => {
    handleBannerChange((currentBannerRef.current + 1) % banners.length);
  }, [handleBannerChange]);

  const prevBanner = useCallback(() => {
    handleBannerChange((currentBannerRef.current - 1 + banners.length) % banners.length);
  }, [handleBannerChange]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextBanner();
    }, 8000); 

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextBanner]);


  return (
    <main>
      <section className="relative flex justify-center bg-center bg-cover min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url('${banners[currentBanner].image}')` }}
        />

        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${
            isTransitioning ? "opacity-30" : "opacity-0"
          }`}
        />

        <div className="relative w-[90%] md:w-[80%] flex flex-col mt-6 md:mt-10 z-10">
          <Navbar theme={banners[currentBanner].navbarTheme} />

          <div
            className={`transition-all duration-700 ease-in-out ${
              isTransitioning
                ? "opacity-0 transform translate-y-4"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            {banners[currentBanner].component}
          </div>
        </div>

        {/* Indicadores responsivos */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10">
          {banners.map((_, idx) => (
            <button
              key={idx}
              className={`rounded-full transition-all duration-500 ease-out cursor-pointer ${
                idx === currentBanner 
                  ? "bg-white w-6 h-2 md:w-8 md:h-3" 
                  : "bg-white/50 w-2 h-2 md:w-3 md:h-3 hover:bg-white/70"
              }`}
              onClick={() => handleBannerChange(idx)}
              aria-label={`Ir para banner ${idx + 1}`}
            />
          ))}
        </div>

        {/* Botões de navegação responsivos */}
        <button
          onClick={prevBanner}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-25 top-1/2 -translate-y-1/2 bg-black/50 p-2 md:p-3 rounded-full hover:bg-black/70 text-white transition-all duration-300 ease-out hover:scale-105 md:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Banner anterior"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </button>
        <button
          onClick={nextBanner}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-25 top-1/2 -translate-y-1/2 bg-black/50 p-2 md:p-3 rounded-full hover:bg-black/70 text-white transition-all duration-300 ease-out hover:scale-105 md:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Próximo banner"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </button>
      </section>
      
      <PublicationList />
    </main>
  );
}