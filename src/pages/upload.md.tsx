import React, { useState } from "react";

export default function UploadPage() {
  const [status, setStatus] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. Baca isi file markdown
      const text = await file.text();

      // 2. Minta user pilih folder shared-docs/ secara manual
      const folderHandle = await (window as any).showDirectoryPicker();

      // 3. Simpan file ke dalam folder yang dipilih
      const fileHandle = await folderHandle.getFileHandle(file.name, {
        create: true,
      });

      const writable = await fileHandle.createWritable();
      await writable.write(text);
      await writable.close();

      setStatus(`✅ ${file.name} uploaded successfully`);
    } catch (err: any) {
      console.error(err);
      setStatus(
        "❌ Gagal upload. Pastikan browser mendukung dan folder dipilih."
      );
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload Markdown File</h2>
      <input type="file" onChange={handleFile} />
      <p>{status}</p>
      <small>
        Setelah memilih file, Anda akan diminta memilih folder tujuan. Pilih
        folder <code>shared-docs</code> Anda.
      </small>
    </div>
  );
}
