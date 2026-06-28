'use client'

import { AlertTriangle } from 'lucide-react'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = 'Hapus',
  cancelText = 'Batal',
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5">
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: danger ? '#FEE2E2' : '#EFF6FF' }}
          >
            <AlertTriangle size={20} style={{ color: danger ? '#EF4444' : '#0A2A8A' }} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ background: danger ? '#EF4444' : '#0A2A8A' }}
          >
            {loading ? 'Memproses...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
