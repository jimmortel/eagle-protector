import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const RPC_URL = "https://mainnet.base.org";
const MY_WALLET = "0x872bD846596Cc1aEde8Fd800997d242e3473fA83";

export async function POST(req: Request) {
  try {
    const { url, txHash } = await req.json();
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // Vérification de la transaction
    const tx = await provider.getTransaction(txHash);
    
    if (!tx || tx.to?.toLowerCase() !== MY_WALLET.toLowerCase()) {
      return NextResponse.json({ error: "Transaction invalide ou destinataire incorrect" }, { status: 400 });
    }

    // Ici tu ajouterais une vérification de la base de données pour le txHash (anti-rejeu)

    // Simulation du résultat du scan
    const isSafe = Math.random() > 0.1; 
    
    return NextResponse.json({ 
      success: true, 
      isSafe,
      txUrl: `https://basescan.org/tx/${txHash}` // Lien pour l'utilisateur
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur de vérification blockchain" }, { status: 500 });
  }
}
