import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-accent/20 border-t border-border py-12 text-center text-sm text-text">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="gradient-text font-semibold">Scribbo</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-0">
          <Link
            href="/privacy"
            className="px-3 py-1 rounded transition text-text hover:text-primary hover:bg-primary/10"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="px-3 py-1 rounded transition text-text hover:text-primary hover:bg-primary/10"
          >
            Terms
          </Link>
          <Link
            href="/about"
            className="px-3 py-1 rounded transition text-text hover:text-primary hover:bg-primary/10"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}