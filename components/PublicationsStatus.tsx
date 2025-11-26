import { FileText, CheckCircle, Archive, Calendar } from "lucide-react";

interface StatusData {
    total: number;
    active: number;
    archived: number;
    thisMonth: number;
}

export default function PublicationsStatus({
    total,
    active,
    archived,
    thisMonth
}: StatusData) {

    const cards = [
        {
            label: "Total de Publicações",
            value: total,
            icon: <FileText />,
            color: "bg-purple-950 text-white",
        },
        {
            label: "Publicações Ativas",
            value: active,
            icon: <CheckCircle />,
            color: "bg-green-700 text-white",
        },
        {
            label: "Arquivadas",
            value: archived,
            icon: <Archive />,
            color: "bg-gray-700 text-white",
        },
        {
            label: "Publicadas Este Mês",
            value: thisMonth,
            icon: <Calendar />,
            color: "bg-blue-700 text-white",
        },
    ];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="rounded-xl py-4 px-8 bg-white border border-[#AEAEAE]"
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg w-fit ${card.color}`}>
                            {card.icon}
                        </div>

                        <p className="text-base text-gray-500">{card.label}</p>
                    </div>

                    <h2 className="text-3xl font-bold mt-3">{card.value}</h2>
                </div>
            ))}
        </section>
    );
}
