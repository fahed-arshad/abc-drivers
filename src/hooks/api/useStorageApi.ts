import axios from '@/lib/axios';

import { useAuth } from '@clerk/nextjs';

import { JWT_TEMPLATE } from './constants/api';

function useStorageApi() {
  const { getToken } = useAuth();

  const uploadFile = async (file: File) => {
    const token = await getToken({ template: JWT_TEMPLATE });
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('/storage/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  return { uploadFile };
}

export default useStorageApi;
