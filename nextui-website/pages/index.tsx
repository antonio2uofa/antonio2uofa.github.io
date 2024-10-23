import DesktopLayout from "../layouts/desktop";
import MobileLayout from "../layouts/mobile";
import useMediaQuery from "../components/mediaquery";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button, ButtonGroup } from "@nextui-org/button";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Adjust this to your breakpoint

  return isDesktop ? (
    <DesktopLayout>{children}</DesktopLayout>
  ) : (
    <MobileLayout>
      <div className="flex flex-col gap-[5%] h-full">
        <Card className="hidden dark:block w-full h-full overflow-hidden">
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="website_photos/sitting_cross.JPG"
          />
        </Card>
        <Card className="dark:hidden w-full h-full overflow-hidden">
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="website_photos/sitting_cross.JPG"
          />
        </Card>
        <Card className="hidden dark:block w-full h-full overflow-hidden">
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="website_photos/hands_head.JPG"
          />
        </Card>
        <Card className="dark:hidden w-full h-full overflow-hidden">
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="website_photos/hands_head.JPG"
          />
        </Card>
      </div>
    </MobileLayout>
  );
}
