import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Signin.module.css'
import axios from 'axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/signin', { email, password }, { withCredentials: true });
      alert('Login successful');
      window.location.href = '/home';
    } catch (error) {
      alert('Error logging in');
    }
  };
  const navigate = useNavigate();

  return (
    <div className={styles.signin}>
      <section className={styles.container}>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <p>이메일</p>
          <input
            type="text" 
            placeholder="이메일을 입력하세요"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <p>비밀번호</p>
          <input
            type="password" 
            placeholder="비밀번호를 입력하세요"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button 
            type='submit'
            className={styles.login}
          >로그인</button>
        </form>
        <Link to={'/signup'}>회원가입</Link>
      </section>
    </div>
  );
}

export default Signin