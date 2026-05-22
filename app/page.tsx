'use client';
import { useState, useEffect } from 'react';

const TALON_ADDRESS = "0x0c6417054f8b303ddb821b1349124d656ea4be13";
const RECIPIENT = "0x872bD846596Cc1aEde8Fd800997d242e3473fA83";
const PRICE = "10";
const ERC20_ABI = ["function transfer(address to, uint256 amount) returns (bool)"];

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
      setStatus("Veuillez valider la transaction dans votre wallet...");
      const provider = new ethersLib.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethersLib.Contract(TALON_ADDRESS, ERC20_ABI, signer);

      const tx = await contract.transfer(RECIPIENT, ethersLib.parseUnits(PRICE, 18));
      setTxHash(tx.hash);
      setStatus("Transaction envoyée... attente de validation blockchain.");
      
      await tx.wait();
      setStatus("Paiement confirmé ! Analyse en cours...");
      
    } catch (err: any) {
      setStatus("Transaction annulée ou échouée.");
      console.error(err);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h1>Eagle Protector</h1>
      <input 
        type="url"
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <button 
        onClick={handlePayment}
        style={{ padding: '10px', width: '100%', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Payer {PRICE} TALON & Scanner
      </button>

      {txHash && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <p style={{ fontSize: '14px' }}>{status}</p>
          <a href={`https://basescan.org/tx/${txHash}`} target="_blank" style={{ color: '#0070f3' }}>
            Voir ma transaction sur Basescan
          </a>
        </div>
      )}
    </main>
  );
}
