'use client';
import { useState, useEffect } from 'react';
import { AppData } from '../types';
import AppCard from '../components/AppCard';
import CategoryFilter from '../components/CategoryFilter';
import styles from './page.module.css';

const CATEGORIES = ['식생활', '의생활', '가족', '소비', '주거', '청소년', '학급운영', '업무관련', '기타'];

export default function Home() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/apps')
      .then(res => res.json())
      .then(data => {
        setApps(data);
        setLoading(false);
      });
  }, []);

  const filteredApps = apps.filter(app => {
    const matchCategory = selectedCategory === '전체' || app.category === selectedCategory;
    const matchSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch && app.isActive;
  });

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>진영쌤이 만든 웹앱모음</h1>
        <p className={styles.subtitle}>학교에서 필요한 여러 웹앱을 빠르게 찾고 바로 실행하세요.</p>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="앱 이름 또는 키워드를 검색하세요" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <CategoryFilter 
        categories={CATEGORIES} 
        selected={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      {loading ? (
        <div className={styles.loading}>앱 목록을 불러오는 중...</div>
      ) : filteredApps.length > 0 ? (
        <div className={styles.grid}>
          {filteredApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>검색 결과가 없습니다.</h2>
          <p>다른 키워드로 검색하거나 카테고리를 변경해보세요.</p>
        </div>
      )}
    </div>
  );
}
