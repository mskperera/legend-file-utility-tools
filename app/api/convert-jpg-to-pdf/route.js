// app/api/convert-jpg-to-pdf/route.js
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request) {
  console.log('Received request to /api/convert-jpg-to-pdf');
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    console.log('File received:', { name: file?.name, type: file?.type, size: file?.size });

    if (!file || file.type !== 'image/jpeg') {
      console.log('Invalid file:', { name: file?.name, type: file?.type });
      return NextResponse.json({ error: 'Please upload a valid JPG file.' }, { status: 400 });
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

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const jpgImage = await pdfDoc.embedJpg(arrayBuffer);
    const { width, height } = jpgImage.scale(1);
    page.setSize(width, height);
    page.drawImage(jpgImage, { x: 0, y: 0, width, height });

    const pdfBytes = await pdfDoc.save();
    console.log('Conversion completed, output size:', pdfBytes.length);

    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"',
      },
    });
  } catch (error) {
    console.error('Error in /api/convert-jpg-to-pdf:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: `Error converting JPG to PDF: ${error.message}` },
      { status: 500 }
    );
  }
}