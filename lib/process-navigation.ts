export const PROCESS_NAVIGATION_EVENT = "eco-magistral:process-navigation";

const PROCESS_NAVIGATION_ATTRIBUTE = "processNavigationHidden";

export function setProcessNavigationHidden(hidden: boolean) {
  if (typeof window === "undefined") return;

  if (hidden) {
    document.documentElement.dataset[PROCESS_NAVIGATION_ATTRIBUTE] = "true";
  } else {
    delete document.documentElement.dataset[PROCESS_NAVIGATION_ATTRIBUTE];
  }

  window.dispatchEvent(new Event(PROCESS_NAVIGATION_EVENT));
}

export function isProcessNavigationHidden() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset[PROCESS_NAVIGATION_ATTRIBUTE] === "true";
}
