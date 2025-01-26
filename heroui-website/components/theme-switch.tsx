import { FC, useState, useEffect } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange,
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <Component
      {...getBaseProps({
        "aria-label": isSelected
          ? "Switch to dark mode"
          : "Switch to light mode",
        className: clsx(
          "cursor-pointer px-px transition-opacity hover:opacity-80",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "!text-default-500",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "h-auto",
              "mx-0",
              "pt-px",
              "px-0",
              "rounded-lg",
              "w-auto",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {isSelected ? (
          <SunFilledIcon size={22} className="text-[#FFD700]/80" />
        ) : (
          <MoonFilledIcon size={22} className="text-[#0028FF]/80" />
        )}
      </div>
    </Component>
  );
};
