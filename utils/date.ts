import { capitalize } from "./capitalize";

export function getMonthYearFormatted(locale: string = "pt-BR") {
    const date = new Date();
    const month = capitalize(date.toLocaleString(locale, { month: "long" }));
    const year = date.getFullYear();
    return `${month}, ${year}`;
}

export function formatDateBR(dateString: string | Date): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("pt-BR", { month: "short" });
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
}
