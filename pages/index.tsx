import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReply('');
    setError('');

    try {
      const res = await fetch('/api/kai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setReply(data.reply);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Welcome to Kai 🐱✨</h1>
      <p style={styles.subtext}>
        I'm your gentle, emotionally intelligent self-care companion.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How are you feeling?"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Ask Kai
        </button>
      </form>

      {loading && <p style={styles.thinking}>🤔 Thinking…</p>}
      {reply && (
        <div style={styles.replyBox}>
          <strong>Kai says:</strong>
          <p style={{ marginTop: '0.5rem' }}>{reply}</p>
        </div>
      )}
      {error && <p style={styles.error}>Error: {error}</p>}
    </main>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtext: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    width: '60%',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ffcc66',
    cursor: 'pointer',
  },
  thinking: {
    fontStyle: 'italic',
    color: '#888',
  },
  replyBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'left' as const,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};
