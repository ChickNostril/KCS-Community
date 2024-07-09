import React, { useEffect, useState } from 'react'
import styles from './Edit.module.css'
import { useParams } from 'react-router';
import axios from 'axios';
import ImageUpload from '../../PostImageUpload';

function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`, { withCredentials: true });
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setImage(post.image);
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };
    fetchPost();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/posts/${id}`, { title, content, image }, { withCredentials: true });
      alert('Post updated');
      window.location.href = `/detail/${id}`;
    } catch (error) {
      console.error('Error updating post', error);
    }
  };
  return (
    <section className={styles.container}>
        <div className={styles.title}>
          <h3>게시글 수정</h3>
        </div>
        <div className="editPlace">
          <form onSubmit={handleSubmit}>
              <p><strong>제목 *</strong></p>
              <input 
                className={styles.contentTitle} 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"/>
              <p><strong>내용 *</strong></p>
              <textarea 
                cols="80" 
                rows="20" 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                placeholder="content"></textarea>
              <div className={styles.image}>
                <h4><strong>이미지</strong></h4>
                <div className={styles.upload}>
                  <ImageUpload setImage={setImage} />
                </div>
              </div>
              <div className={styles.write}>
              <input
                type="submit"
                value="수정하기"
              />
            </div>
          </form>
        </div>
      </section>
  )
}

export default Edit