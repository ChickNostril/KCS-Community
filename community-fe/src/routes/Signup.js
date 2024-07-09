import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Signup.module.css'
import axios from "axios";
import ProfileImageUpload from './ProfileImageUpload';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profile_image, setProfile_image] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/signup', { email, password, nickname, profile_image }, { withCredentials: true });
      alert('User registered');
      navigate('/');
    } catch (error) {
      alert('Error registering user');
      navigate('/');
    }
  };

  return (
      <section className={styles.container}>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.profile}>
            <p>프로필 사진</p>
            <img src={`http://localhost:3001${profile_image}`} alt="Profile" />
            <ProfileImageUpload setProfile_image={setProfile_image}/>
          </div>
          <p>이메일 *</p>
          <input 
            type="text" 
            placeholder="이메일을 입력하세요"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <p>비밀번호 *</p>
          <input
            type="password" 
            placeholder="비밀번호를 입력하세요"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <p>비밀번호 확인 *</p>
          <input
            type="password" 
            placeholder="비밀번호를 한번 더 입력하세요"
            className={styles.input}
          />
          <p>닉네임 *</p>
          <input
            type="text" 
            placeholder="닉네임을 입력하세요"
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)}
            className={styles.input}
          />
          <button 
            type='submit'
            className={styles.login}
          >회원가입</button>
        </form>
        <Link to={'/'}>로그인하러 가기</Link>
      </section>
  );
}

export default Signup