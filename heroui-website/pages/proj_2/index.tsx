import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/router";
import { Link } from "@heroui/link";
import { usePagination, PaginationItemType } from "@heroui/react";

import useMediaQuery from "@/components/mediaquery";
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
    display: string;
    report: string;
    description: string;
    href: string;
    isExternal: boolean;
    isBlogType: boolean;
    isImageType: boolean;
    track: string;
    tags: string[];
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

  const handlePageClick = (index: number) => {
    setActiveIndex(index);
  };

  const { activePage, range, setPage } = usePagination({
    total: housedisplays.length,
    showControls: true,
    siblings: 1,
    boundaries: 1,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstProjectRef = useRef<HTMLDivElement | null>(null);

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

        // Update the display based on horizontal scroll
        const newIndex = activeIndex + direction;
        if (newIndex >= 0 && newIndex < housedisplays.length) {
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
      display: "/photos/combined.jpg",
      report: "",
      description:
        "A group project that went through the full agile workflow to develop a fully working CRUD app in 3 months.",
      tags: ["Python", "TensorFlow", "Docker"],
      href: "https://github.com/CMPUT301F23T08/HouseHomey",
      isExternal: true,
      isImageType: true,
      isBlogType: false,
      track: "",
    },
    {
      id: 2,
      title: "JournAI",
      display: "/photos/journai.png",
      report: "",
      description:
        "A context aware journal which gives a breakdown of the emotional makeup of someone's journal entry.",
      tags: ["Python", "PyTorch", "Docker"],
      href: "https://github.com/jdrco/JournAI",
      isExternal: true,
      isImageType: true,
      isBlogType: false,
      track: "",
    },
    {
      id: 3,
      title: "CMPUT412 - Duckiebot",
      display: "/photos/ROBOT_BACKGROUND_2_GRAY.JPG",
      report: "/files/ALMO_Resume_2024.pdf",
      description:
        "Exercise 1 - Setting up duckiebot environment, class github repo, and developing personal website.",
      tags: ["Python", "Docker"],
      href: "https://github.com/antonio2uofa/CMPUT412",
      isExternal: true,
      isImageType: true,
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
              selectedProject.isBlogType ? (
                // Detailed View
                <Card className="h-full w-full flex flex-col p-4 dark:bg-gray-900 bg-gray-100">
                  <h4 className="text-gray-900 dark:text-gray-300 font-medium text-xl pb-2">
                    {selectedProject.title}
                  </h4>
                  <Card className="h-full w-full aspect-[16/9] max-h-[calc(72vh)]">
                    {selectedProject.isImageType ? (
                      <img
                        src={selectedProject.display}
                        alt={selectedProject.description}
                        className="h-full w-full aspect-[16/9] object-cover"
                      />
                    ) : (
                      /* eslint-disable-next-line jsx-a11y/media-has-caption */
                      <video
                        src={selectedProject.display}
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
                    )}
                  </Card>
                  <div className="flex gap-2 mt-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag}>{renderChip(tag)}</span>
                    ))}
                  </div>
                </Card>
              ) : (
                // Detailed View
                <Card
                  isPressable
                  onPress={() =>
                    selectedProject.isExternal
                      ? window.open(selectedProject.href)
                      : router.push(selectedProject.href)
                  }
                  className="h-full w-full flex flex-col p-4 dark:bg-gray-900 bg-gray-100"
                >
                  <h4 className="text-gray-900 dark:text-gray-300 font-medium text-xl pb-2">
                    {selectedProject.title}
                  </h4>
                  <Card className="h-full w-full aspect-[16/9]">
                    <img
                      src={selectedProject.display}
                      alt={selectedProject.description}
                      className="h-full w-full aspect-[16/9] object-fill"
                    />
                    <span className="material-symbols-outlined absolute bottom-4 right-4 dark:text-gray-200">
                      east
                    </span>
                  </Card>
                  <div className="flex gap-2 mt-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag}>{renderChip(tag)}</span>
                    ))}
                  </div>
                </Card>
              )
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
    <div
      ref={containerRef}
      className="relative flex flex-col h-screen bg-cover overflow-auto dark:bg-[url('/photos/UOFA_BACKGROUND_GRAY.JPG')] bg-[url('/photos/UOFA_BACKGROUND_2_GRAY.JPG')]"
    >
      <Head />
      <Navbar />
      <main className="mx-8 flex flex-col py-2 relative gap-4">
        <Card ref={firstProjectRef} className="w-full">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-green-500">
              University of Alberta
            </p>
            <small className="text-default-500">CMPUT301</small>
            <h1 className="font-bold text-left">HouseHomey</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-2 px-2">
            <Card
              className="w-full h-full"
              isPressable
              onPress={() =>
                window.open(
                  "https://github.com/CMPUT301F23T08/HouseHomey/tree/main"
                )
              }
            >
              <Image
                alt="Card background"
                className="object-cover h-full aspect-[2/3]"
                src={housedisplays[activeIndex]}
              />
              <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end ">
                <span className="material-symbols-outlined dark:text-white text-gray-900">
                  east
                </span>
              </CardFooter>
            </Card>
            {/* Pagination controls */}
            <div className="flex gap-4 justify-center items-center mt-2">
              {/* Prev Button */}
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : housedisplays.length - 1
                  )
                }
                className="text-sm bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded"
              >
                Prev
              </button>
              <ul className="flex gap-2">
                {housedisplays.map((_, index) => (
                  <li
                    key={index}
                    aria-label={`page ${index + 1}`}
                    className="w-4 h-4 cursor-pointer"
                  >
                    <div
                      className={`w-full h-full rounded-full ${
                        activeIndex === index
                          ? "bg-[#FFD700]/80 dark:bg-[#0028FF]/80"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  </li>
                ))}
              </ul>
              {/* Next Button */}
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev < housedisplays.length - 1 ? prev + 1 : 0
                  )
                }
                className="text-sm bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded"
              >
                Next
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
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
            window.open("https://github.com/antonio2uofa/CMPUT412")
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
              src={"/photos/ROBOT_BACKGROUND_2_GRAY.JPG"}
              width="screen"
            />
            <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end p-4">
              <span className="material-symbols-outlined text-white">east</span>
            </CardFooter>
          </CardBody>
          <div className="flex flex-wrap gap-2 p-2">
            <PythonChip />
            <PyTorchChip />
            <DockerChip />
          </div>
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
