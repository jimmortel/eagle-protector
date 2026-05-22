'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const scan = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setRes(data);
    } catch (err) {
      setRes({ error: 'Échec de la connexion au serveur' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 flex flex-col gap-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold">Eagle Protector</h1>
      
      <input 
        type="url"
        className="border p-3 rounded w-full"
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      
      <button 
        onClick={scan}
        disabled={loading}
        className="bg-blue-600 text-white p-3 rounded font-bold disabled:bg-gray-400"
      >
        {loading ? 'Analyse en cours...' : 'Analyser'}
      </button>

      {res && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm overflow-auto">
          {res.error ? (
            <p className="text-red-500">Erreur : {res.error}</p>
          ) : (
            <pre>{JSON.stringify(res, null, 2)}</pre>
          )}
        </div>
      )}
    </main>
  );
}
