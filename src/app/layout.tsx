import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: '진영쌤이 만든 웹앱모음',
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
        <Header />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', minHeight: 'calc(100vh - 160px)' }}>
          {children}
        </main>
        <footer style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.3)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <p>© 2026 우신중학교. All rights reserved. By Lee JinYoung</p>
          <p style={{ marginTop: '8px' }}><a href="/privacy" style={{ textDecoration: 'underline' }}>개인정보처리방침</a></p>
        </footer>
      </body>
    </html>
  );
}
