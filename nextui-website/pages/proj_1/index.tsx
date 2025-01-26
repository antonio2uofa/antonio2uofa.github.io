import useMediaQuery from "../../components/mediaquery";
import { useState, useEffect, useRef, ReactNode } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { useTheme } from "next-themes"; // Import the theme hook if using Next.js
import { useRouter } from "next/router";
import { Link } from "@heroui/link";
import { Head } from "@/layouts/head";
import { Navbar } from "@/components/navbar";
import {
  DockerChip,
  PythonChip,
  TensorFlowChip,
  PyTorchChip,
} from "../../components/chips";

export default function DefaultLayout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const { theme } = useTheme(); // Access the current theme
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

  const getThemeImage = (lightImage, darkImage) =>
    theme === "dark" ? darkImage : lightImage;

  useEffect(() => {
    const handleWheel = (event) => {
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

  return isDesktop ? (
    <div className="w-screen flex flex-col h-screen dark:bg-white px-4">
      <Head />
      <Navbar />
      <main className="h-full w-full dark:bg-[url('/photos/HONDA_SUNSET_2_GRAY.JPG')] bg-[url('/photos/HONDA_SUNSET_GRAY.JPG')] bg-cover bg-center rounded-[2rem] z-10">
        <div className="grid grid-rows-2 grid-cols-3 w-full h-full gap-4 p-4">
          {/* Top Row: Three equally-sized cards */}
          <Card
            isPressable
            onPress={() => router.push("/")}
            className="row-start-1 row-span-2 dark:bg-black bg-white"
          >
            {/* Header Section */}
            <CardHeader className="relative z-10 flex-col items-start pb-4">
              <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10"></div>
              <p className="text-tiny text-red-500 uppercase font-bold">
                HONDA
              </p>
              <p className="text-tiny text-white/70 uppercase">HRI2025</p>
              <h4 className="text-white/90 font-medium text-xl">
                Published Papers
              </h4>
            </CardHeader>

            {/* Body Section with Text */}
            <CardBody className="relative z-10 p-4">
              <p className="text-gray-800 dark:text-gray-200">
                Both of these papers were submitted to HRI2025 - a conference
                presenting the most advanced human-robot interaction research.
                Both of these papers look at ways of generating non-verbal cues
                for a conversation facilitator based on the non-verbal cues of
                the other participants in the conversation. The aim is to be
                able to replace the human facilitator with a virtual agent or
                robot facilitator.
                <br /> The first paper takes an approach based around energy
                models using raw pose data for observations. The second paper
                uses diffusion models and image data for replicating non-verbal
                cues.
              </p>
            </CardBody>

            {/* Footer Section */}
            <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-start p-4 bg-transparent rounded-bl-[2rem]">
              <span className="justify-start material-symbols-outlined dark:text-white text-black">
                west
              </span>
            </CardFooter>
          </Card>

          <Card
            isPressable
            onPress={() => window.open("https://arxiv.org/abs/2501.10857")}
            className="row-start-1 row-span-2 dark:bg-[url('/photos/ibc_flow_chart_gray.png')] bg-[url('/photos/ibc_flow_chart.png')] bg-center bg-cover"
          >
            <CardHeader className="absolute z-10 flex-col items-start">
              <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10"></div>
              <p className="text-tiny text-red-500 uppercase font-bold">
                HONDA
              </p>
              <p className="text-tiny text-white/70 uppercase">SC - HRI2025</p>
              <h4 className="text-white/90 font-medium text-l text-left">
                Learning Nonverbal Cues in Multiparty Social Interactions for
                Robotic Facilitators
              </h4>
            </CardHeader>
            <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-center p-4 bg-gradient-to-t from-black gap-2">
              <PythonChip />
              <TensorFlowChip />
              <DockerChip />
            </CardFooter>
          </Card>
          <Card
            isPressable
            onPress={() => window.open("https://arxiv.org/abs/2501.10869")}
            className="row-start-1 row-span-2 dark:bg-[url('/photos/dbc_flow_chart_gray_rotated.jpg')] bg-[url('/photos/dbc_flow_chart_rotated.jpg')] bg-center bg-cover"
          >
            <CardHeader className="absolute z-10 flex-col items-start">
              <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10"></div>
              <p className="text-tiny text-red-500 uppercase font-bold">
                HONDA
              </p>
              <p className="text-tiny text-white/70 uppercase">LBR - HRI2025</p>
              <h4 className="text-white/90 font-medium text-l text-left">
                Diffusion-Based Imitation Learning for Social Pose Generation
              </h4>
            </CardHeader>
            <CardFooter className="absolute bottom-0 gap-2 inset-x-0 z-10 flex items-center justify-center p-4 bg-gradient-to-t from-black">
              <PythonChip />
              <PyTorchChip />
              <DockerChip />
            </CardFooter>
          </Card>
        </div>
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
  ) : (
    <div
      ref={containerRef}
      className="relative flex flex-col h-screen bg-cover overflow-auto dark:bg-[url('/photos/HONDA_SUNSET_2_GRAY.JPG')] bg-[url('/photos/HONDA_SUNSET_GRAY.JPG')]"
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
            <p className="text-tiny uppercase font-bold text-red-500">HONDA</p>
            <small className="text-default-500">HRI2025</small>
            <h1 className="font-bold text-left">
              Learning Nonverbal Cues in Multiparty Social Interactions for
              Robotic Facilitators
            </h1>
          </CardHeader>

          <CardBody className="overflow-visible p-2 flex flex-col gap-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-full aspect-[2/3]"
              src={getThemeImage(
                "/photos/ibc_flow_chart_gray.png",
                "/photos/ibc_flow_chart.png"
              )}
              width="screen"
            />
            <div className="flex flex-wrap gap-2">
              <PythonChip />
              <TensorFlowChip />
              <DockerChip />
            </div>
          </CardBody>
        </Card>
        <Card
          className="w-full"
          isPressable
          shadow="sm"
          onPress={() => window.open("https://arxiv.org/abs/2501.10869")}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-red-500">HONDA</p>
            <small className="text-default-500">HRI2025</small>
            <h1 className="font-bold text-left">
              Diffusion-Based Imitation Learning for Social Pose Generation
            </h1>
          </CardHeader>

          <CardBody className="overflow-visible p-2 flex flex-col gap-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-full aspect-[2/3]"
              src={getThemeImage(
                "/photos/dbc_flow_chart_gray_rotated.jpg",
                "/photos/dbc_flow_chart_rotated.jpg"
              )}
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
