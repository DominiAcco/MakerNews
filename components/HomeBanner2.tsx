import { Button } from "./ui/button";

export default function HomeBanner2() {
    return (
        <div className="w-[80%] mt-15">
            <div className="mt-40 max-w-lg p-10 rounded-2xl bg-[#6D8799] transition-all duration-700">
                <p className="text- text-5xl font-bold">
                    A tecnologia <br />
                    da Impressão 3D
                </p>

                <p className="mt-10 mb-10 text-white">
                    Nosso projeto maker conecta curiosidade, tecnologia e criatividade.
                    Um ambiente onde o fazer é o ponto de partida para aprender,
                    compartilhar e evoluir.
                </p>

                <Button
                    variant="homeButtonDark"
                    size="homeButtonSize"
                >
                    Clique aqui
                </Button>
            </div>
        </div>
    );
}
