import VideoDetail from '../VideoDetail'

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <VideoDetail id={id} />
}
