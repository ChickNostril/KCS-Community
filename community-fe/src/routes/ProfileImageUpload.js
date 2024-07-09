import React from 'react';
import axios from 'axios';

const ProfileImageUpload = ({ setProfile_image }) => {
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profile_image', file);
        try {
            const response = await axios.post('http://localhost:3001/upload/profile', formData, { withCredentials: true });
            setProfile_image(response.data.imageUrl);
        } catch (error) {
            console.error('Error uploading profile image', error);
        }
    };
    return (
        <div>
            <input type="file" onChange={handleImageChange} />
        </div>
    );
};
export default ProfileImageUpload;
