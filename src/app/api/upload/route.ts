import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `uploads/${fileName}`);
    
    await uploadBytes(storageRef, buffer, { contentType: file.type });
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ url: downloadURL }, { status: 201 });
  } catch (error) {
    console.error('Firebase Storage Error:', error);
    return NextResponse.json({ error: 'Upload to Firebase failed' }, { status: 500 });
  }
}
