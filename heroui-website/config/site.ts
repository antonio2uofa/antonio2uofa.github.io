export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "HOME",
      href: "/",
    },
    {
      label: "PROJECTS",
      href: "/proj_2",
    },
    {
      label: "RESUME",
      href: "/files/ALMO_Resume_2024.pdf",
    },
    {
      label: "CONTACT",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Resume",
      href: "/files/ALMO_Resume_2024.pdf",
    },
    {
      label: "Projects",
      href: "/project_page",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
