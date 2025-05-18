// lib/pdfUtils.js
import { PDFDocument } from 'pdf-lib';

export async function joinPDFs(files) {
  const pdfDoc = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const srcDoc = await PDFDocument.load(arrayBuffer);
    const pages = await pdfDoc.copyPages(srcDoc, srcDoc.getPageIndices());
    pages.forEach((page) => pdfDoc.addPage(page));
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function compressPDF(file) {
  try {
    console.log('Starting compressPDF for file:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    console.log('Loaded arrayBuffer, size:', arrayBuffer.byteLength);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
    console.log('compressPDF completed, output size:', pdfBytes.length);
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error in compressPDF:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Failed to compress PDF: ' + error.message);
  }
}


export async function convertJPGToPDF(file) {
  try {
    console.log('Starting convertJPGToPDF for file:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    console.log('Loaded arrayBuffer, size:', arrayBuffer.byteLength);

    if (arrayBuffer.byteLength === 0) {
      throw new Error('File is empty.');
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const jpgImage = await pdfDoc.embedJpg(arrayBuffer);
    const { width, height } = jpgImage.scale(1);
    page.setSize(width, height);
    page.drawImage(jpgImage, { x: 0, y: 0, width, height });

    const pdfBytes = await pdfDoc.save();
    console.log('convertJPGToPDF completed, output size:', pdfBytes.length);
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error in convertJPGToPDF:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Failed to convert JPG to PDF: ' + error.message);
  }
}