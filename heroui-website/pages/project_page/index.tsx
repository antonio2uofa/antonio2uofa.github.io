// import { useState, useEffect, useRef } from "react";
// import { useTheme } from "next-themes"; // Import the theme hook if using Next.js
// import { useRouter } from "next/router";
// import { usePagination, PaginationItemType } from "@heroui/react";
// import { Card, CardHeader, CardFooter } from "@heroui/card";
// import { Image } from "@heroui/image";

// import MobileLayout from "../../layouts/mobile";
// import useMediaQuery from "../../components/mediaquery";

// export default function DefaultLayout() {
//   const isDesktop = useMediaQuery("(min-width: 640px)");
//   const { theme } = useTheme(); // Access the current theme
//   const router = useRouter(); // Next.js router for navigation

//   const projects = [
//     {
//       title: "HONDA",
//       description: "My first published papers",
//       img: "dark:photos/HONDA_SUNSET_2_GRAY.JPG photos/HONDA_SUNSET_GRAY.JPG",
//       link: "/proj_1",
//       color: "text-red-500", // Unique color for HONDA
//     },
//     {
//       title: "University of Alberta",
//       description: "Coursework & Class Projects",
//       img: "dark:/photos/UOFA_BACKGROUND_GRAY.JPG photos/UOFA_BACKGROUND_2_GRAY.JPG",
//       link: "/proj_2",
//       color: "text-green-500", // Unique color for University of Alberta
//     },
//     {
//       title: "Hackathons",
//       description: "Explore my past projects",
//       img: "dark:photos/ROBOT_BACKGROUND_GRAY.JPG photos/ROBOT_BACKGROUND_2_GRAY.JPG",
//       link: "/proj_3",
//       color: "text-blue-500", // Unique color for Hackathons
//     },
//   ];

//   const { activePage, range, setPage } = usePagination({
//     total: projects.length,
//     showControls: true,
//     siblings: 1,
//     boundaries: 1,
//   });

//   // Ref for the scrollable container
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);

//   // To control the cooldown for scrolling
//   const [isScrolling, setIsScrolling] = useState(false);

//   useEffect(() => {
//     const handleWheel = (event: WheelEvent) => {
//       // Prevent scrolling multiple pages at once
//       if (isScrolling) return;

//       setIsScrolling(true);
//       setTimeout(() => setIsScrolling(false), 750); // Cooldown period (750ms)

//       if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
//         // Vertical scrolling detected
//         if (event.deltaY > 0) {
//           // Scroll up: Navigate to the project page or update content
//           if (activePage <= projects.length) {
//             router.push(projects[activePage - 1].link); // Navigate to next project
//           }
//         }
//       } else {
//         // Check if the scroll is horizontal (deltaX)
//         if (event.deltaX < 1) {
//           // Scroll left
//           setPage(activePage > 1 ? activePage - 1 : 1);
//         } else if (event.deltaX > -1) {
//           // Scroll right
//           setPage(
//             activePage < projects.length ? activePage + 1 : projects.length
//           );
//         }
//       }
//     };

//     const container = scrollContainerRef.current;

//     if (container) {
//       container.addEventListener("wheel", handleWheel);
//     }

//     // Cleanup the event listener when the component is unmounted
//     return () => {
//       if (container) {
//         container.removeEventListener("wheel", handleWheel);
//       }
//     };
//   }, [activePage, setPage, isScrolling, projects.length]);

//   // Dynamic image handling
//   const getImageSrc = (index: number) => {
//     const [darkImg, lightImg] = projects[index].img.split(" ");

//     return theme === "dark" ? darkImg.replace("dark:", "") : lightImg;
//   };

//   useEffect(() => {
//     if (isDesktop) {
//       router.push("/");
//     }
//   }, [isDesktop, router]);

