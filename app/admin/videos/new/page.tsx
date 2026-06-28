import VideoForm from '../VideoForm'

export default function NewVideoPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Tambah Video
      </h1>
      <VideoForm />
    </div>
  )
}
