import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.text}>진영쌤의 웹앱 모음</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>모든 앱</Link>
          <Link href="/admin" className={styles.adminBtn}>관리자</Link>
        </nav>
      </div>
    </header>
  );
}
