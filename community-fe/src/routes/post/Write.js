import React, { useEffect, useState } from 'react'
import styles from './Write.module.css'
import axios from 'axios';
import ImageUpload from '../PostImageUpload';

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/posts', { title, content, image }, { withCredentials: true });
            alert('Post created');
            window.location.href = '/home';
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
    <section className={styles.container}>
        <div className={styles.title}>
            <h3><span>게시글 작성</span></h3>
        </div>
        <form onSubmit={handleSubmit}>
            <p><strong>제목 *</strong></p>
            <input className={styles.contentTitle}
                type="text"
                name="title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요. (최대 26글자)"
            />
            <p><strong>내용 *</strong></p>
            <textarea
                cols="80"
                rows="23"
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요"
            ></textarea>
            <div className={styles.image}>
                <h4><strong>이미지</strong></h4>
            <div className={styles.upload}>
                {/* <ImageUpload handleUpload={handleUpload} /> */}
                <ImageUpload setImage={setImage} />
            </div>
            </div>
            <div className={styles.write}>
                <input type="submit" value="완료"/>
            </div>
        </form>
      </section>
  )
}

export default Write