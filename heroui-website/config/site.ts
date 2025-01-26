export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Antonio Martin-O.",
  description: "A personal portfolio for Antonio Martin-O.",
  navItems: [
    {
      label: "HOME",
      href: "/",
      isExternal: false,
    },
    {
      label: "PROJECTS",
      href: "/proj_2",
      isExternal: false,
    },
    {
      label: "RESUME",
      href: "/files/ALMO_Resume_2024.pdf",
      isExternal: true,
    },
    {
      label: "CONTACT",
      href: "/contact",
      isExternal: false,
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
      isExternal: false,
    },
    {
      label: "Resume",
      href: "/files/ALMO_Resume_2024.pdf",
      isExternal: true,
    },
    {
      label: "Projects",
      href: "/project_page",
      isExternal: false,
    },
    {
      label: "Contact",
      href: "/contact",
      isExternal: false,
    },
  ],
  links: {
    github: "https://github.com/antonio2uofa",
  },
};
