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
