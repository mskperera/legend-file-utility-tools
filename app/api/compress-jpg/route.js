// app/api/compress-jpg/route.js
import { NextResponse } from 'next/server';
import { compressJPG } from '@/lib/imageUtils';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || file.type !== 'image/jpeg') {
      return NextResponse.json({ error: 'Please upload a valid JPG file.' }, { status: 400 });
    }

    const compressedFile = await compressJPG(file);
    const arrayBuffer = await compressedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="compressed.jpg"',
      },
    });
  } catch (error) {
    console.error('Error compressing JPG:', error);
    return NextResponse.json({ error: 'Error compressing JPG. Please try again.' }, { status: 500 });
  }
}