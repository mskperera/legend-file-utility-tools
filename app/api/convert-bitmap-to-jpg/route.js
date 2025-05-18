// app/api/convert-bitmap-to-jpg/route.js
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
  console.log('Received request to /api/convert-bitmap-to-jpg');
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    console.log('File received:', { name: file?.name, type: file?.type, size: file?.size });

    if (!file || file.type !== 'image/bmp') {
      console.log('Invalid file:', { name: file?.name, type: file?.type });
      return NextResponse.json({ error: 'Please upload a valid BMP file.' }, { status: 400 });
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

    const buffer = await sharp(arrayBuffer)
      .jpeg({ quality: 80 })
      .toBuffer();
    console.log('Conversion completed, output size:', buffer.length);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="converted.jpg"',
      },
    });
  } catch (error) {
    console.error('Error in /api/convert-bitmap-to-jpg:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: `Error converting BMP to JPG: ${error.message}` },
      { status: 500 }
    );
  }
}