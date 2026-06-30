import { NextRequest, NextResponse } from 'next/server';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

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

    // Save to localStorage so it appears in Admin Panel
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const updatedMessages = [newMessage, ...existingMessages];
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

    console.log('New Contact Message Received:', newMessage);

    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}