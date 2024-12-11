import React from 'react';
import styles from './PopupComponent.module.scss'; // CSS riêng cho component này

const PopupComponent = ({ message, onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.popupTitle}>Thông Báo</h2>
        <p className={styles.popupMessage}>
          {typeof message === 'string' ? message : 'Đã xảy ra lỗi, vui lòng thử lại.'}
        </p>
        <button onClick={onClose} className={styles.closeButton}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default PopupComponent;
