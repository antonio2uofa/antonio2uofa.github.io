import { useRouter } from "next/router";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";

import DesktopLayout from "@/layouts/desktop";
import MobileLayout from "@/layouts/mobile";
import useMediaQuery from "@/components/mediaquery";

export default function DefaultLayout() {
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Adjust this to your breakpoint
  const router = useRouter();
  const { theme } = useTheme();

  // Dynamic image handling
  const getImageSrc = (img: string) => {
    const [darkImg, lightImg] = img.split(" ");
    return theme === "dark" ? darkImg.replace("dark:", "") : lightImg;
  };

  return isDesktop ? (
    <DesktopLayout>
      <div className="grid grid-rows-2 grid-cols-3 w-full h-full gap-4 p-4">
        {/* Top Row: Three equally-sized cards */}
        <Card
          isPressable
          onPress={() => router.push("/proj_1")}
          className="row-start-1 row-span-2 dark:bg-[url('/photos/HONDA_SUNSET_2_GRAY.JPG')] bg-[url('/photos/HONDA_SUNSET_GRAY.JPG')] bg-center bg-cover"
        >
          <CardHeader className="absolute z-10 flex-col items-start">
            <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
            <p className="text-tiny text-red-500 uppercase font-bold">HONDA</p>
            <h4 className="text-white/90 font-medium text-xl">
              Published Papers
            </h4>
          </CardHeader>
          <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end p-4 bg-transparent rounded-bl-[2rem]">
            <span className="material-symbols-outlined text-white">east</span>
          </CardFooter>
        </Card>

        <Card
          isPressable
          onPress={() => router.push("/contact")}
          className="row-start-1 col-span-1 dark:bg-[url('/photos/bulb_clean.JPG')] bg-[url('/photos/stripe_album.JPG')] bg-center bg-cover"
        >
          <CardHeader className="absolute z-10 flex-col items-start">
            <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
            <p className="text-tiny text-blue-500 uppercase font-bold">
              Contact
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              Let&apos;s Get in Touch
            </h4>
          </CardHeader>
          <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end p-4">
            <span className="material-symbols-outlined text-white">east</span>
          </CardFooter>
        </Card>

        <Card
          isPressable
          onPress={() => window.open("/files/ALMO_Resume_2025_Revised.pdf")}
          className="row-start-1 col-span-1 dark:bg-[url('/photos/hands_head.JPG')] bg-[url('/photos/sweater_smile.JPG')] bg-center bg-cover"
        >
          <CardHeader className="absolute z-10 flex-col items-start">
            <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
            <p className="text-tiny text-blue-500 uppercase font-bold">
              Resume
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              Looking for Work
            </h4>
          </CardHeader>
          <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end p-4">
            <span className="material-symbols-outlined text-white">east</span>
          </CardFooter>
        </Card>

        {/* Bottom Row: Two cards, one wider than the other */}
        <Card
          isPressable
          onPress={() => router.push("/proj_2")}
          className="row-start-2 col-span-2 dark:bg-[url('/photos/UOFA_BACKGROUND_GRAY.JPG')] bg-[url('/photos/UOFA_BACKGROUND_2_GRAY.JPG')] bg-center bg-cover"
        >
          <CardHeader className="absolute z-10 flex-col items-start">
            <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
            <p className="text-tiny text-green-500 uppercase font-bold">
              University of Alberta
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              Coursework & Projects
            </h4>
          </CardHeader>
          <CardFooter className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-end p-4">
            <span className="material-symbols-outlined text-white">east</span>
          </CardFooter>
        </Card>
      </div>
    </DesktopLayout>
  ) : (
    <MobileLayout>
      <div className="flex flex-col gap-[5%] h-full">
        <Card
          isPressable
          onPress={() => router.push("/project_page")}
          className="hidden dark:block w-full h-full overflow-hidden"
        >
          <CardHeader className="absolute z-10 flex-col !items-start">
            <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b from-black/95 -z-10" />
            <p className="text-tiny text-[#FFD700]/80 dark:text-[#0028FF]/80 uppercase font-bold">
              my work
            </p>
            <h4 className=" text-white font-medium text-large">
              Check out my projects
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="aspect-[16/9] z-0 w-full h-full object-cover"
            src="photos/sitting_cross.JPG"
          />
          <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <div className="absolute h-full top-0 inset-0 bg-gradient-to-b from-black/50 to-black/50 opacity-80 -z-10" />

            <p className="text-tiny text-white">Learn More.</p>
            <span className="material-symbols-outlined text-white p-1">
              east
            </span>
          </CardFooter>
        </Card>
        <Card
          isPressable
          onPress={() => window.open("/files/ALMO_Resume_2025_Revised.pdf")}
          className="hidden dark:block w-full h-full overflow-hidden"
        >
          <CardHeader className="absolute z-10 flex-col !items-start">
            <div className="absolute h-[125%] top-0 inset-0 bg-gradient-to-b  from-black/95 -z-10" />

            <p className="text-tiny text-[#FFD700]/80 dark:text-[#0028FF]/80 uppercase font-bold">
              my resume
            </p>
            <h4 className=" text-white font-medium text-large">
              Check out my qualifications
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="aspect-[16/9] z-0 w-full h-full object-cover"
            src="photos/hands_head.JPG"
          />
          <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <div className="absolute h-full top-0 inset-0 bg-gradient-to-b  from-black/50 to-black/50 -z-10" />

            <p className="text-tiny text-white">Learn More.</p>
            <span className="material-symbols-outlined text-white p-1">
              east
            </span>
          </CardFooter>
        </Card>
        <Card
          isPressable
          onPress={() => router.push("/project_page")}
          className="dark:hidden w-full h-full overflow-hidden"
        >
          <CardHeader className="absolute z-10 top-0 flex-col !items-start">
            <div className="absolute h-full top-0 inset-0 bg-gradient-to-b  from-black/50 -z-10" />

            <p className="text-tiny text-[#FFD700]/80 dark:text-[#0028FF]/80 uppercase font-bold">
              my work
            </p>
            <h4 className="text-white font-medium text-large">
              Check out my projects
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="aspect-[16/9] z-0 w-full h-full object-cover"
            src="photos/sweater_smile.JPG"
          />
          <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white">Learn More.</p>
            <div className="absolute h-full top-0 inset-0 bg-gradient-to-b  from-black/20 to-black/20 -z-10" />
            <span className="material-symbols-outlined text-white p-1">
              east
            </span>
          </CardFooter>
        </Card>
        <Card
          isPressable
          onPress={() => window.open("/files/ALMO_Resume_2025_Revised.pdf")}
          className="dark:hidden w-full h-full overflow-hidden"
        >
          <CardHeader className="absolute z-10 top-0 flex-col !items-start">
            <div className="absolute h-full top-0 inset-0 bg-gradient-to-b  from-black/50 -z-10" />

            <p className="text-tiny text-[#FFD700]/80 dark:text-[#0028FF]/80 uppercase font-bold">
              my resume
            </p>
            <h4 className="font-medium text-large text-white ">
              Check out my qualifications
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="aspect-[16/9] z-0 w-full h-full object-cover"
            src="photos/chair_elbow.JPG"
          />
          <CardFooter className="justify-between border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white">Learn More.</p>
            <div className="absolute h-full top-0 inset-0 bg-gradient-to-b  from-black/20 to-black/20 -z-10" />
            <span className="material-symbols-outlined text-white p-1">
              east
            </span>
          </CardFooter>
        </Card>
      </div>
    </MobileLayout>
  );
}
