import "@/app/css/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FilterProvider } from "@/context/FilterContext";
import { ThemeProvider } from "next-themes";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beebs Event",
  description: "Découvrez tous les événements sur Paris et environs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href="/icon512_rounded.png"
          sizes="512x512"
          type="image/png"
        />
        <link
          rel="icon"
          href="/icon512_maskable.png"
          sizes="512x512"
          type="image/png"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="px-4 py-6 max-w-screen-sm mx-auto grid grid-rows-[50px_1fr_110px] lg:grid-rows-[50px_1fr_60px] min-h-screen">
            <Header title="Les Évènements à Paris" />
            <main>
              <FilterProvider>{children}</FilterProvider>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
