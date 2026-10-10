import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full px-8 flex items-center justify-center">
      <div className="w-full border-t border-surface-light flex items-center justify-between py-5">
        <Logo for="footer" />
        <span className="text-muted text-body-s">
          © 2026 Kino XII. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
