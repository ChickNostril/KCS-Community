import React, { useState } from 'react';
import styles from "./Commentlist.module.css"
import axios from 'axios';

const CommentEdit = ({ commentId, initialContent, onCancel, onCommentUpdated }) => {
    const [content, setContent] = useState(initialContent);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/comments/${commentId}`, { content }, { withCredentials: true });
            onCommentUpdated();
            window.location.reload();
        } catch (error) {
            console.error('Error updating comment', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.info}>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                <div className={styles.buttons}>
                    <button type="submit">수정</button>
                    <button type="button" onClick={onCancel}>삭제</button>
                </div>
            </div>
        </form>
    );
};

export default CommentEdit;
