// app/api/ocr/route.js
import { NextResponse } from 'next/server';
import { performOCR } from '@/lib/imageUtils';

export async function POST(request) {
  console.log('Received request to /api/ocr');
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    console.log('File received:', { name: file?.name, type: file?.type, size: file?.size });

    if (!file || !file.type.startsWith('image/')) {
      console.log('Invalid file:', { name: file?.name, type: file?.type });
      return NextResponse.json({ error: 'Please upload a valid image file.' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      console.log('File too large:', { size: file.size });
      return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    console.log('Loaded arrayBuffer, size:', arrayBuffer.byteLength);

    if (arrayBuffer.byteLength === 0) {
      console.log('Empty file received');
      return NextResponse.json({ error: 'File is empty.' }, { status: 400 });
    }

    const text = await performOCR(Buffer.from(arrayBuffer));
    console.log('OCR completed, text length:', text.length);

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error in /api/ocr:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    if (error.message.includes('timed out') || error.message.includes('worker')) {
      return NextResponse.json(
        { error: 'OCR processing failed due to timeout or worker issue. Please try again.' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: `Error extracting text: ${error.message}` },
      { status: 500 }
    );
  }
}