//   return (
//     <MobileLayout>
//       <div className="h-full flex flex-col items-center">
//         {/* Scrollable container with horizontal scroll */}
//         <div
//           ref={scrollContainerRef}
//           className="w-full h-full flex items-center justify-center overflow-hidden"
//         >
//           {/* Conditionally render only the active project */}
//           <div
//             key={activePage}
//             className="transition-opacity duration-500 ease-in-out h-full"
//           >
//             <Card className="w-full h-full overflow-hidden">
//               <CardHeader className="absolute z-10 flex-col !items-start">
//                 <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
//                 <p
//                   className={`text-tiny uppercase font-bold ${
//                     projects[activePage - 1].color
//                   }`}
//                 >
//                   {projects[activePage - 1].title}
//                 </p>
//                 <h4 className="text-white font-medium text-large">
//                   {projects[activePage - 1].description}
//                 </h4>
//               </CardHeader>
//               <Image
//                 removeWrapper
//                 alt="Card background"
//                 className="z-0 w-full h-full object-cover aspect-[16/9]"
//                 src={getImageSrc(activePage - 1)}
//               />
//               <CardFooter className="justify-center border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
//                 <div className="absolute h-full top-0 inset-0 bg-gradient-to-b from-black/50 to-black/50 opacity-80 -z-10" />
//                 <div className="flex flex-col items-center cursor-pointer">
//                   <span className="material-symbols-outlined text-white text-large">
//                     keyboard_double_arrow_down
//                   </span>
//                   <p className="text-tiny text-white">Scroll Down</p>
//                 </div>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>

//         {/* Pagination controls */}
//         <ul className="flex gap-2 items-center mt-4">
//           {range.map((page) => {
//             if (page === PaginationItemType.DOTS) {
//               return (
//                 <li key={page} className="w-4 h-4">
//                   ...
//                 </li>
//               );
//             }

//             // We skip the NEXT and PREV buttons here
//             if (
//               page !== PaginationItemType.NEXT &&
//               page !== PaginationItemType.PREV
//             ) {
//               return (
//                 <li key={page} aria-label={`page ${page}`} className="w-4 h-4">
//                   <div
//                     className={`w-full h-full rounded-full ${
//                       activePage === page
//                         ? "bg-[#FFD700]/80 dark:bg-[#0028FF]/80"
//                         : "bg-gray-300 hover:bg-gray-400"
//                     }`}
//                   />
//                 </li>
//               );
//             }

//             return null; // Skip rendering the NEXT and PREV buttons
//           })}
//         </ul>
//       </div>
//     </MobileLayout>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import { useTheme } from "next-themes"; // Import the theme hook if using Next.js
// import { useRouter } from "next/router";
// import { usePagination, PaginationItemType } from "@heroui/react";
// import { Card, CardHeader, CardFooter } from "@heroui/card";
// import { Image } from "@heroui/image";

// import MobileLayout from "../../layouts/mobile";
// import useMediaQuery from "../../components/mediaquery";

// export default function DefaultLayout() {
//   const isDesktop = useMediaQuery("(min-width: 640px)");
//   const { theme } = useTheme(); // Access the current theme
//   const router = useRouter(); // Next.js router for navigation

//   const projects = [
//     {
//       title: "HONDA",
//       description: "My first published papers",
//       img: "dark:photos/HONDA_SUNSET_2_GRAY.JPG photos/HONDA_SUNSET_GRAY.JPG",
//       link: "/proj_1",
//       color: "text-red-500", // Unique color for HONDA
//     },
//     {
//       title: "University of Alberta",
//       description: "Coursework & Class Projects",
//       img: "dark:/photos/UOFA_BACKGROUND_GRAY.JPG photos/UOFA_BACKGROUND_2_GRAY.JPG",
//       link: "/proj_2",
//       color: "text-green-500", // Unique color for University of Alberta
//     },
//     {
//       title: "Hackathons",
//       description: "Explore my past projects",
//       img: "dark:photos/ROBOT_BACKGROUND_GRAY.JPG photos/ROBOT_BACKGROUND_2_GRAY.JPG",
//       link: "/proj_3",
//       color: "text-blue-500", // Unique color for Hackathons
//     },
//   ];

//   const { activePage, range, setPage } = usePagination({
//     total: projects.length,
//     showControls: true,
//     siblings: 1,
//     boundaries: 1,
//   });

//   // Ref for the scrollable container
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);
//   // To control the cooldown for scrolling
//   const [isScrolling, setIsScrolling] = useState(false);

//   useEffect(() => {
//     const handleWheel = (event: WheelEvent) => {
//       // Prevent scrolling multiple pages at once
//       if (isScrolling) return;

//       setIsScrolling(true);
//       setTimeout(() => setIsScrolling(false), 750); // Cooldown period (750ms)

