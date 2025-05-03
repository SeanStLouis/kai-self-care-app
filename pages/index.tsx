import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReply('');

    try {
      const response = await fetch('/api/kai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setReply(data.reply);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Kai 🐱✨</h1>
      <p>I'm your gentle, emotionally intelligent self-care companion.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}
        >
          {loading ? 'Thinking…' : 'Ask Kai'}
        </button>
      </form>

      {reply && (
        <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
          <strong>Kai says:</strong> {reply}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
