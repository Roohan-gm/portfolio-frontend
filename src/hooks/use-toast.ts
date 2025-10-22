"use client";

import { useEffect, useState } from "react";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";

export interface ToastT {
  id: string;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  position?: ToastPosition;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  [key: string]: unknown; // allow arbitrary extra props
}

interface State {
  toasts: ToastT[];
}

type Action =
  | { type: "ADD_TOAST"; toast: ToastT }
  | { type: "UPDATE_TOAST"; toast: Partial<ToastT> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1_000_000;

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
let count = 0;
function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string): void {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

// ------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId !== undefined) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((t) => addToRemoveQueue(t.id));
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

// ------------------------------------------------------------------
// Global state + pub/sub
// ------------------------------------------------------------------
const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

// ------------------------------------------------------------------
// Imperative API
// ------------------------------------------------------------------
export interface ToastAPI {
  id: string;
  dismiss: () => void;
  update: (props: Partial<ToastT>) => void;
}

function toast(props: Omit<ToastT, "id" | "open">): ToastAPI {
  const id = genId();

  const update = (up: Partial<ToastT>) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...up, id } });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, dismiss, update };
}

// ------------------------------------------------------------------
// Hook
// ------------------------------------------------------------------
export function useToast(): State & { toast: typeof toast; dismiss: (toastId?: string) => void } {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { toast };