//       if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
//         // Vertical scrolling detected
//         if (event.deltaY > 0) {
//           // Scroll up: Navigate to the project page or update content
//           if (activePage <= projects.length) {
//             router.push(projects[activePage - 1].link); // Navigate to next project
//           }
//         }
//       } else {
//         // Check if the scroll is horizontal (deltaX)
//         if (event.deltaX < 1) {
//           // Scroll left
//           setPage(activePage > 1 ? activePage - 1 : 1);
//         } else if (event.deltaX > -1) {
//           // Scroll right
//           setPage(
//             activePage < projects.length ? activePage + 1 : projects.length
//           );
//         }
//       }
//     };

//     const container = scrollContainerRef.current;

//     if (container) {
//       container.addEventListener("wheel", handleWheel);
//     }

//     // Cleanup the event listener when the component is unmounted
//     return () => {
//       if (container) {
//         container.removeEventListener("wheel", handleWheel);
//       }
//     };
//   }, [activePage, setPage, isScrolling, projects.length]);

//   // For touch start position (for mobile)
//   const touchStartRef = useRef<{ x: number; y: number } | null>(null);

//   useEffect(() => {
//     const handleTouchMove = (event: TouchEvent) => {
//       if (event.touches.length > 0) {
//         const touchEnd = event.touches[0];

//         if (touchStartRef.current) {
//           const deltaX_mobile = touchEnd.pageX - touchStartRef.current.x;
//           const deltaY_mobile = touchEnd.pageY - touchStartRef.current.y;

//           // Only log and take action when deltas are non-zero
//           if (deltaX_mobile !== 0 || deltaY_mobile !== 0) {
//             // Vertical swipe (scrolling up/down)
//             if (Math.abs(deltaY_mobile) > Math.abs(deltaX_mobile)) {
//               if (deltaY_mobile > 0) {
//                 // Scroll down: Navigate to the next project
//                 if (activePage <= projects.length) {
//                   router.push(projects[activePage - 1].link); // Navigate to next project
//                 }
//               }
//             } else {
//               // Horizontal swipe (left/right)
//               if (deltaX_mobile < 0) {
//                 // Scroll left
//                 setPage(activePage > 1 ? activePage - 1 : 1);
//               } else {
//                 // Scroll right
//                 setPage(
//                   activePage < projects.length
//                     ? activePage + 1
//                     : projects.length
//                 );
//               }
//             }
//           }
//         }

//         // Update touch start position
//         touchStartRef.current = {
//           x: touchEnd.pageX,
//           y: touchEnd.pageY,
//         };
//       }
//     };

//     const container = scrollContainerRef.current;

//     if (container) {
//       container.addEventListener("touchmove", handleTouchMove);
//     }

//     // Cleanup the event listener when the component is unmounted
//     return () => {
//       if (container) {
//         container.removeEventListener("touchmove", handleTouchMove);
//       }
//     };
//   }, [activePage, setPage, projects.length]);

//   // Dynamic image handling
//   const getImageSrc = (index: number) => {
//     const [darkImg, lightImg] = projects[index].img.split(" ");
//     return theme === "dark" ? darkImg.replace("dark:", "") : lightImg;
//   };

//   useEffect(() => {
//     if (isDesktop) {
//       router.push("/");
//     }
//   }, [isDesktop, router]);

//   return (
//     <MobileLayout>
//       <div className="h-full flex flex-col items-center">
//         {/* Scrollable container with horizontal scroll */}
//         <div
//           ref={scrollContainerRef}
//           className="w-full h-full flex items-center justify-center overflow-hidden"
//         >
//           {/* Conditionally render only the active project */}
//           <div
//             key={activePage}
//             className="transition-opacity duration-500 ease-in-out h-full"
//           >
//             <Card className="w-full h-full overflow-hidden">
//               <CardHeader className="absolute z-10 flex-col !items-start">
//                 <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
//                 <p
//                   className={`text-tiny uppercase font-bold ${
//                     projects[activePage - 1].color
//                   }`}
//                 >
//                   {projects[activePage - 1].title}
//                 </p>
//                 <h4 className="text-white font-medium text-large">
//                   {projects[activePage - 1].description}
//                 </h4>
//               </CardHeader>
//               <Image
//                 removeWrapper
//                 alt="Card background"
//                 className="z-0 w-full h-full object-cover aspect-[16/9]"
//                 src={getImageSrc(activePage - 1)}
//               />
//               <CardFooter className="justify-center border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
//                 <div className="absolute h-full top-0 inset-0 bg-gradient-to-b from-black/50 to-black/50 opacity-80 -z-10" />
//                 <div className="flex flex-col items-center cursor-pointer">
//                   <span className="material-symbols-outlined text-white text-large">
//                     keyboard_double_arrow_down
//                   </span>
//                   <p className="text-tiny text-white">Scroll Down</p>
//                 </div>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>

