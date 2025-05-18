// app/api/convert-heic-to-jpg/route.js
import { NextResponse } from 'next/server';
import { convertHEICToJPG } from '@/lib/imageUtils';

export async function POST(request) {
  console.log('Received request to /api/convert-heic-to-jpg');
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    console.log('File received:', { name: file?.name, type: file?.type, size: file?.size });

    if (!file || !['image/heic', 'image/heif'].includes(file.type)) {
      console.log('Invalid file:', { name: file?.name, type: file?.type });
      return NextResponse.json({ error: 'Please upload a valid HEIC file.' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      console.log('File too large:', { size: file.size });
      return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
    }

    const convertedFile = await convertHEICToJPG(file);
    console.log('Conversion completed, blob size:', convertedFile.size);

    if (!(convertedFile instanceof Blob)) {
      console.error('Invalid conversion result:', convertedFile);
      throw new Error('Conversion did not return a valid Blob.');
    }

    const arrayBuffer = await convertedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="converted.jpg"',
      },
    });
  } catch (error) {
    console.error('Error in /api/convert-heic-to-jpg:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: `Error converting HEIC to JPG: ${error.message}` },
      { status: 500 }
    );
  }
}