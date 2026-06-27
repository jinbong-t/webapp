'use client';
import { useState } from 'react';
import styles from './EthicsModal.module.css';

export default function EthicsModal({ onAgree }: { onAgree: () => void }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>학교 웹앱 올바른 사용 가이드</h2>
        </div>
        
        <div className={styles.content}>
          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.orange}`}>주도성</div>
              <div className={`${styles.badge} ${styles.green}`}>합목적성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 1. 올바른 활용 목적</h3>
              <p>
                <strong>웹앱을 활용하는 이유와 목적을 바르게 이해해요.</strong><br/>
                제공된 웹앱들은 우리의 학습을 돕기 위한 도구입니다. 선생님이 안내하신 학습 목표를 달성하기 위해, 정해진 규칙과 범위 안에서 올바르게 사용합니다.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.orange}`}>주도성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 2. 주도적인 학습</h3>
              <p>
                <strong>스스로 고민하고 생각하는 힘을 길러요.</strong><br/>
                웹앱이 모든 것을 대신해 주지는 않습니다. 먼저 스스로 문제를 해결하기 위해 고민해 보고, 웹앱을 보조적인 수단으로 활용하여 나의 학습 능력을 키워갑니다.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.orange}`}>주도성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 3. 비판적 사고</h3>
              <p>
                <strong>인터넷상의 정보를 무조건 믿지 않고 비판적으로 바라봐요.</strong><br/>
                웹앱이나 인터넷에서 찾은 정보가 항상 정확한 것은 아닙니다. 교과서나 신뢰할 수 있는 공식 자료를 통해 한 번 더 확인하고 검증하는 습관을 가집니다.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.orange}`}>주도성</div>
              <div className={`${styles.badge} ${styles.green}`}>합목적성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 4. 사고의 확장</h3>
              <p>
                <strong>다양한 자료를 탐색하며 생각의 폭을 넓혀요.</strong><br/>
                단순히 정답을 찾는 데 그치지 않고, "왜 그럴까?", "다른 방법은 없을까?" 고민하며 디지털 도구를 활용해 창의적인 생각과 아이디어를 펼쳐갑니다.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.blue}`}>안전성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 5. 개인정보 보호와 존중</h3>
              <p>
                <strong>나와 타인의 개인정보를 소중히 지키고 예의를 갖춰요.</strong><br/>
                이름, 연락처, 비밀번호 등 중요한 정보는 함부로 입력하지 않습니다. 또한 웹상에서 다른 친구나 선생님을 존중하며, 바르고 고운 디지털 언어를 사용합니다.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.yellow}`}>투명성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 6. 저작권 보호 및 윤리</h3>
              <p>
                <strong>타인의 저작물을 존중하고 출처를 명확히 밝혀요.</strong><br/>
                다른 사람이 만든 글, 사진, 영상 등을 사용할 때는 반드시 허락을 받거나 올바른 출처를 표기합니다. 남의 것을 내가 한 것처럼 속이는 행위는 절대 하지 않습니다.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <label className={styles.checkboxContainer}>
            <input 
              type="checkbox" 
              className={styles.checkbox}
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            이 윤리 핵심 가이드를 빠짐없이 읽고 이를 지키겠습니다.
          </label>
          <button 
            className={styles.submitBtn} 
            disabled={!isChecked}
            onClick={onAgree}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
