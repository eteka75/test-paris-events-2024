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
  title: " Beebs Event",
  description: "Découvrez tous évènements sur Paris et environs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="px-4 py-6 max-w-screen-sm mx-auto grid grid-rows-[50px_1fr_110px] lg:grid-rows-[50px_1fr_60px] min-h-screen">
          <header>
            <h1 className="uppercase bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text text-2xl xl:text-3xl text-center font-bold">
              Les évènements sur Paris
            </h1>
          </header>
          <div>{children}</div>
          <footer className="flex flex-wrap text-sm justify-center gap-6 py-4 mt-4">
            <Link className="hover:underline" href={"#"}>
              A propos
            </Link>
            <Link className="hover:underline" href={"#"}>
              Conditions
            </Link>
            <Link className="hover:underline" href={"#"}>
              Les évènements sur Paris
            </Link>
            <Link className="hover:underline" href={"#"}>
              Autres évènements
            </Link>
          </footer>
        </main>
      </body>
    </html>
  );
}
