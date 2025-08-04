import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 border-t border-zinc-700 py-12 text-center text-sm text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-500">
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
            Scribbo
          </span>
          . All rights reserved.
        </p>

        <div className="flex items-center gap-2 md:gap-4">
          {[
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "About", href: "#" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors duration-150 shadow-md hover:shadow-lg"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
