import { Button } from "./ui/button";

export default function HomeBanner1() {
    return (
        <div className="w-[80%] mt-15">
            <div className="mt-40 max-w-lg">
                <h2 className="text-white text-5xl font-bold">
                    <span className="block">Conheça nosso</span>
                    <span className="block">projeto Maker</span>
                </h2>

                <div className="text-white text-lg mt-12 mb-12">
                    Nosso projeto maker conecta curiosidade, tecnologia e criatividade. Um ambiente onde o fazer é o ponto de partida para aprender, compartilhar e evoluir.
                </div>

                <Button
                    variant="homeButtonLight"
                    size="homeButtonSize"
                >
                    Clique aqui
                </Button>
            </div>
        </div>
    )
}