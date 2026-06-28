import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: '진영쌤이 만든 웹앱 모음',
  description: '학교에서 필요한 여러 웹앱을 한 곳에 모아 빠르게 실행하세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <Header />
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', minHeight: 'calc(100vh - 160px)' }}>
            {children}
          </main>
        <footer style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.3)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <p>© 2026 우신중학교. All rights reserved. By Lee JinYoung</p>
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="/terms" style={{ textDecoration: 'underline' }}>이용약관</a>
            <a href="/privacy" style={{ textDecoration: 'underline' }}>개인정보처리방침</a>
            <a href="/checklist" style={{ textDecoration: 'underline' }}>필수기준 체크리스트</a>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
