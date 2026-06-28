'use client';
import Link from 'next/link';
import styles from './Header.module.css';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, loading, signInWithGoogle, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.text}>진영쌤의 웹앱 모음</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>모든 앱</Link>
          <Link href="/admin" className={styles.adminBtn}>관리자</Link>
          {!loading && (
            user ? (
              <div className={styles.userMenu}>
                {user.photoURL && <img src={user.photoURL} alt="Profile" className={styles.profileImg} />}
                <span className={styles.userName}>{user.displayName}님</span>
                <button onClick={logout} className={styles.logoutBtn}>로그아웃</button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className={styles.loginBtn}>구글 로그인</button>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
