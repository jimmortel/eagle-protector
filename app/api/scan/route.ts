import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL requise' }, { status: 400 });
    }

    // Ici, tu ajouteras ta logique d'analyse (ex: fetch vers API de sécurité)
    const result = {
      url,
      status: 'safe', // Mockup pour le moment
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
