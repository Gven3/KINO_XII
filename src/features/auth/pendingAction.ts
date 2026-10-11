// An action interrupted by the login modal (e.g. Notify Me while logged out).
// It runs once the user logs in or signs up, and is dropped if they close the modal.
let pendingAction: (() => void) | null = null;

export const pendingAuthAction = {
  set: (action: () => void) => {
    pendingAction = action;
  },
  run: () => {
    const action = pendingAction;
    pendingAction = null;
    action?.();
  },
  clear: () => {
    pendingAction = null;
  },
};
