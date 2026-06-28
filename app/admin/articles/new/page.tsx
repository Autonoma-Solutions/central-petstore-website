import ArticleForm from '../ArticleForm'

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Tambah Artikel Baru
      </h1>
      <ArticleForm />
    </div>
  )
}
