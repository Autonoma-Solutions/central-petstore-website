import ArticleDetail from '../ArticleDetail'

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ArticleDetail slug={slug} />
}
