import React, { useEffect, useState } from 'react'
import styles from './Modal.module.css'
import { useParams } from 'react-router';
import axios from 'axios';

function ContentModal() {
    const { id } = useParams();
    const [ post, setPost ] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/posts/${id}`, { withCredentials: true });
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post', error);
        }
    };
    fetchPost();
  }, [id]);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`, { withCredentials: true });
      alert('Post deleted');
      window.location.href = '/home';
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className='container'>
        <article className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.modalMsg}>
                    <p className={styles.question}>게시글을 삭제하시겠습니까?</p>
                    <p className={styles.notice}>삭제한 내용은 복구할 수 없습니다.</p>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancelBtn} type="button">취소</button>
                    <button 
                        className={styles.confirmBtn} 
                        type="button"
                        onClick={handleDelete}
                    >확인</button>
                </div>
            </div>
        </article>
    </div>
  )
}

export default ContentModal