import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

// Custom hook to delay rendering until after the theme is resolved
const HydrationWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Only render after the theme is resolved
  }, [theme]);

  if (!mounted) return null; // Prevent rendering until hydration is complete

  return (
    <div className={resolvedTheme === "dark" ? "dark" : ""}>{children}</div>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" enableSystem={true}>
        <HydrationWrapper>
          <Component {...pageProps} />
        </HydrationWrapper>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
