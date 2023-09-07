import { useEffect, useRef } from "react";
import { isFunction } from "lodash";

import type { RefObject, MutableRefObject } from "react";

export const useCombinedRefs = <T = HTMLElement>(
  ...refs: Array<((instance: T | null) => void) | MutableRefObject<T | null> | null>
): RefObject<T> => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return void 0;

      if (isFunction(ref)) ref(targetRef.current);
      else ref.current = targetRef.current;
    });
  }, [refs]);

  return targetRef;
};
