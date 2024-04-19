'use client'
import { useEffect, DependencyList } from "react";
import useTimeout from "./useTimeout";

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: DependencyList
) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    reset();
  }, [...dependencies, reset]);

  useEffect(() => {
    clear();
  }, []);

  return { reset, clear };
}
