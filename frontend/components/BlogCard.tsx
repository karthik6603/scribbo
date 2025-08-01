export default function BlogCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-4 border rounded shadow mb-4">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  )
}
