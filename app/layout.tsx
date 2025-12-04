import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "MakerNews",
  description: "Descrição do site",
  icons: {
    icon: "/makerIcon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${lato.variable} ${montserrat.variable} antialiased`}>
        <>
          <Toaster/>
        </>
        {children}
      </body>
    </html>
  );
}
