import { NextResponse } from 'next/server';

// 임시 고정 비밀번호 (실제 운영시에는 환경변수로 분리하는 것이 좋습니다)
const ADMIN_CODE = process.env.ADMIN_CODE || 'admin1234';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (code === ADMIN_CODE) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
