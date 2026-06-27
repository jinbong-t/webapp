'use client';
import { useState } from 'react';
import styles from './admin.module.css';
import { storage } from '@/lib/firebase';
import { getDownloadURL } from 'firebase/storage';

const CATEGORIES = ['수업', '학급운영', '업무', '기타'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [authError, setAuthError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    url: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: adminCode })
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setAuthError('관리자 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      setAuthError('인증 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const appData = { ...formData, thumbnailUrl: '' };
      const res = await fetch('/api/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appData)
      });

        setSubmitMessage('앱이 성공적으로 등록되었습니다!');
        setFormData({ title: '', category: CATEGORIES[0], url: '', description: '' });
      } else {
        throw new Error('데이터 저장 실패');
      }
    } catch (error: any) {
      setSubmitMessage(error.message || '오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={`glass ${styles.authBox}`}>
          <h2>관리자 인증</h2>
          <form onSubmit={handleAuth} className={styles.form}>
            <input 
              type="password" 
              placeholder="관리자 코드를 입력하세요" 
              className={styles.input}
              value={adminCode}
              onChange={e => setAdminCode(e.target.value)}
              required
            />
            {authError && <p className={styles.error}>{authError}</p>}
            <button type="submit" className="btn-primary">인증하기</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`glass ${styles.adminBox}`}>
        <h2>새로운 앱 등록</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>앱 제목 *</label>
            <input 
              type="text" 
              className={styles.input}
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className={styles.field}>
            <label>카테고리 *</label>
            <select 
              className={styles.input}
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label>앱 링크 (URL) *</label>
            <input 
              type="url" 
              className={styles.input}
              placeholder="https://"
              value={formData.url}
              onChange={e => setFormData({...formData, url: e.target.value})}
              required
            />
          </div>

          <div className={styles.field}>
            <label>짧은 설명</label>
            <textarea 
              className={styles.input}
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {submitMessage && (
            <p className={submitMessage.includes('성공') ? styles.success : styles.error}>
              {submitMessage}
            </p>
          )}

          <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '앱 등록하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
