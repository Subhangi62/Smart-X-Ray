import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { scans } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const latestScan = await db.select()
      .from(scans)
      .orderBy(desc(scans.createdAt))
      .limit(1);

    if (latestScan.length === 0) {
      return NextResponse.json({ 
        error: "No scans found",
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    return NextResponse.json(latestScan[0], { status: 200 });
  } catch (error) {
    console.error('GET latest scan error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}