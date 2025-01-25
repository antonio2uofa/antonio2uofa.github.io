import DesktopLayout from "../../layouts/desktop";
import MobileLayout from "../../layouts/mobile";
import useMediaQuery from "../../components/mediaquery";
import { useState } from "react";

export default function ContactPage() {
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Breakpoint for responsiveness

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

  const desktopStyle = (
    <DesktopLayout>
      <div className="grid grid-cols-1 items-center w-full h-full">
        {/* Main Contact Card */}
        <div className="relative rounded-[2rem] bg-center bg-cover h-full flex flex-col justify-center items-center">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 -z-10 rounded-[2rem]"></div>

          {/* Contact Links */}
          <div className="flex flex-col gap-8 text-center px-8">
            {contactDetails.map((detail, index) =>
              detail.label === "EMAIL" ? (
                <button
                  key={index}
                  onClick={() => handleCopyToClipboard(detail.value!)}
                  className="text-white dark:text-gray-300 font-extrabold text-4xl uppercase tracking-wider hover:underline transition"
                >
                  {detail.label}
                </button>
              ) : (
                <a
                  key={index}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white dark:text-gray-300 font-extrabold text-4xl uppercase tracking-wider hover:underline transition"
                >
                  {detail.label}
                </a>
              )
            )}
          </div>

          {/* Feedback Message */}
          {copySuccess && (
            <div className="mt-4 text-green-500 font-bold text-lg">
              {copySuccess}
            </div>
          )}
        </div>
      </div>
    </DesktopLayout>
  );

  const mobileStyle = (
    <MobileLayout>
      <div className="flex flex-col justify-center items-center w-full h-full bg-gradient-to-b from-black/90 via-transparent to-black/90 rounded-xl">
        {contactDetails.map((detail, index) =>
          detail.label === "EMAIL" ? (
            <button
              key={index}
              onClick={() => handleCopyToClipboard(detail.value!)}
              className="text-black dark:text-white font-extrabold text-2xl uppercase tracking-wide hover:underline mb-4"
            >
              {detail.label}
            </button>
          ) : (
            <a
              key={index}
              href={detail.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white font-extrabold text-2xl uppercase tracking-wide hover:underline mb-4"
            >
              {detail.label}
            </a>
          )
        )}

        {/* Feedback Message */}
        {copySuccess && (
          <div className="mt-4 text-green-500 font-bold text-lg">
            {copySuccess}
          </div>
        )}
      </div>
    </MobileLayout>
  );

  return isDesktop ? desktopStyle : mobileStyle;
}
