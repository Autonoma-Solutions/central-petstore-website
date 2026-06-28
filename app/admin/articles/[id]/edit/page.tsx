import ArticleForm from '../../ArticleForm'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Edit Artikel
      </h1>
      <ArticleForm id={id} />
    </div>
  )
}
