'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [res, setRes] = useState(null);

  const scan = async () => {
    const r = await fetch('/api/scan', {
      method: 'POST',
      body: JSON.stringify({ url })
    });
    setRes(await r.json());
  };

  return (
    <main className="p-4 flex flex-col gap-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold">Eagle Protector</h1>
      <input 
        className="border p-2 rounded w-full"
        placeholder="Coller l'URL..."
        onChange={(e) => setUrl(e.target.value)}
      />
      <button 
        onClick={scan}
        className="bg-blue-600 text-white p-3 rounded font-bold"
      >
        Analyser
      </button>
      {res && <pre className="bg-gray-100 p-2 text-xs overflow-auto">{JSON.stringify(res, null, 2)}</pre>}
    </main>
  );
}
