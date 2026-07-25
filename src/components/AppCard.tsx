import { AppData } from '../types';
import styles from './AppCard.module.css';

export default function AppCard({ app }: { app: AppData }) {
  const handleCopyPrompt = async () => {
    if (app.prompts) {
      try {
        await navigator.clipboard.writeText(app.prompts);
        alert('프롬프트가 클립보드에 복사되었습니다!');
      } catch (err) {
        alert('복사에 실패했습니다.');
      }
    }
  };
  return (
    <div className={`glass glass-hover ${styles.card}`}>
      <div className={styles.imageWrapper}>
        {app.url ? (
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
        <div className={styles.actions}>
          {app.prompts && (
            <button onClick={handleCopyPrompt} className={`btn-secondary ${styles.copyBtn}`}>
              프롬프트 복사
            </button>
          )}
          <a href={app.url} target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.launchBtn}`}>
            앱 실행하기
          </a>
        </div>
      </div>
    </div>
  );
}
