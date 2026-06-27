import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Next.js 15+ param unwrapping
    const id = params.id;
    const updates = await request.json();
    updates.updatedAt = new Date().toISOString();
    
    const docRef = doc(db, 'apps', id);
    await updateDoc(docRef, updates);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Firebase DB Error:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const docRef = doc(db, 'apps', id);
    await deleteDoc(docRef);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Firebase DB Error:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
