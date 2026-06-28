import VideoForm from '../../VideoForm'

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Edit Video
      </h1>
      <VideoForm id={id} />
    </div>
  )
}
