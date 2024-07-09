import React from 'react'
import styles from './Modal.module.css'

function ReplyModal({ show, onClose, onConfirm }) {
    if (!show) {
        return null;
    }

    return (
        <div className='container'>
            <aside className={styles.modalWrapper}>
                <div className={styles.modalContent}>
                    <div className={styles.modalMsg}>
                        <p className={styles.question}>댓글을 삭제하시겠습니까?</p>
                        <p className={styles.notice}>삭제한 내용은 복구할 수 없습니다.</p>
                    </div>
                    <div className={styles.buttons}>
                        <button 
                            className={styles.cancelBtn} 
                            type="button"
                            onClick={onClose}
                        >취소</button>
                        <button 
                            className={styles.confirmBtn} 
                            type="button"
                            onClick={onConfirm}
                        >확인</button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default ReplyModal