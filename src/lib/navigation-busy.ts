type Listener = (busy: boolean) => void;

const listeners = new Set<Listener>();

/** Imperative signal for `router.push` / `replace` so the branded overlay can appear. */
export function markNavigationStart() {
  listeners.forEach((listener) => listener(true));
}

export function markNavigationEnd() {
  listeners.forEach((listener) => listener(false));
}

export function subscribeNavigationBusy(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
