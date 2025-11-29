import { capitalize } from "./capitalize";

export function getMonthYearFormatted(locale: string = "pt-BR") {
    const date = new Date();
    const month = capitalize(date.toLocaleString(locale, { month: "long" }));
    const year = date.getFullYear();
    return `${month}, ${year}`;
}
