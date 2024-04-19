'ue client'
import { ReactNode, useCallback, useEffect, useRef } from "react";

interface UseTimeoutReturn {
  reset: () => void;
  clear: () => void;
}

export default function useTimeout(
  callback: () => void,
  delay: number
): UseTimeoutReturn {
  const callbackRef = useRef<() => void>(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
