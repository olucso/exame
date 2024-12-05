import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Baralho',
  description: 'Baralho de Cartas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-gradient-to-br from-green-200 to-green-300 text-white h-screen flex items-center justify-center">
        <div className="p-6 rounded-lg h-full w-full max-w-4xl">
          <header className="text-center mb-6 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-neutral-950">Baralho de Cartas</h1>
            <p className="text-neutral-900">Cartas de um baralho comum</p>
          </header>
          <main>{children}</main>
          <footer className="text-center text-sm mt-6 text-neutral-950 flex flex-col gap-2">
            <p>Lucas Resende Lima | RM: 556564</p>
          </footer>
        </div>
      </body>
    </html>
  );
}