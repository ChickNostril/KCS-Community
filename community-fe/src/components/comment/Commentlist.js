import React, { useEffect, useState } from 'react'
import styles from "./Commentlist.module.css"
import ReplyModal from '../modal/ReplyModal'
import axios from 'axios';
import CommentEdit from './CommentEdit';

function Commentlist({ postId }) {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
        setCommentToDelete(null);
    };

    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [commentToDelete, setCommentToDelete] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/posts/${postId}/comments`, { withCredentials: true });
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments', error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleEditClick = (commentId) => {
        setEditingCommentId(commentId);
    };
    const handleDeleteClick = (commentId) => {
        setCommentToDelete(commentId);
        setShowModal(true);
    };

    const handleCommentUpdated = () => {
        setEditingCommentId(null);
        // Optionally re-fetch comments here if needed
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/comments/${commentToDelete}`, { withCredentials: true });
            setComments(comments.filter(comment => comment.commentId !== commentToDelete));
            setShowModal(false);
            setCommentToDelete(null);
        } catch (error) {
            console.error('Error deleting comment', error);
        }
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
        <div className="comments">
            {comments.map(comment=> {
                return (
                    <div className={styles.cont} key={comment.commentId}>
                        {editingCommentId === comment.commentId ? (
                            <CommentEdit
                            commentId={comment.commentId}
                            initialContent={comment.content}
                            onCancel={handleCancelEdit}
                            onCommentUpdated={handleCommentUpdated}
                        />
                        ) : (
                            <div>
                                <div className={styles.writer}>
                                    <img src={`http://localhost:3001${comment.profile_image}`} alt="Profile" />
                                    <p><strong>{comment.nickname}</strong> | {formatDate(comment.updated)}</p>
                                </div>
                                <div className={styles.info}>
                                    <p style={{whiteSpace: 'pre-line'}}>{comment.content}</p>
                                    <div className={styles.buttons}>
                                        <button 
                                            type="button"
                                            onClick={() => handleEditClick(comment.commentId)}>수정</button>
                                        <button 
                                            type="button" 
                                            onClick={()=> handleDeleteClick(comment.commentId)}>삭제</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> 
                )
            })}
            <ReplyModal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
        </div>
    )
}
  
  export default Commentlist;