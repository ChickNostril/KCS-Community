import React from 'react';
import axios from 'axios';

const PostImageUpload = ({ setImage }) => {
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post('http://localhost:3001/upload/post', formData, { withCredentials: true });
            setImage(response.data.imageUrl);
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };
    return (
        <div>
            <input type="file" onChange={handleImageChange} />
        </div>
    );
};

export default PostImageUpload;
