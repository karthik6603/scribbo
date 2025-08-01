import { useRouter } from 'next/router'
export default function BlogDetail() {
  const { query } = useRouter()
  return <div className="p-6">Viewing blog: {query.id}</div>
}
