import ProductForm from '../ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: '#0A2A8A' }}>
        Tambah Produk
      </h1>
      <ProductForm />
    </div>
  )
}
