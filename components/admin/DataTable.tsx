import { Fragment, ReactNode } from 'react'

type DataTableProps<T> = {
  headers: string[]
  items: T[]
  keyExtractor: (item: T) => string
  renderRow: (item: T) => ReactNode
  renderCard: (item: T) => ReactNode
  empty?: boolean
  emptyMessage?: string
}

export default function DataTable<T>({
  headers,
  items,
  keyExtractor,
  renderRow,
  renderCard,
  empty = false,
  emptyMessage = 'Belum ada data',
}: DataTableProps<T>) {
  return (
    <Fragment>
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-gray-50">
                  {renderRow(item)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {empty && <div className="py-12 text-center text-sm text-gray-400">{emptyMessage}</div>}
      </div>

      <div className="lg:hidden space-y-3">
        {items.map((item) => (
          <div key={keyExtractor(item)} className="bg-white rounded-xl shadow-sm p-4">
            {renderCard(item)}
          </div>
        ))}
        {empty && (
          <div className="bg-white rounded-xl shadow-sm py-12 text-center text-sm text-gray-400">
            {emptyMessage}
          </div>
        )}
      </div>
    </Fragment>
  )
}
