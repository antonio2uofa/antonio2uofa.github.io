import useMediaQuery from "../../components/mediaquery";
import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
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
  NextJSChip,
} from "../../components/chips";

export default function DefaultLayout() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const { theme } = useTheme(); // Access the current theme
  const router = useRouter();
  // Define the Project type
  type Project = {
    id: number;
    title: string;
    image: string;
    description: string;
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
      image: "/photos/combined.jpg",
      description:
        "A group project that went through the full agile workflow to develop a fully working CRUD app in 3 months.",
      tags: ["Python", "TensorFlow", "Docker"],
    },
    {
      id: 2,
      title: "JournAI",
      image: "/photos/journai.png",
      description:
        "A context aware journal which gives a breakdown of the emotional makeup of someone's journal entry.",
      tags: ["Python", "PyTorch", "Docker"],
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
      <Navbar></Navbar>
      <main className="h-full w-full dark:bg-[url('/photos/UOFA_BACKGROUND_2_GRAY.JPG')] bg-[url('/photos/UOFA_BACKGROUND_GRAY.JPG')] bg-cover bg-center rounded-[2rem] z-10">
        <div className="grid grid-rows-2 grid-cols-3 w-full h-full gap-4 p-4">
          {/* Left card with description */}
          <Card
            isPressable
            onPress={() =>
              selectedProject ? goBackToList() : router.push("/")
            }
            className="h-full w-full flex flex-col row-start-1 row-span-1 dark:bg-gray-900 bg-white"
          >
            {/* Card Header */}
            <CardHeader className="relative z-10 flex-col items-start flex-shrink-0 p-4">
              <h4 className="text-green-500 font-medium text-xl">
                Description
              </h4>
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

            {/* Card Footer */}
            <CardFooter className="flex items-center justify-start flex-shrink-0 p-4">
              <div className="text-left">
                <span className="material-symbols-outlined">west</span>
              </div>
            </CardFooter>
          </Card>
          <Card className="row-start-2 row-span-1 dark:bg-black bg-white">
            <div className="w-full h-full flex flex-col justify-center gap-8 text-center px-8">
              {copySuccess && (
                <div className="text-green-500 font-bold text-lg">
                  {copySuccess}
                </div>
              )}
              {contactDetails.map((detail, index) =>
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
              )}
              {/* Feedback Message */}
            </div>
          </Card>

          {/* Combined Middle and Right Cards */}
          <Card className="row-start-1 row-span-2 col-start-2 col-span-2 dark:bg-gray-900 bg-gray-100">
            {selectedProject ? (
              // Detailed View
              <Card className="h-full w-full flex flex-col p-4 overflow-y-auto dark:bg-gray-900 bg-gray-100">
                <h4 className="text-gray-900 dark:text-gray-300 font-medium text-xl pb-2">
                  {selectedProject.title}
                </h4>
                <Card className="h-full w-full aspect-[16/9]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full aspect-[16/9] object-fill"
                  />
                </Card>
                {/*FOR VIDEO THIS SHOULD WORK */}
                {/* <Card className="h-full w-full aspect-[16/9]">
                  <video
                    controls
                    className="h-full w-full aspect-[16/9] object-cover"
                    src={selectedProject.image} // Assuming the 'image' is actually a video URL
                  />
                </Card> */}

                <div className="flex gap-2 mt-4">
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
                  <h4 className="text-lg font-bold text-green-500">
                    Coursework & Projects
                  </h4>
                </header>

                {/* Scrollable list view */}
                <div className="max-h-[calc(75vh)] overflow-y-auto">
                  <ul className="space-y-4">
                    {projects.map((project) => (
                      <li
                        key={project.id}
                        className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <h5 className="text-md font-semibold text-gray-700 dark:text-gray-300">
                          {project.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {project.description.substring(0, 50)}...
                        </p>
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
                      <div
                        className={`w-full h-full rounded-full ${
                          activeIndex + 1 === page // Adjusted comparison
                            ? "bg-[#FFD700]/80 dark:bg-[#0028FF]/80"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
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
