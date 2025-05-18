// app/api/compress-pdf/route.js
import { NextResponse } from 'next/server';
import { compressPDF } from '@/lib/pdfUtils';

export async function POST(request) {
  console.log('Received request to /api/compress-pdf');
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    console.log('File received:', { name: file?.name, type: file?.type, size: file?.size });

    if (!file || file.type !== 'application/pdf') {
      console.log('Invalid file:', { name: file?.name, type: file?.type });
      return NextResponse.json({ error: 'Please upload a valid PDF file.' }, { status: 400 });
    }

    const compressedFile = await compressPDF(file);
    console.log('Compression completed, blob size:', compressedFile.size);

    if (!(compressedFile instanceof Blob)) {
      console.error('Invalid compression result:', compressedFile);
      throw new Error('Compression did not return a valid Blob.');
    }

    const arrayBuffer = await compressedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="compressed.pdf"',
      },
    });
  } catch (error) {
    console.error('Error in /api/compress-pdf:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: `Error compressing PDF: ${error.message}` },
      { status: 500 }
    );
  }
}