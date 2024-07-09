import React, { useState } from 'react'
import styles from './PasswordEdit.module.css'
import axios from 'axios';

function PasswordEdit() {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.put('http://localhost:3001/user/password', { password }, { withCredentials: true });
          alert('Password updated');
      } catch (error) {
          console.error('Error updating password', error);
      }
  };
  return (
    <section className={styles.container}>
        <h2>비밀번호 수정</h2>
        <form onSubmit={handlePasswordSubmit}>
          <p>비밀번호</p>
          <input
            type="password"
            name="password"
            value={password} 
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
          />
          <p>비밀번호 확인</p>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          <input
            type="submit"
            value="수정하기"
          />
        </form>
      </section>
  )
}

export default PasswordEdit