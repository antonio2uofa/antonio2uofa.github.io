import { Link } from "@nextui-org/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen dark:bg-white">
      <Head />
      <Navbar />
      <div className="mx-8 flex flex-grow">
        <main className="container flex-grow dark:bg-[url('/img341.JPG')] bg-cover bg-center rounded-[4rem] z-10">
          {children}
        </main>
      </div>
      <footer className="w-full flex items-center justify-center py-1">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
