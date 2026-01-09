import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { scans } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const scan = await db.select()
        .from(scans)
        .where(eq(scans.id, parseInt(id)))
        .limit(1);

      if (scan.length === 0) {
        return NextResponse.json({ 
          error: 'Scan not found',
          code: "SCAN_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(scan[0], { status: 200 });
    }

    // List with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const userId = searchParams.get('user_id');

    let query = db.select().from(scans);

    // Build where conditions
    const conditions = [];

    if (userId) {
      conditions.push(eq(scans.userId, userId));
    }

    if (search) {
      conditions.push(
        or(
          like(scans.patientName, `%${search}%`),
          like(scans.prediction, `%${search}%`),
          like(scans.details, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions));
    }

    const results = await query
      .orderBy(desc(scans.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation: Required fields
    const requiredFields = [
      'patientName',
      'scanImageUrl',
      'prediction',
      'confidence',
      'status',
      'details',
      'scoresJson',
      'borderColor',
      'badgeClass',
      'textColor',
      'bgColor',
      'borderHighlight',
      'aiModel',
      'processingTime',
      'imageQuality',
      'dataset',
      'scanDate'
    ];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json({ 
          error: `${field} is required`,
          code: "MISSING_REQUIRED_FIELD" 
        }, { status: 400 });
      }
    }

    // Validate confidence is between 0-100
    if (typeof body.confidence !== 'number' || body.confidence < 0 || body.confidence > 100) {
      return NextResponse.json({ 
        error: "Confidence must be a number between 0 and 100",
        code: "INVALID_CONFIDENCE" 
      }, { status: 400 });
    }

    // Validate status is "success" or "warning"
    if (body.status !== 'success' && body.status !== 'warning') {
      return NextResponse.json({ 
        error: "Status must be 'success' or 'warning'",
        code: "INVALID_STATUS" 
      }, { status: 400 });
    }

    // Validate processingTime is a number
    if (typeof body.processingTime !== 'number') {
      return NextResponse.json({ 
        error: "Processing time must be a number",
        code: "INVALID_PROCESSING_TIME" 
      }, { status: 400 });
    }

    // Validate scoresJson is valid JSON string
    try {
      JSON.parse(body.scoresJson);
    } catch {
      return NextResponse.json({ 
        error: "Scores JSON must be a valid JSON string",
        code: "INVALID_SCORES_JSON" 
      }, { status: 400 });
    }

    // Prepare insert data
    const insertData = {
      userId: body.userId || null,
      patientName: body.patientName.trim(),
      age: body.age || null,
      firstName: body.firstName?.trim() || null,
      lastName: body.lastName?.trim() || null,
      address: body.address?.trim() || null,
      contactNumber: body.contactNumber?.trim() || null,
      patientEmail: body.patientEmail?.trim() || null,
      scanImageUrl: body.scanImageUrl.trim(),
      previousScanImageUrl: body.previousScanImageUrl?.trim() || null,
      previousScanId: body.previousScanId || null,
      prediction: body.prediction.trim(),
      confidence: body.confidence,
      status: body.status,
      details: body.details.trim(),
      scoresJson: body.scoresJson,
      comparisonNote: body.comparisonNote?.trim() || null,
      borderColor: body.borderColor.trim(),
      badgeClass: body.badgeClass.trim(),
      textColor: body.textColor.trim(),
      bgColor: body.bgColor.trim(),
      borderHighlight: body.borderHighlight.trim(),
      aiModel: body.aiModel.trim(),
      processingTime: body.processingTime,
      imageQuality: body.imageQuality.trim(),
      dataset: body.dataset.trim(),
      scanDate: body.scanDate,
      createdAt: new Date().toISOString()
    };

    const newScan = await db.insert(scans)
      .values(insertData)
      .returning();

    return NextResponse.json(newScan[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}