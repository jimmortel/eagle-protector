'use client';
import { useState, useEffect } from 'react';

const TALON_ADDRESS = "0x0c6417054f8b303ddb821b1349124d656ea4be13";
const RECIPIENT = "0x872bD846596Cc1aEde8Fd800997d242e3473fA83";
const ERC20_ABI = ["function transfer(address to, uint256 amount) returns (bool)"];
const PRICE = "10";

export default function Home() {
  const [url, setUrl] = useState('');
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ethers, setEthers] = useState(null);

  // Import dynamique pour éviter l'erreur serveur
  useEffect(() => {
    import('ethers').then((lib) => setEthers(lib));
  }, []);

  const handlePaymentAndScan = async () => {
    if (!url || !ethers) return;
    if (!window.ethereum) return alert("Installez un wallet (MetaMask/Coinbase)");

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(TALON_ADDRESS, ERC20_ABI, signer);

      const amount = ethers.parseUnits(PRICE, 18);
      const tx = await contract.transfer(RECIPIENT, amount);
      await tx.wait(); // Validation on-chain

      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      setRes(await response.json());
    } catch (err) {
      alert("Transaction annulée ou erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 flex flex-col gap-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold">Eagle Protector</h1>
      <input 
        className="border p-3 rounded w-full"
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button 
        onClick={handlePaymentAndScan}
        disabled={loading || !ethers}
        className="bg-blue-600 text-white p-3 rounded font-bold disabled:bg-gray-400"
      >
        {loading ? 'Paiement en cours...' : `Payer ${PRICE} TALON & Scanner`}
      </button>
      {res && <pre className="text-xs bg-gray-100 p-2">{JSON.stringify(res, null, 2)}</pre>}
    </main>
  );
}
