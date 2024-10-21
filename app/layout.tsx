import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="px-4 py-6 max-w-screen-sm mx-auto grid grid-rows-[50px_1fr_110px] lg:grid-rows-[50px_1fr_60px] min-h-screen">
          <header>
            <Link href="/">
              <h1 className="uppercase bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text text-xl md:text-2xl xl:text-3xl text-center font-bold">
                Les événements à Paris
              </h1>
            </Link>
          </header>
          <div>{children}</div>
          <footer className="flex flex-wrap text-sm justify-center gap-6 py-4 mt-4">
            <Link className="hover:underline" href={"/"}>
              Accueil
            </Link>
            <Link className="hover:underline" href={"#"}>
              À propos
            </Link>
            <Link className="hover:underline" href={"#"}>
              Conditions
            </Link>
            <Link className="hover:underline" href={"#"}>
              Les événements sur Paris
            </Link>
            <Link className="hover:underline" href={"#"}>
              Autres événements
            </Link>
            <div className="my-2 text-center text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Beebs Event.</p>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
