"use client";

import Image from "next/image";

const items = [
  { id: "01", title: "Impressora 3D", img: "/3d-printer.png" },
  { id: "02", title: "Arduinos e sensores", img: "/arduino-sensor.jpg" },
  { id: "03", title: "Kits de robótica", img: "/robotics-kits.jpg" },
  { id: "04", title: "Computadores", img: "/computers.jpg" },
];

export default function InfrastructureSection() {
  return (
    <section className="mt-24 mb-32 flex justify-center bg-gray-50 py-16">
      <div className="w-[90%] md:w-[80%] flex flex-col lg:flex-row gap-12 items-start">
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>
            <h3 className="text-4xl font-bold text-[#5421CD] mb-4">
              Infraestrutura
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Conheça nossa infraestrutura e explore os recursos disponíveis para
              criar, testar e desenvolver suas ideias.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {items.map((it, index) => {
              const isPurple = index % 2 !== 0; 

              return (
                <div
                  key={it.id}
                  className={`flex items-center gap-5 w-full rounded-full px-6 py-4 shadow-sm transition-all hover:scale-[1.02] border-2 
                    ${
                      isPurple
                        ? "bg-[#5421CD] border-[#5421CD] text-white" 
                        : "bg-white border-[#5421CD] text-[#5421CD]" 
                    }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg 
                      ${
                        isPurple
                          ? "bg-white text-[#5421CD]" 
                          : "bg-[#5421CD] text-white"
                      }`}
                  >
                    {it.id}
                  </div>
                  <span className="text-lg font-semibold">{it.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((it) => (
            <div
              key={it.id}
              className="group relative h-64 w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-[#5421CD] text-white flex items-center justify-center rounded-full font-bold text-lg shadow-lg border-2 border-white">
                {it.id}
              </div>

              <div className="absolute inset-0 bg-gray-100/50" />
              
              <Image
                src={it.img}
                alt={it.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}