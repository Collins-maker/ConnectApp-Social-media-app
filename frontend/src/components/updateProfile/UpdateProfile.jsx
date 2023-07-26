import './updateprofile.css'
import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Image } from 'cloudinary-react';
import { AuthContext } from '../context/authContext';

const UpdateUser = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const cloud_name = "dkifguyks";

  const {
    first_name,
    last_name,
    age,
    bio_data,
    phone_number,
    gender,
    email_address,
    country,
    date_of_birth,
    profile_image,
    cover_image,
  } = currentUser || {};

  // Set initial form values based on the user data received as props
  React.useEffect(() => {
    if (currentUser) {
      setValue('first_name', currentUser?.first_name || '');
      setValue('last_name', currentUser?.last_name || '');
      setValue('age', currentUser?.age || '');
      setValue('bio_data', currentUser?.bio_data || '');
      setValue('phone_number', currentUser?.phone_number || '');
      setValue('gender', currentUser?.gender || '');
      setValue('email_address', currentUser?.email_address || '');
      setValue('country', currentUser?.country || '');
      setValue('date_of_birth', currentUser?.date_of_birth || '');
      setValue('profile_image', currentUser?.profile_image || '');
      setValue('cover_image', currentUser?.cover_image || '');
    }
    // Set other form values based on the currentUser data as needed
  }, [currentUser, setValue]);

  if (!currentUser) {
    return <div>You must be logged in to update your profile.</div>;
  }

  const onSubmit = async (data) => {
    try {
      // Send the updated user data to the server
      const response = await axios.put(`http://localhost:4001/users/${user.user_id}`, data);
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
    <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <h3>Get updated!</h3>
      <label>First Name</label>
      <input {...register('first_name')} />

      <label>Last Name</label>
      <input {...register('last_name')} />

      <label>Age</label>
      <input {...register('age')} />

      <label>Bio Data</label>
      <input {...register('bio_data')} />

      <label>Phone Number</label>
      <input {...register('phone_number')} />

      <label>Gender</label>
      <input {...register('gender')} />

      <label>Email Address</label>
      <input {...register('email_address')} />

      <label>Country</label>
      <input {...register('country')} />

      <label>Date of Birth</label>
      <input type="date" {...register('date_of_birth')} />

      <label>Profile Picture</label>
      <input type="file" onChange={(e) => handleImageUpload('profile_image', e)} />

      <label>Cover Image</label>
      <input type="file" onChange={(e) => handleImageUpload('cover_image', e)} />

      {/* Show the current profile and cover images if available */}
      {profile_image ? (
        <Image
          cloudName="your_cloud_name"
          publicId={profile_image}
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

      {cover_image ? (
        <Image
          cloudName="your_cloud_name"
          publicId={cover_image}
          width="500"
          height="200"
          crop="fill"
        />
      ) : (
        <div>
          {/* You can add a placeholder image or any other UI element here */}
          <img src="/path/to/cover-placeholder-image.jpg" alt="Cover Placeholder" />
        </div>
      )}

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateUser;
