import DesktopLayout from "../../layouts/desktop";
import useMediaQuery from "../../components/mediaquery";
import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Link } from "@heroui/link";
import { Head } from "@/layouts/head";
import { Navbar } from "@/components/navbar";
import { usePagination, PaginationItemType } from "@heroui/react";
import {
  PythonChip,
  TensorFlowChip,
  DockerChip,
  PyTorchChip,
  JavaChip,
  FirebaseChip,
} from "../../components/chips";

export default function DefaultLayout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const { theme } = useTheme(); // Access the current theme
  const router = useRouter();

  const houseImages = [
    "/photos/login.png",
    "/photos/list.png",
    "/photos/add_item.png",
    "/photos/guitar.png",
  ];

  const { activePage, range, setPage } = usePagination({
    total: houseImages.length,
    showControls: true,
    siblings: 1,
    boundaries: 1,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);

  const getThemeImage = (lightImage: string, darkImage: string) =>
    theme === "dark" ? darkImage : lightImage;

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isScrolling) return;

      const { deltaY, deltaX } = event;
      const firstProject = firstProjectRef.current;
      if (firstProject) {
        const rect = firstProject.getBoundingClientRect();
        const topIsVisible = rect.top >= 0 && rect.top <= window.innerHeight;

        if (topIsVisible && deltaY < -5) {
          router.push("/project_page");
          return;
        }
      }

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
        const direction = deltaX > 0 ? 1 : -1; // Right scroll or left scroll

        // Update the image based on horizontal scroll
        const newIndex = activeIndex + direction;
        if (newIndex >= 0 && newIndex < houseImages.length) {
          setIsScrolling(true);
          setActiveIndex(newIndex);

          setTimeout(() => setIsScrolling(false), 750);
        }
      } else {
        setTimeout(() => setIsScrolling(false), 750);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeIndex, isScrolling, router]);

  return isDesktop ? (
    <div></div>
  ) : (
    <div
      ref={containerRef}
      className="relative flex flex-col h-screen bg-cover overflow-auto dark:bg-[url('/photos/UOFA_BACKGROUND_GRAY.JPG')] bg-[url('/photos/UOFA_BACKGROUND_2_GRAY.JPG')]"
    >
      <Head />
      <Navbar />
      <main className="mx-8 flex flex-col py-2 relative gap-4">
        <Card
          ref={firstProjectRef}
          className="w-full"
          isPressable
          onPress={() =>
            window.open(
              "https://github.com/CMPUT301F23T08/HouseHomey/tree/main"
            )
          }
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-green-500">
              University of Alberta
            </p>
            <small className="text-default-500">CMPUT301</small>
            <h1 className="font-bold text-left">HouseHomey</h1>
          </CardHeader>
          <CardBody className="overflow-visible p-2 flex flex-col gap-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-full aspect-[2/3]"
              src={houseImages[activeIndex]}
              width="screen"
            />
            {/* Pagination controls */}
            <ul className="flex gap-2 justify-center">
              {range.map((page) => {
                if (page === PaginationItemType.DOTS) {
                  return (
                    <li key={page} className="w-4 h-4">
                      ...
                    </li>
                  );
                }

                // Skip NEXT and PREV buttons
                if (
                  page !== PaginationItemType.NEXT &&
                  page !== PaginationItemType.PREV
                ) {
                  return (
                    <li
                      key={page}
                      aria-label={`page ${page}`}
                      className="w-4 h-4"
                    >
                      <button
                        className={`w-full h-full rounded-full ${
                          activeIndex + 1 === page // Adjusted comparison
                            ? "bg-[#FFD700]/80 dark:bg-[#0028FF]/80"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        onClick={() => {
                          setPage(page);
                          setActiveIndex(page - 1); // Sync the activeIndex with the selected page
                        }}
                      />
                    </li>
                  );
                }

                return null; // Skip rendering the NEXT and PREV buttons
              })}
            </ul>
            <div className="flex flex-wrap gap-2">
              <JavaChip />
              <FirebaseChip />
            </div>
          </CardBody>
        </Card>
        <Card
          className="w-full"
          isPressable
          shadow="sm"
          onPress={() =>
            window.open(
              "https://github.com/CMPUT301F23T08/HouseHomey/tree/main"
            )
          }
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-green-500">
              University of Alberta
            </p>
            <small className="text-default-500">CMPUT412</small>
            <h1 className="font-bold text-left">DuckieBots</h1>
          </CardHeader>

          <CardBody className="overflow-visible p-2 flex flex-col gap-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-full aspect-[2/3]"
              src={"/photos/hands_head.JPG"}
              width="screen"
            />
            <div className="flex flex-wrap gap-2">
              <PythonChip />
              <PyTorchChip />
              <DockerChip />
            </div>
          </CardBody>
        </Card>
      </main>
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
