import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { useRouter } from "next/router";
import { Link } from "@heroui/link";

import { Head } from "@/layouts/head";
import { Navbar } from "@/components/navbar";
import { NextJSChip, FirebaseChip } from "@/components/chips";

export default function DefaultLayout() {
  const router = useRouter(); // Next.js router for navigation

  const projects = [
    {
      title: "HONDA",
      description: "My first published papers",
      img: "dark:/photos/HONDA_SUNSET_2_GRAY.JPG /photos/HONDA_SUNSET_GRAY.JPG",
      link: "/proj_1",
    },
    {
      title: "University of Alberta",
      description: "My first work term",
      img: "dark:/photos/UOFA_BACKGROUND_GRAY.JPG /photos/UOFA_BACKGROUND_2_GRAY.JPG",
      link: "/proj_2",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isScrolling) return;

      const { deltaY } = event;

      // Check if the top of the first project is in view
      const firstProject = firstProjectRef.current;

      if (firstProject) {
        const rect = firstProject.getBoundingClientRect();
        const topIsVisible = rect.top >= 0 && rect.top <= window.innerHeight;

        if (topIsVisible && deltaY < -5) {
          router.push("/project_page");
          return;
        }
      }

      const direction = deltaY > 0 ? 1 : -1;
      const newIndex = activeIndex + direction;

      if (newIndex >= 0 && newIndex < projects.length) {
        setIsScrolling(true);
        setActiveIndex(newIndex);

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
  }, [activeIndex, projects.length, isScrolling, router]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-screen bg-cover bg-center overflow-auto dark:bg-[url('/photos/ROBOT_BACKGROUND_GRAY.JPG')] bg-[url('/photos/ROBOT_BACKGROUND_2_GRAY.JPG')]"
    >
      <Head />
      <Navbar />
      <main className="mx-8 flex flex-col py-2 relative gap-4">
        <Card
          ref={firstProjectRef}
          className="w-full"
          isPressable
          onPress={() => window.open("https://arxiv.org/abs/2501.10857")}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-blue-500">
              Hackathons
            </p>
            <small className="text-default-500">HackED 2023</small>
            <h1 className="font-bold text-left">JournAI</h1>
          </CardHeader>

          <CardBody className="overflow-visible p-2 flex flex-col gap-2">
            <Image
              alt="Card background"
              className="object-cover object-bottom rounded-xl w-full h-full aspect-[2/3]"
              src={"/photos/journai_rotated.png"}
              width="screen"
            />
            <div className="flex flex-wrap gap-2">
              <FirebaseChip />
              <NextJSChip />
            </div>
          </CardBody>
        </Card>
      </main>
      <footer className="w-full flex items-center justify-center">
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
