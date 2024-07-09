import React, { useEffect, useState } from 'react'
import styles from './UserEdit.module.css'
import axios from 'axios';
import ProfileImageUpload from '../ProfileImageUpload';

function UserEdit() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [profile_image, setProfile_image] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user', { withCredentials: true });
        const user = response.data;
        setEmail(user.email);
        setNickname(user.nickname);
        setProfile_image(user.profile_image);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };
    fetchUser();
  }, []);
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/user`, { email, nickname, profile_image }, { withCredentials: true });
      alert('User Info updated');
      window.location.href = `/home`;
    } catch (error) {
      console.error('Error updating User Info', error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete your account?');
      if (confirmDelete) {
        await axios.delete('http://localhost:3001/user', { withCredentials: true });
        alert('User account deleted');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error deleting user account', error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.edit}>
        <h2>회원정보수정</h2>
        <form onSubmit={handleUpdateSubmit}>
          <div className={styles.profile}>
            <p>프로필 사진 *</p>
            {profile_image && <img src={`http://localhost:3001${profile_image}`} alt="Profile" />}
            <ProfileImageUpload setProfile_image={setProfile_image} />
          </div>
          <p>이메일</p>
          <p>{email}</p>
          <p>닉네임</p>
          <input 
            type="text" 
            placeholder="nickname"
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)}/>
          <input
            type="submit"
            value="수정하기"
          />
          <a 
            href="/"
            onClick={handleDeleteUser}>회원 탈퇴</a>
        </form>
        <input
          type="submit"
          value="수정완료"
        />
    </div>
    </section>
  )
}

export default UserEdit