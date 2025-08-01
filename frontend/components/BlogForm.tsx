export default function BlogForm() {
  return (
    <form className="space-y-4">
      <input className="border p-2 w-full" placeholder="Title" />
      <textarea className="border p-2 w-full" placeholder="Content" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  )
}
