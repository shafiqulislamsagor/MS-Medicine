import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`,
        formData
      );
      // console.log(data)
      setUploadedImageUrl(data.data.display_url);
      return data.data.display_url;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return { uploadedImageUrl, error, uploadImage };
};

export default useImageUpload;
