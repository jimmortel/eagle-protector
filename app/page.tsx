'use client';
import { useState, useEffect } from 'react';

const TALON_ADDRESS = "0x0c6417054f8b303ddb821b1349124d656ea4be13";
const RECIPIENT = "0x872bD846596Cc1aEde8Fd800997d242e3473fA83";
const PRICE = "10";
const BUY_URL = `https://app.uniswap.org/swap?outputCurrency=${TALON_ADDRESS}&chain=base`;

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [txHash, setTxHash] = useState('');
  const [ethersLib, setEthersLib] = useState<any>(null);

  useEffect(() => {
    import('ethers').then((lib) => setEthersLib(lib));
  }, []);

  const handlePayment = async () => {
    if (!ethersLib) return;
    try {
      setStatus("Validation en cours...");
      const provider = new ethersLib.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethersLib.Contract(TALON_ADDRESS, ["function transfer(address to, uint256 amount) returns (bool)"], signer);
      const tx = await contract.transfer(RECIPIENT, ethersLib.parseUnits(PRICE, 18));
      setTxHash(tx.hash);
      await tx.wait();
      setStatus("Paiement validé !");
    } catch (err: any) {
      setStatus("Transaction annulée.");
    }
  };

  return (
    <main style={{ background: '#050505', color: '#ffffff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Eagle Protector</h1>
      <input 
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ background: '#1a1a1a', border: '1px solid #333', padding: '12px', width: '100%', maxWidth: '350px', borderRadius: '12px', color: 'white', marginBottom: '10px' }}
      />
      <button 
        onClick={handlePayment}
        style={{ background: '#5f55ee', color: 'white', padding: '12px', width: '100%', maxWidth: '350px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer' }}
      >
        Payer {PRICE} TALON & Scanner
      </button>
      <a href={BUY_URL} target="_blank" style={{ marginTop: '15px', color: '#888', fontSize: '13px', textDecoration: 'underline' }}>
        Besoin de TALON ? Acheter ici
      </a>
      {txHash && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#111', borderRadius: '12px', width: '100%', maxWidth: '350px' }}>
          <p style={{ fontSize: '12px', color: '#aaa' }}>{status}</p>
          <a href={`https://basescan.org/tx/${txHash}`} target="_blank" style={{ color: '#5f55ee', fontSize: '12px' }}>Vérifier sur Basescan</a>
        </div>
      )}
    </main>
  );
}
