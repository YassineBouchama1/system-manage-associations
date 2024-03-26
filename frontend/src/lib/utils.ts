export const jwt = {
  decode: (token: string | undefined) => {
    if (!token) return;

    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  },
};


import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
