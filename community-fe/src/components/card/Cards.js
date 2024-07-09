import styles from "./Cards.module.css"
import { useEffect, useState } from "react";
import axios from 'axios';

function Cards() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/posts', { withCredentials: true });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };
        fetchPosts();
    }, []);
    const handlePostClick = (postId) => {
        window.location.href = `/detail/${postId}`;
    };
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
        <div className='container' >
            {posts.map((posts) => { 
            return (
                <article 
                    className={styles.card} 
                    onClick={() => handlePostClick(posts.postId)}
                    key={posts.postId}
                >
                    <div className={styles.title}>
                        <h3>{posts.title}</h3>
                    </div>
                    <div className={styles.cont}>
                        <div className={styles.info}>
                            <p>
                                좋아요 {posts.likes} 댓글 {posts.comment_count} 조회수 {posts.views}
                            </p>
                        </div>
                        <div className={styles.date}>
                            <p>{formatDate(posts.created)}</p>
                        </div>
                    </div>
                    <div className={styles.writer}>
                        {posts.profile_image && <img className="image" src={`http://localhost:3001${posts.profile_image}`} alt="Profile" />}
                        {/* <img className="image" src={imageUrl} alt="profile"/> */}
                        <p className="writer">{posts.nickname}</p>
                    </div>
                </article>
            );
            })}
        </div>
    );
  }
  
  export default Cards;