import React from 'react'
import styles from './Modal.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Modal() {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
            alert('Logged out');
            // 추가적으로 필요한 로그아웃 후의 작업을 수행합니다.
        } catch (error) {
            console.error('Error logging out', error);
        }
    };
    return (
        <aside className={styles.dropdown}>
            <div className={styles.buttons}>
                <div className={styles.btn}>
                    <Link to={'/useredit'}>회원정보수정</Link>
                </div>
                <div className={styles.btn}>
                    <Link to={'/passwordedit'}>비밀번호수정</Link>
                </div>
                <div className={styles.btn}>
                    <Link onClick={handleLogout} to={'/'}>로그아웃</Link>
                </div>
            </div>
        </aside>
    )
}
 
export default Modal