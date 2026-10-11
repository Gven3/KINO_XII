// Keeps the live hold per session, so a refresh mid checkout can resume it.
const holdKey = (sessionId: number) => `kinoxii_hold_${sessionId}`;

export const holdStorage = {
  get: (sessionId: number) => sessionStorage.getItem(holdKey(sessionId)),
  set: (sessionId: number, holdId: string) =>
    sessionStorage.setItem(holdKey(sessionId), holdId),
  clear: (sessionId: number) => sessionStorage.removeItem(holdKey(sessionId)),
};
