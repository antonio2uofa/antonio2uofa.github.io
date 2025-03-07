import { Link } from "@heroui/link";
import { Head } from "./head";
import { Navbar } from "@/components/navbar";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Step 1: Create a ref for the outer div
  return (
    <div className="relative flex flex-col h-screen bg-cover overflow-auto dark:bg-[url('/photos/dim/bulb_down_dim.JPG')] bg-[url('/photos/stripe_album.JPG')]">
      <Head />
      <Navbar />
      <main className="mx-8 flex flex-grow py-2 relative">{children}</main>
      <footer className="w-full flex items-center justify-center py-1">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Contact me</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
