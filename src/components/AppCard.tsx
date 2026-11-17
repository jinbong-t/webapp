import { AppData, parseUrlInput } from '../types';
import styles from './AppCard.module.css';

export default function AppCard({ app }: { app: AppData }) {
  const parsed = parseUrlInput(app.url);
  const appUrl = parsed.url || app.url;
  const blogUrl = app.blogUrl || parsed.blogUrl;
  const dashboardUrl = app.dashboardUrl || parsed.dashboardUrl;

  const handleMissingLink = (type: string) => {
    alert(`아직 등록된 ${type} 주소가 없습니다. 관리자 페이지에서 추가해주세요!`);
  };

  return (
    <div className={`glass glass-hover ${styles.card}`}>
      <a
        href={appUrl || '#'}
        target={appUrl ? '_blank' : undefined}
        rel={appUrl ? 'noopener noreferrer' : undefined}
        className={styles.imageWrapper}
        title={`${app.title} 바로 실행하기`}
      >
        {appUrl ? (
          <div className={styles.iframeContainer}>
            <iframe
              src={appUrl}
              className={styles.iframe}
              tabIndex={-1}
              aria-hidden="true"
              scrolling="no"
              title={`${app.title} 미리보기`}
            />
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span>{app.title.charAt(0)}</span>
          </div>
        )}
        <div className={styles.previewOverlay}>
          <span className={styles.previewOverlayText}>클릭하여 앱 실행 🚀</span>
        </div>
        <div className={styles.badge}>{app.category}</div>
      </a>
      <div className={styles.content}>
        <h3 className={styles.title}>{app.title}</h3>
        {app.description && <p className={styles.desc}>{app.description}</p>}
        <div className={styles.actions}>
          <a
            href={appUrl || '#'}
            target={appUrl ? '_blank' : undefined}
            rel={appUrl ? 'noopener noreferrer' : undefined}
            className={`btn-primary ${styles.actionBtn} ${styles.launchBtn}`}
          >
            앱 실행
          </a>

          {blogUrl ? (
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary ${styles.actionBtn} ${styles.blogBtn}`}
            >
              블로그
            </a>
          ) : (
            <button
              type="button"
              onClick={() => handleMissingLink('블로그')}
              className={`btn-secondary ${styles.actionBtn} ${styles.blogBtn} ${styles.inactiveBtn}`}
            >
              블로그
            </button>
          )}

          {dashboardUrl ? (
            <a
              href={dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary ${styles.actionBtn} ${styles.dashboardBtn}`}
            >
              대시보드
            </a>
          ) : (
            <button
              type="button"
              onClick={() => handleMissingLink('대시보드')}
              className={`btn-secondary ${styles.actionBtn} ${styles.dashboardBtn} ${styles.inactiveBtn}`}
            >
              대시보드
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
