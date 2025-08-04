export default function BlogCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900 text-white shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out mb-4">
      <h2 className="text-xl font-semibold text-cyan-400 mb-2">{title}</h2>
      <p className="text-sm text-zinc-300 leading-relaxed">{content}</p>
    </div>
  );
}