//         {/* Pagination controls */}
//         <ul className="flex gap-2 items-center mt-4">
//           {range.map((page) => {
//             if (page === PaginationItemType.DOTS) {
//               return (
//                 <li key={page} className="w-4 h-4">
//                   ...
//                 </li>
//               );
//             }

//             // We skip the NEXT and PREV buttons here
//             if (
//               page !== PaginationItemType.NEXT &&
//               page !== PaginationItemType.PREV
//             ) {
//               return (
//                 <li key={page} aria-label={`page ${page}`} className="w-4 h-4">
//                   <div
//                     className={`w-full h-full rounded-full ${
//                       activePage === page
//                         ? "bg-[#FFD700]/80 dark:bg-[#0028FF]/80"
//                         : "bg-gray-300 hover:bg-gray-400"
//                     }`}
//                   />
//                 </li>
//               );
//             }

//             return null; // Skip rendering the NEXT and PREV buttons
//           })}
//         </ul>
//       </div>
//     </MobileLayout>
//   );
// }

// const projects = [
//   {
//     title: "HONDA",
//     description: "My first published papers",
//     img: "dark:photos/HONDA_SUNSET_2_GRAY.JPG photos/HONDA_SUNSET_GRAY.JPG",
//     link: "/proj_1",
//     color: "text-red-500", // Unique color for HONDA
//   },
//   {
//     title: "University of Alberta",
//     description: "Coursework & Class Projects",
//     img: "dark:/photos/UOFA_BACKGROUND_GRAY.JPG photos/UOFA_BACKGROUND_2_GRAY.JPG",
//     link: "/proj_2",
//     color: "text-green-500", // Unique color for University of Alberta
//   },
//   {
//     title: "Hackathons",
//     description: "Explore my past projects",
//     img: "dark:photos/ROBOT_BACKGROUND_GRAY.JPG photos/ROBOT_BACKGROUND_2_GRAY.JPG",
//     link: "/proj_3",
//     color: "text-blue-500", // Unique color for Hackathons
//   },
// ];

import { useTheme } from "next-themes"; // Import the theme hook if using Next.js
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { useRouter } from "next/router";

import MobileLayout from "@/layouts/mobile";
import useMediaQuery from "@/components/mediaquery";

export default function ProjectList() {
  const { theme } = useTheme(); // Access the current theme
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const projects = [
    {
      title: "HONDA",
      description: "My first published papers",
      img: "dark:photos/HONDA_SUNSET_2_GRAY.JPG photos/HONDA_SUNSET_GRAY.JPG",
      link: "/proj_1",
      color: "text-red-500", // Unique color for HONDA
    },
    {
      title: "University of Alberta",
      description: "Coursework & Projects",
      img: "dark:/photos/UOFA_BACKGROUND_GRAY.JPG photos/UOFA_BACKGROUND_2_GRAY.JPG",
      link: "/proj_2",
      color: "text-green-500", // Unique color for University of Alberta
    },
  ];

  // Dynamic image handling
  const getImageSrc = (img: string) => {
    const [darkImg, lightImg] = img.split(" ");
    return theme === "dark" ? darkImg.replace("dark:", "") : lightImg;
  };

  useEffect(() => {
    if (isDesktop) {
      router.push("/");
    }
  }, [isDesktop, router]);

  return (
    <MobileLayout>
      <div className="flex flex-col items-center gap-6 w-full">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="w-full max-w-md"
            isPressable
            shadow="sm"
            onPress={() => router.push(project.link)}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className={`text-tiny uppercase font-bold ${project.color}`}>
                {project.title}
              </p>
              <h1 className="font-bold text-left">{project.description}</h1>
            </CardHeader>
            <CardBody className="overflow-visible p-2 flex flex-col gap-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full h-full aspect-[2/3]"
                src={getImageSrc(project.img)}
                width="screen"
              />
            </CardBody>
            <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end p-4 bg-gradient-to-t dark:from-black from-white">
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
