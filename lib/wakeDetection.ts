import { AppState, AppStateStatus } from "react-native";
import type { Store } from "@reduxjs/toolkit";

/**
 * Heuristic wake detection (Option A).
 *
 * When the app becomes active after being backgrounded, if the user previously started
 * sleep mode and the elapsed time looks like a real sleep session, we set a suggested
 * wake time ("now").
 */
export function setupWakeDetection(params: {
  store: Store;
  selectSleepStartISO: (state: any) => string | null | undefined;
  setSuggestedWakeAction: (payload: { wakeISO: string }) => any;
  minHours?: number;
  maxHours?: number;
}) {
  const {
    store,
    selectSleepStartISO,
    setSuggestedWakeAction,
    minHours = 3,
    maxHours = 14,
  } = params;

  let current: AppStateStatus = AppState.currentState;

  const sub = AppState.addEventListener("change", (next) => {
    const becameActive = current.match(/inactive|background/) && next === "active";
    current = next;

    if (!becameActive) return;

    const state = store.getState();
    const startISO = selectSleepStartISO(state);
    if (!startISO) return;

    const startMs = new Date(startISO).getTime();
    const nowMs = Date.now();
    const hours = (nowMs - startMs) / (1000 * 60 * 60);

    if (hours >= minHours && hours <= maxHours) {
      store.dispatch(setSuggestedWakeAction({ wakeISO: new Date(nowMs).toISOString() }));
    }
  });

  return () => sub.remove();
}
