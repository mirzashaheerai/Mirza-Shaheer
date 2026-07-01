import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic'; // Ensures Vercel updates live data on demand

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// 1. THIS CAPTURES USER MESSAGES FROM THE FORM AND SAVES THEM TO THE CLOUD
export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    // Pull current messages from Vercel KV cloud storage, default to empty list if none exist
    const existingMessages: ContactMessage[] = (await kv.get('contactMessages')) || [];
    
    // Unshift puts the newest message cleanly at the very top of your list
    const updatedMessages = [newMessage, ...existingMessages];
    
    // Save the entire updated array back into the Vercel KV cloud vault
    await kv.set('contactMessages', updatedMessages);

    console.log('New Contact Message Stored in Cloud:', newMessage);

    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully!' 
    });

  } catch (error: any) {
    console.error('Contact form server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 2. THIS ALLOWS YOUR ADMIN PANEL TO FETCH THE SECURE CLOUD INBOX
export async function GET() {
  try {
    const messages = await kv.get('contactMessages');
    return NextResponse.json(messages || [], {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Failed to fetch inbox messages from cloud:', error);
    return NextResponse.json([], { status: 200 }); // Graceful fallback
  }
}
