import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
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
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are Kai, a warm and emotionally intelligent self-care companion. Keep replies short and kind.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
    });

    console.log('OpenAI completion result:', completion);

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      console.error('No content in OpenAI response:', completion);
      return res.status(500).json({ message: 'No content in response' });
    }

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Kai API Error:', {
      message: error.message,
      response: error.response?.data,
    });
    return res.status(500).json({
      message: 'Something went wrong with OpenAI API',
      error: error.response?.data || error.message,
    });
  }
}
