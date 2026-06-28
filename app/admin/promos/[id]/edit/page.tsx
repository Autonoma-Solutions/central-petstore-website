import PromoForm from '../../PromoForm'

export default async function EditPromoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Edit Promo
      </h1>
      <PromoForm id={id} />
    </div>
  )
}
