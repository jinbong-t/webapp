import { AppData } from '../types';
import styles from './AppCard.module.css';

export default function AppCard({ app }: { app: AppData }) {
  return (
    <div className={`glass glass-hover ${styles.card}`}>
      <div className={styles.imageWrapper}>
        {app.thumbnailUrl ? (
          <img src={app.thumbnailUrl} alt={app.title} className={styles.image} />
        ) : app.url ? (
          <div className={styles.iframeContainer}>
            <iframe src={app.url} className={styles.iframe} tabIndex={-1} aria-hidden="true" scrolling="no" title={`${app.title} 미리보기`} />
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span>{app.title.charAt(0)}</span>
          </div>
        )}
        <div className={styles.badge}>{app.category}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{app.title}</h3>
        {app.description && <p className={styles.desc}>{app.description}</p>}
        <a href={app.url} target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.launchBtn}`}>
          앱 실행하기
        </a>
      </div>
    </div>
  );
}
