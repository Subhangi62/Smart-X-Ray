import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { scans } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: "Invalid scan ID" },
        { status: 400 }
      );
    }

    const scanId = parseInt(id);

    // Query database for scan
    const scan = await db.select()
      .from(scans)
      .where(eq(scans.id, scanId))
      .limit(1);

    if (scan.length === 0) {
      return NextResponse.json(
        { error: 'Scan not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(scan[0], { status: 200 });
  } catch (error: any) {
    console.error('GET scan error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const scanId = parseInt(id);

    // Check if scan exists before deleting
    const existingScan = await db.select()
      .from(scans)
      .where(eq(scans.id, scanId))
      .limit(1);

    if (existingScan.length === 0) {
      return NextResponse.json(
        { error: 'Scan not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete scan from database
    const deleted = await db.delete(scans)
      .where(eq(scans.id, scanId))
      .returning();

    return NextResponse.json(
      { 
        message: 'Scan deleted successfully', 
        id: deleted[0].id 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE scan error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}