// components/ui/ImageUploader.js
"use client"

import { useState } from "react"

export default function ImageUploader({ onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    setUploading(false)

    if (res.ok) {
      onUploaded(data.url)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="mb-3"
      />

      {preview && (
        <img
          src={preview}
          className="w-full max-w-xs rounded-lg shadow border"
        />
      )}

      {uploading && (
        <p className="text-sm text-blue-600 mt-2">Uploading…</p>
      )}
    </div>
  )
}
