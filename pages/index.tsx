import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('/api/kai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setReply('Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Kai – Your Self-Care Companion</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Kai 🦊✨</h1>
        <p className="text-lg mb-6 max-w-xl">
          I'm your gentle, emotionally intelligent self-care companion.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 rounded border border-gray-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            {loading ? 'Thinking...' : 'Ask Kai'}
          </button>
        </form>

        {reply && (
          <div className="mt-8 max-w-md bg-gray-100 p-4 rounded text-left">
            <p className="font-medium text-gray-700">Kai says:</p>
            <p className="mt-2 text-gray-900 whitespace-pre-wrap">{reply}</p>
          </div>
        )}
      </main>
    </>
  );
}

{/* Force push test - should trigger Vercel deploy */}
