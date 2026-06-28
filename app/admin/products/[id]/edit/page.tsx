import ProductForm from '../../ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Edit Produk
      </h1>
      <ProductForm id={id} />
    </div>
  )
}
