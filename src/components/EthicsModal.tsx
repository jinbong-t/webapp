'use client';
import { useState } from 'react';
import styles from './EthicsModal.module.css';

export default function EthicsModal({ onAgree }: { onAgree: () => void }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>윤리 핵심가이드</h2>
        </div>
        
        <div className={styles.content}>
          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.orange}`}>주도성</div>
              <div className={`${styles.badge} ${styles.green}`}>합목적성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 1. 활용 목적</h3>
              <p>
                <strong>생성형 AI의 활용 이유와 범위를 스스로 설명할 수 있어야 해요.</strong><br/>
                생성형 AI를 활용하는 이유가 진짜 궁금한 것을 탐구하기 위해 보조 도구로 활용하려는 것인지, 숙제를 빨리 끝내려고 쓰는 것인지 스스로에게 먼저 물어봐요. 선생님이 허락하신 범위에서 내가 정한 학습 목표를 달성하기 위해 생성형 AI를 보조 도구로 활용해요.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.orange}`}>주도성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 2. 주도적 학습</h3>
              <p>
                <strong>생성형 AI를 사용하기 전, 내가 아는 것을 정리하고 질문을 설계해요.</strong><br/>
                생성형 AI를 사용하기 전에 내 생각을 먼저 적어봐요. 내가 모르는 것이 무엇인지 파악한 다음, 이를 배우기 위해 어떤 도움을 받을지 구체적인 질문(프롬프트)을 만들어요.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.orange}`}>주도성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 3. 비판적 검증</h3>
              <p>
                <strong>생성형 AI의 답변 속 오류나 편향된 시각을 직접 찾아보고 비교해요.</strong><br/>
                생성형 AI는 가끔 그럴듯한 거짓말(할루시네이션)을 할 수 있어요. 생성형 AI의 답변을 맹신하지 않고 교과서나 공식 자료를 통해 한 번 더 교차 검증해요. 한쪽으로 치우친 생각은 아닌지 비판적으로 검증하는 습관을 가져요.
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
                <strong>단순한 질문을 넘어 좋은 질문을 설계하며 생각의 범위를 넓혀요.</strong><br/>
                생성형 AI에게 단순히 정답만을 요구하는 것은 바람직하지 않아요. 생성형 AI 답변의 근거와 다른 관점을 고려하여, "왜 그럴까?", "다른 방법은 없을까?"라고 다각도의 심화 질문을 이어가요. 생성형 AI를 토론 파트너처럼 활용하여 나의 생각을 키워가요.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.blue}`}>안전성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 5. 안전과 관계</h3>
              <p>
                <strong>개인정보를 스스로 지키고, 생성형 AI와 정서적 거리를 유지해요.</strong><br/>
                나 또는 타인의 이름, 연락처, 주소, 계정 정보 등을 함부로 생성형 AI에 입력하지 않아요. 이러한 정보가 생성형 AI 학습에 활용될 수 있어요. 속상하거나 힘든 일이 있을 때는 생성형 AI보다 나를 진심으로 이해해 줄 수 있는 가족, 선생님, 친구들과 마음을 나누어요.
              </p>
            </div>
          </div>

          <div className={styles.guideItem}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.badge} ${styles.yellow}`}>투명성</div>
            </div>
            <div className={styles.guideText}>
              <h3>가이드 6. 투명성·윤리</h3>
              <p>
                <strong>생성형 AI를 활용한 부분과 내 생각을 명확하게 구분해서 밝혀요.</strong><br/>
                수업이나 평가 및 과제에서 생성형 AI의 도움을 받았다면, 어떤 도구를 어떤 방식으로 참고하였는지 투명하게 밝혀요. 생성형 AI의 답변을 내가 쓴 것처럼 제출하는 것은 표절(부정행위)임을 명심해요.
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
