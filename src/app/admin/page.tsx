'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

const CATEGORIES = ['수업', '학급운영', '업무', '기타'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'register' | 'manage'>('register');
  const [apps, setApps] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: CATEGORIES[0],
    url: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const fetchApps = async () => {
    try {
      const res = await fetch('/api/apps');
      const data = await res.json();
      setApps(data);
    } catch (error) {
      console.error('Failed to fetch apps', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'manage') {
      fetchApps();
    }
  }, [isAuthenticated, activeTab]);

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
      const appData = { 
        title: formData.title,
        category: formData.category,
        url: formData.url,
        description: formData.description,
        thumbnailUrl: '' 
      };
      
      let res;
      if (formData.id) {
        res = await fetch(`/api/apps/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appData)
        });
      } else {
        res = await fetch('/api/apps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appData)
        });
      }

      if (res.ok) {
        setSubmitMessage(formData.id ? '앱이 성공적으로 수정되었습니다!' : '앱이 성공적으로 등록되었습니다!');
        setFormData({ id: '', title: '', category: CATEGORIES[0], url: '', description: '' });
      } else {
        throw new Error('데이터 저장 실패');
      }
    } catch (error: any) {
      setSubmitMessage(error.message || '오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (app: any) => {
    setFormData({
      id: app.id,
      title: app.title,
      category: app.category || CATEGORIES[0],
      url: app.url,
      description: app.description || ''
    });
    setActiveTab('register');
    setSubmitMessage('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/apps/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchApps(); // 새로고침
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
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
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('register');
              setFormData({ id: '', title: '', category: CATEGORIES[0], url: '', description: '' });
              setSubmitMessage('');
            }}
          >
            앱 등록하기
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'manage' ? styles.active : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            앱 관리하기
          </button>
        </div>

        {activeTab === 'register' ? (
          <>
            <h2>{formData.id ? '앱 수정하기' : '새로운 앱 등록'}</h2>
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
                {isSubmitting ? '처리 중...' : (formData.id ? '앱 수정 완료' : '앱 등록하기')}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>등록된 앱 관리</h2>
            <div className={styles.appList}>
              {apps.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>등록된 앱이 없습니다.</p>
              ) : (
                apps.map(app => (
                  <div key={app.id} className={styles.appItem}>
                    <div className={styles.appInfo}>
                      <h3>{app.title}</h3>
                      <p>[{app.category}] {app.url}</p>
                    </div>
                    <div className={styles.appActions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(app)}>수정</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(app.id)}>삭제</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
