import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers navigation (Link, redirect, usePathname, useRouter)
// conscients des locales, à utiliser partout à la place des équivalents next/*
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
