import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'apps.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const apps = JSON.parse(fileContents);
    return NextResponse.json(apps);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newApp = await request.json();
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const apps = JSON.parse(fileContents);
    
    newApp.id = 'app-' + Date.now();
    newApp.createdAt = new Date().toISOString();
    newApp.updatedAt = new Date().toISOString();
    newApp.isActive = true;
    
    apps.push(newApp);
    await fs.writeFile(dataFilePath, JSON.stringify(apps, null, 2));
    
    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
