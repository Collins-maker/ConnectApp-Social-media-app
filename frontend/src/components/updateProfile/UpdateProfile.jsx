import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Image } from 'cloudinary-react';
import { AuthContext } from '../context/authContext';

const UpdateUser = ({ user }) => {
  const { currentUser } =useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const cloud_name ="dkifguyks"

  const { first_name, last_name } = currentUser || {};

  
  // Set initial form values based on the user data received as props
  React.useEffect(() => {
    if (currentUser) {
      setValue('first_name', currentUser?.first_name || '');
      setValue('last_name', currentUser?.last_name || '');
    }
    // Set other form values based on the currentUser data as needed
  }, [currentUser, setValue]);

  if (!currentUser) {
    return <div>You must be logged in to update your profile.</div>;
  }

  const onSubmit = async (data) => {
    try {
      // Send the updated user data to the server
      const response = await axios.put(`/api/users/${user.user_id}`, data);
      console.log('User updated:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle file upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'qvarpolu'); // Replace with your Cloudinary preset name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      setValue('profile_image', imageUrl);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register('first_name')} />

      <label>Last Name</label>
      <input {...register('last_name')} />

      {/* Other form fields can be added for other user data to update */}
      {/* For example: gender, email, country, etc. */}

      <label>Profile Picture</label>
      <input type="file" onChange={handleImageUpload} />

      {/* Show the current profile image if available */}
      {user?.profile_image ?(
        <Image
          cloudName="your_cloud_name"
          publicId={user.profile_image}
          width="150"
          height="150"
          crop="fill"
        />
      ) : (
        <div>
          {/* You can add a placeholder image or any other UI element here */}
          <img src="/path/to/placeholder-image.jpg" alt="Profile Placeholder" />
        </div>
      )}

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateUser;
