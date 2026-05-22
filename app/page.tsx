'use client';
import { useState, useEffect } from 'react';

// Configuration
const TALON_ADDRESS = "0x0c6417054f8b303ddb821b1349124d656ea4be13";
const RECIPIENT = "0x872bD846596Cc1aEde8Fd800997d242e3473fA83";
const PRICE = "10";

// ABI minimal pour le transfert ERC20
const ERC20_ABI = ["function transfer(address to, uint256 amount) returns (bool)"];

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [ethers, setEthers] = useState<any>(null);

  // Charger ethers côté client uniquement
  useEffect(() => {
    import('ethers').then((lib) => setEthers(lib));
  }, []);

  const handlePayment = async () => {
    if (!ethers) return;
    if (!(window as any).ethereum) return alert("Veuillez installer MetaMask ou Coinbase Wallet");

    try {
      setStatus("Paiement en cours...");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(TALON_ADDRESS, ERC20_ABI, signer);

      // Envoi de 10 TALON (avec 18 décimales)
      const amount = ethers.parseUnits(PRICE, 18);
      const tx = await contract.transfer(RECIPIENT, amount);
      
      setStatus("Transaction envoyée, attente de confirmation...");
      await tx.wait(); // Attend que la blockchain valide le transfert
      
      setStatus("Paiement confirmé ! Analyse de l'URL...");
      // Ici, tu peux ajouter ton appel API de scan
      console.log("Scan lancé pour :", url);
      
    } catch (err: any) {
      console.error(err);
      setStatus("Erreur : " + (err.reason || "Transaction échouée"));
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Eagle Protector</h1>
      
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="url"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button 
          onClick={handlePayment}
          disabled={!ethers}
          style={{ 
            padding: '10px 20px', 
            background: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Payer {PRICE} TALON & Scanner
        </button>
      </div>

      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
    </main>
  );
}
