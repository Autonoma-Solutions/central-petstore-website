import TestimonialForm from '../../TestimonialForm'

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Edit Testimoni
      </h1>
      <TestimonialForm id={id} />
    </div>
  )
}
