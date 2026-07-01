import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic'; // Prevents Vercel from crashing during static generation

export async function GET() {
  try {
    const projects = await kv.get('adminProjects');
    return NextResponse.json(projects || [], {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error("Vercel KV Fetch Error:", error);
    return NextResponse.json([], { status: 200 }); // Returns a safe empty array so the build never crashes
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await kv.set('adminProjects', body);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Vercel KV Save Error:", error);
    return NextResponse.json({ error: "Failed to save cloud assets" }, { status: 500 });
  }
}
