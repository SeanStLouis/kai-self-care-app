import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are Kai, a warm and emotionally intelligent self-care companion.' },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ reply });
    catch (error: any) {
      console.error('Kai API Error:', error?.response?.data || error?.message || error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
    
}
