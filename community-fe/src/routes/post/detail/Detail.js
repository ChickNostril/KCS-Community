import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styles from './Details.module.css'
import Comment from '../../../components/comment/Comment';
import Commentlist from '../../../components/comment/Commentlist';
import ContentModal from '../../../components/modal/ContentModal';
import axios from 'axios';

function Detail() {
  const { id } = useParams();
  const [ post, setPost ] = useState(null);
  const [ modal, setModal ] = useState(false);

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
  const handleCommentAdded = () => {
    // Optionally re-fetch comments here if needed
    window.location.href = `/detail/${id}`;
  };
  if (!post) {
    return <div>Loading...</div>;
  }
  const openEdit = () => {
    window.location.href = `/detail/${id}/edit`;
  }
  const openModal = () => {
    modal === true ? setModal(false) : setModal(true);
  }
  const formatDate = (dateString) => {
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('ja-JP', options).replace(',', '');
  };
  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <div className={styles.title}>
          <h3>{post.title}</h3>
        </div>
        <div className={styles.writer}>
        {post.profile_image && <img className="image" src={`http://localhost:3001${post.profile_image}`} alt="Profile" />}
          <p>
            <strong>{post.nickname}</strong>
          </p>
          <span>{formatDate(post.created)}</span>
          <div className={styles.buttons}>
            <button onClick={()=>{openEdit()}}>수정</button>
            <button onClick={()=>{openModal()}}>삭제</button>
          </div>
        </div>
        <div 
          className={styles.cont}
          style={{whiteSpace: 'pre-line'}}>
          {post.image && <img src={`http://localhost:3001${post.image}`} alt="Post" />}
          <p id="content">
            {post.content}
          </p>
          <div className={styles.info}>
            <div className={styles.views} id="views">
              <p>조회수</p>
              <p>{post.views}</p>
            </div>
            <div className={styles.views} id="comments">
              <p>댓글</p>
              <p>{post.comment_count}</p>
            </div>
          </div>
          {
            modal && <ContentModal />
          }
        </div>
      </section>
      <Comment postId={id} onCommentAdded={handleCommentAdded} />
      <Commentlist postId={id} />
    </div>
  );
}

export default Detail;