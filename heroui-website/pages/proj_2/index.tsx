import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/router";
import { Link } from "@heroui/link";

import useMediaQuery from "@/components/mediaquery";
import MobileLayout from "@/layouts/mobile";
import { Head } from "@/layouts/head";
import { Navbar } from "@/components/navbar";
import {
  PythonChip,
  TensorFlowChip,
  DockerChip,
  PyTorchChip,
  JavaChip,
  FirebaseChip,
  NextJSChip,
} from "@/components/chips";
import { GithubIcon } from "@/components/icons";

export default function DefaultLayout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const router = useRouter();
  // Define the Project type
  type Project = {
    id: number;
    title: string;
    href: string;
    report: string;
    description: string;
    media: mediaContainer[];
    isExternal: boolean;
    isBlogType: boolean;
    track: string;
    tags: string[];
  };

  type mediaContainer = {
    display: string;
    isImage: boolean;
  };

  const renderChip = (tag: String) => {
    switch (tag) {
      case "Python":
        return <PythonChip />;
      case "TensorFlow":
        return <TensorFlowChip />;
      case "Docker":
        return <DockerChip />;
      case "PyTorch":
        return <PyTorchChip />;
      case "Java":
        return <JavaChip />;
      case "Firebase":
        return <FirebaseChip />;
      case "Next.js":
        return <NextJSChip />;
      default:
        return (
          <span className="px-2 py-1 text-sm font-semibold bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded">
            {tag}
          </span>
        );
    }
  };

  const housedisplays = [
    "/photos/login.png",
    "/photos/list.png",
    "/photos/add_item.png",
    "/photos/guitar.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [copySuccess, setCopySuccess] = useState(""); // State for copy feedback

  const contactDetails = [
    {
      label: "EMAIL",
      value: "antonio2@ualberta.ca", // Actual email to copy
    },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/antonio2uofa/",
    },
    {
      label: "GITHUB",
      href: "https://github.com/antonio2uofa",
    },
  ];

  // List of projects
  const projects: Project[] = [
    {
      id: 1,
      title: "CMPUT301 - HouseHomey",
      href: "https://github.com/CMPUT301F23T08/HouseHomey",
      report: "",
      description:
        "A group project that went through the full agile workflow to develop a fully working CRUD app in 3 months.",
      tags: ["Python", "TensorFlow", "Docker"],
      media: [{ display: "/photos/combined.jpg", isImage: true }],
      isExternal: true,
      isBlogType: false,
      track: "",
    },
    {
      id: 2,
      title: "JournAI",
      report: "",
      description:
        "A context aware journal which gives a breakdown of the emotional makeup of someone's journal entry.",
      tags: ["Python", "PyTorch", "Docker"],
      href: "https://github.com/jdrco/JournAI",
      media: [{ display: "/photos/journai.png", isImage: true }],
      isExternal: true,
      isBlogType: false,
      track: "",
    },
    {
      id: 3,
      title: "CMPUT412 - Duckiebot",

      report: "/ex1/ex1.pdf",
      description:
        "Exercise 1 - Setting up duckiebot environment, class github repo, and developing personal website.",
      tags: ["Python", "Docker"],
      media: [
        { display: "/ex1/IMG_0572.JPG", isImage: true },
        { display: "/ex1/IMG_0623.MOV", isImage: false },
        { display: "/ex1/IMG_0629.MOV", isImage: false },
      ],
      href: "https://github.com/antonio2uofa/CMPUT412",
      isExternal: true,
      isBlogType: true,
      track: "",
    },
    // Add other projects as needed
  ];

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess("Email copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
      })
      .catch(() => {
        setCopySuccess("Failed to copy. Please try again.");
        setTimeout(() => setCopySuccess(""), 2000);
      });
  };

  // Back to list view
  const goBackToList = () => setSelectedProject(null);

  return isDesktop ? (
    <div className="w-screen flex flex-col h-screen dark:bg-white px-4">
      <Navbar />
      <main className="h-full w-full dark:bg-[url('/photos/UOFA_BACKGROUND_2_GRAY.JPG')] bg-[url('/photos/UOFA_BACKGROUND_GRAY.JPG')] bg-cover bg-center rounded-[2rem] z-10">
        <div className="grid grid-rows-2 grid-cols-3 w-full h-full gap-4 p-4">
          {/* Left card with description */}
          <Card
            isPressable
            onPress={() =>
              selectedProject ? goBackToList() : router.push("/")
            }
            className="flex flex-col row-start-1 row-span-1 dark:bg-gray-900 bg-white"
          >
            {/* Card Header */}
            <CardHeader className="relative z-10 flex-col items-start flex-shrink-0 p-4">
              <h4 className="text-green-500 font-bold text-xl">Description</h4>
              {!selectedProject && (
                <div className="text-left">
                  <h5 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                    This is a collection of projects done for courses or outside
                    of work and school. It will also be used for hosting my
                    robotics homework from CMPUT412.
                  </h5>
                </div>
              )}
              {selectedProject && (
                <div className="text-left">
                  <h6 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                    {selectedProject.description}
                  </h6>
                </div>
              )}
            </CardHeader>
            {/* Spacer for dynamic height */}
            <div className="flex-grow"></div>

            {/* Card Footer */}
            <CardFooter className="flex items-center p-4">
              <div className="text-left">
                <span className="material-symbols-outlined">west</span>
              </div>
            </CardFooter>
          </Card>
          <Card className="row-start-2 row-span-1 dark:bg-black bg-white">
            <div className="w-full h-full flex flex-col justify-center gap-8 text-center">
              {copySuccess && (
                <div className="text-green-500 font-bold text-lg">
                  {copySuccess}
                </div>
              )}

              {selectedProject?.isBlogType ? (
                // Display PDF and GitHub buttons when isBlogType is true
                <div className="flex flex-col h-full w-full">
                  <h4 className="text-green-500 font-bold text-xl p-2 text-left ml-2">
                    Reports
                  </h4>
                  <div className="flex w-full h-full gap-4 p-4 pt-0">
                    <Button
                      as="a"
                      href={selectedProject.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center text-white bg-red-500 hover:bg-red-700"
                    >
                      <span className="material-symbols-outlined object-cover">
                        picture_as_pdf
                      </span>
                    </Button>
                    <Button
                      as="a"
                      href={selectedProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center text-white bg-blue-500 hover:bg-blue-700"
                    >
                      <span className="object-cover">
                        <GithubIcon />
                      </span>
                    </Button>
                  </div>
                </div>
              ) : (
                // Default clickable links
                contactDetails.map((detail, index) =>
                  detail.label === "EMAIL" ? (
                    <button
                      key={index}
                      onClick={() => handleCopyToClipboard(detail.value!)}
                      className="text-black dark:text-gray-300 font-extrabold text-4xl uppercase tracking-wider hover:underline transition"
                    >
                      {detail.label}
                    </button>
                  ) : (
                    <a
                      key={index}
                      href={detail.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-gray-300 font-extrabold text-4xl uppercase tracking-wider hover:underline transition"
                    >
                      {detail.label}
                    </a>
                  )
                )
              )}
            </div>
          </Card>

          <Card className="row-start-1 row-span-2 col-start-2 col-span-2 dark:bg-gray-900 bg-gray-100">
            {selectedProject ? (
              // Detailed View
              <Card className="h-full w-full flex flex-col p-4 dark:bg-gray-900 bg-gray-100">
                <h4 className="text-gray-900 dark:text-gray-300 font-medium text-xl pb-2">
                  {selectedProject.title}
                </h4>
                <Card
                  isPressable
                  onPress={() => router.push(selectedProject.href)}
                  className="h-full w-full aspect-[16/9] max-h-[calc(72vh)]"
                >
                  {selectedProject.media.length === 1 ? (
                    /* Check if we are displaying an image*/
                    selectedProject.media[0].isImage ? (
                      <img
                        src={selectedProject.media[0].display}
                        alt={selectedProject.description}
                        className="h-full w-full aspect-[16/9] object-fill"
                      />
                    ) : (
                      /* eslint-disable-next-line jsx-a11y/media-has-caption */
                      <video
                        src={selectedProject.media[0].display}
                        controls
                        className="h-full w-full aspect-[16/9] object-cover"
                      >
                        <track
                          src={selectedProject.track}
                          kind="subtitles"
                          srcLang="en"
                          label="English"
                        />
                      </video>
                    )
                  ) : (
                    /* Scrollable media list */
                    <div className="flex h-full w-full overflow-x-auto space-x-2">
                      {selectedProject.media.map((mediaItem, index) => (
                        <div
                          key={index}
                          className="h-full w-full shrink-0 aspect-[16/9]"
                        >
                          {mediaItem.isImage ? (
                            <img
                              src={mediaItem.display}
                              alt={selectedProject.description}
                              className="h-full w-full object-cover rounded-lg"
                            />
                          ) : (
                            /* eslint-disable-next-line jsx-a11y/media-has-caption */
                            <video
                              src={mediaItem.display}
                              controls
                              className="h-full w-full object-cover rounded-lg"
                            >
                              <track
                                src={selectedProject.track}
                                kind="subtitles"
                                srcLang="en"
                                label="English"
                              />
                            </video>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <CardFooter className="rounded-b-xl absolute bottom-0 z-10 flex items-center justify-end bg-gradient-to-t from-white dark:from-black">
                    <span className="material-symbols-outlined text-black dark:text-white">
                      east
                    </span>
                  </CardFooter>
                </Card>
                <div className="flex gap-2 mt-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag}>{renderChip(tag)}</span>
                  ))}
                </div>
              </Card>
            ) : (
              // Scrollable List View
              <div className="h-full max-h-[calc(85vh)] p-4">
                {/* Header for the list */}
                <header className="mb-4">
                  <h4 className="text-xl font-bold text-green-500">
                    Coursework & Projects
                  </h4>
                </header>

                {/* Scrollable list view */}
                <div className="max-h-[calc(75vh)] overflow-y-auto">
                  <ul className="space-y-4">
                    {projects.map((project) => (
                      <li key={project.id} className="rounded-lg">
                        <div
                          className="p-4 w-full text-left bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setSelectedProject(project);
                            }
                          }}
                        >
                          <h5 className="text-md font-semibold text-gray-700 dark:text-gray-300">
                            {project.title}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {project.description.substring(0, 50)}...
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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
    <MobileLayout>
      <div className="flex flex-col items-center gap-6 h-full w-full">
        {projects.map((project, index) => (
          <Card key={index} className="w-full h-full flex flex-col" shadow="sm">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-md uppercase font-bold">{project.title}</p>
              <h1 className="font-serif text-sm text-left">
                {project.description}
              </h1>
            </CardHeader>

            {/* Media Preview - Horizontal Scroll */}
            <CardBody className="overflow-visible p-2 flex flex-col gap-2">
              <div className="flex flex-row gap-2 overflow-x-auto">
                {project.media.map((mediaItem, mediaIndex) => (
                  <div
                    key={mediaItem.display || mediaIndex}
                    className={`shrink-0 w-full h-full snap-center px-2 ${
                      project.media.length === 1 ? "overflow-x-auto" : ""
                    }`}
                  >
                    {mediaItem.isImage ? (
                      <div
                        className={`${
                          project.media.length === 1
                            ? "overflow-x-auto flex h-full object-cover"
                            : "w-full h-full"
                        } aspect-[2/3]`}
                      >
                        <Image
                          alt={project.description}
                          className={`rounded-lg ${
                            project.media.length === 1
                              ? "min-w-[350%]"
                              : "w-full aspect-[2/3]"
                          } h-full object-cover `}
                          src={mediaItem.display}
                        />
                      </div>
                    ) : (
                      /* eslint-disable-next-line jsx-a11y/media-has-caption */
                      <video
                        src={mediaItem.display}
                        controls
                        className="w-full h-full object-cover aspect-[2/3] rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardBody>

            <CardFooter
              onClick={() => router.push(project.href)}
              className="flex items-center justify-end pt-0 cursor-pointer transition-all duration-300 active:scale-80"
            >
              <span className="material-symbols-outlined dark:text-white text-gray-900">
                east
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
}
