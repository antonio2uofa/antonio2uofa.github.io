import { Link } from "@nextui-org/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen dark:bg-[url('/img341.JPG')] bg-[url('/website_photos/stripe_album.JPG')] bg-cover overflow-auto">
      <Head />
      <Navbar />
      <div className="mx-8 flex flex-grow py-2">{children}</div>
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
