import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    const projects = await kv.get('adminProjects');
    return NextResponse.json(projects || []);
  } catch (error) {
    console.error("Vercel KV Fetch Error:", error);
    return NextResponse.json({ error: "Failed to load cloud assets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await kv.set('adminProjects', body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vercel KV Save Error:", error);
    return NextResponse.json({ error: "Failed to save cloud assets" }, { status: 500 });
  }
}
