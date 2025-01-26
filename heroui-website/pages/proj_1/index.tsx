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
      id: 1,
      title:
        "Learning Nonverbal Cues in Multiparty Social Interactions for Robotic Facilitators",
      conference: "HRI2025",
      org: "HONDA",
      image: {
        light: "/photos/ibc_flow_chart.png",
        dark: "/photos/ibc_flow_chart_gray.png",
      },
      url: "https://arxiv.org/abs/2501.10857",
      chips: [
        <PythonChip key="python" />,
        <TensorFlowChip key="tensorflow" />,
        <DockerChip key="docker" />,
      ],
    },
    {
      id: 2,
      title: "Diffusion-Based Imitation Learning for Social Pose Generation",
      conference: "HRI2025",
      org: "HONDA",
      image: {
        light: "/photos/dbc_flow_chart_rotated.jpg",
        dark: "/photos/dbc_flow_chart_gray_rotated.jpg",
      },
      url: "https://arxiv.org/abs/2501.10869",
      chips: [
        <PythonChip key="python" />,
        <PyTorchChip key="pytorch" />,
        <DockerChip key="docker" />,
      ],
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);

  const getThemeImage = (lightImage: string, darkImage: string) =>
    theme === "dark" ? darkImage : lightImage;

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
              <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
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
      <main className="mx-8 flex flex-col py-2 relative gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="w-full"
            isPressable
            onPress={() => window.open(project.url)}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold text-red-500">
                {project.org}
              </p>
              <small className="text-default-500">{project.conference}</small>
              <h1 className="font-bold text-left">{project.title}</h1>
            </CardHeader>

            <CardBody className="overflow-visible p-2 flex flex-col gap-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full h-full aspect-[2/3]"
                src={getThemeImage(project.image.dark, project.image.light)}
                width="screen"
              />
              <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end p-4 rounded-bl-[2rem]">
                <span className="material-symbols-outlined text-gray-900">
                  east
                </span>
              </CardFooter>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="flex flex-wrap gap-2">{project.chips}</div>
            </CardFooter>
          </Card>
        ))}
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
