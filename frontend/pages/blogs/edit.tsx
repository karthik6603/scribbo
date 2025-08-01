import { useRouter } from 'next/router'
export default function EditBlog() {
  const { query } = useRouter()
  return <div className="p-6">Edit Blog ID: {query.id}</div>
}
