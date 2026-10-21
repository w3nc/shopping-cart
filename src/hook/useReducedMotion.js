import { useSyncExternalStore } from "react";
import { getMotion, subscribeMotion } from "../utils/motion";

export default function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => getMotion() === "reduce",
    () => false,
  );
}
