import sharp from 'sharp';
import heicConvert from 'heic-convert';
import Tesseract from 'tesseract.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function compressJPG(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = await sharp(arrayBuffer)
    .jpeg({ quality: 60 })
    .toBuffer();
  return new Blob([buffer], { type: 'image/jpeg' });
}

export async function convertBitmapToJPG(file) {
  try {
    console.log('Starting convertBitmapToJPG for file:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    console.log('Loaded arrayBuffer, size:', arrayBuffer.byteLength);

    if (arrayBuffer.byteLength === 0) {
      throw new Error('File is empty.');
    }

    const buffer = await sharp(arrayBuffer)
      .jpeg({ quality: 80 })
      .toBuffer();
    console.log('convertBitmapToJPG completed, output size:', buffer.length);
    return new Blob([buffer], { type: 'image/jpeg' });
  } catch (error) {
    console.error('Error in convertBitmapToJPG:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Failed to convert BMP to JPG: ' + error.message);
  }
}

export async function convertHEICToJPG(file) {
  try {
    console.log('Starting convertHEICToJPG for file:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    console.log('Loaded arrayBuffer, size:', arrayBuffer.byteLength);

    if (arrayBuffer.byteLength === 0) {
      throw new Error('File is empty.');
    }

    const buffer = Buffer.from(arrayBuffer);
    const outputBuffer = await heicConvert({
      buffer: buffer,
      format: 'JPEG',
      quality: 0.8, // 80% quality
    });
    console.log('convertHEICToJPG completed, output size:', outputBuffer.length);
    return new Blob([outputBuffer], { type: 'image/jpeg' });
  } catch (error) {
    console.error('Error in convertHEICToJPG:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Failed to convert HEIC to JPG: ' + error.message);
  }
}


export async function performOCR(buffer) {
  try {
    console.log('Starting performOCR');

    // Try Node.js worker first
    const workerPath = path.resolve(__dirname, '../node_modules/tesseract.js/src/worker/node/index.js');
    console.log('Worker path:', workerPath);

    try {
      const worker = await Tesseract.createWorker('eng', 1, {
        workerPath,
        corePath: '/tesseract/tesseract-core.wasm.js',
        langPath: '/tesseract/lang-data',
        logger: (m) => console.log('Tesseract progress:', m),
      });

      try {
        const {
          data: { text },
        } = await worker.recognize(buffer);
        console.log('OCR text extracted:', text.substring(0, 100));
        return text;
      } finally {
        await worker.terminate();
      }
    } catch (workerError) {
      console.warn('Node.js worker failed, falling back to workerless mode:', workerError.message);

      // Fallback to workerless mode
      const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
        logger: (m) => console.log('Tesseract progress:', m),
        workerPath: null, // Disable worker
      });
      console.log('OCR text extracted (workerless):', text.substring(0, 100));
      return text;
    }
  } catch (error) {
    console.error('Error in performOCR:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Failed to perform OCR: ' + error.message);
  }
}