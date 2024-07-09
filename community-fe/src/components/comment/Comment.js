import React, { useState } from 'react'
import styles from './Comment.module.css'
import axios from 'axios';

function Comment({ postId, onCommentAdded }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/posts/${postId}/comments`, { content }, { withCredentials: true });
            setContent('');
            onCommentAdded();
        } catch (error) {
            console.error('Error adding comment', error);
        }
    };
    return (
        <section className={styles.replyCard}>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="댓글을 남겨주세요!" />
                <button type="submit" className={styles.post}>댓글 등록</button>
            </form>
        </section>
    )
}

export default Comment