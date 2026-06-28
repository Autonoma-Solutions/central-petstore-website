import { ReactNode } from 'react'

type DataTableProps = {
  headers: string[]
  children: ReactNode
  empty?: boolean
  emptyMessage?: string
}

export default function DataTable({
  headers,
  children,
  empty = false,
  emptyMessage = 'Belum ada data',
}: DataTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
          <tbody className="divide-y divide-gray-100">{children}</tbody>
        </table>
      </div>
      {empty && (
        <div className="py-12 text-center text-sm text-gray-400">{emptyMessage}</div>
      )}
    </div>
  )
}
