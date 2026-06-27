import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

export async function GET() {
  try {
    const appsRef = collection(db, 'apps');
    const q = query(appsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return NextResponse.json(apps);
  } catch (error) {
    console.error('Firebase DB Error:', error);
    return NextResponse.json({ error: 'Failed to read data from Firebase' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newApp = await request.json();
    
    newApp.createdAt = new Date().toISOString();
    newApp.updatedAt = new Date().toISOString();
    newApp.isActive = true;
    
    const appsRef = collection(db, 'apps');
    const docRef = await addDoc(appsRef, newApp);
    
    return NextResponse.json({ ...newApp, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Firebase DB Error:', error);
    return NextResponse.json({ error: 'Failed to save data to Firebase' }, { status: 500 });
  }
}
