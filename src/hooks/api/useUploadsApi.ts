import axios from '@/lib/axios';

import { useAuth } from '@clerk/nextjs';

import usePagination, { Pagination } from './usePagination';
import { Media } from './models';

type Filter = 'certificate-background' | 'other';

function useUploadsApi() {
  const { getToken } = useAuth();
  const { getPagination } = usePagination();

  const getUploads = async (filter?: Filter, pagination?: Pagination) => {
    const token = await getToken();
    const formattedPagination = getPagination(pagination);
    const response = await axios.get<{ total: number; medias: Media[] }>(`/uploads?filter=${filter ?? 'other'}&${formattedPagination}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const getUploadById = async (id: string) => {
    const token = await getToken();
    const response = await axios.get(`/uploads/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const createUpload = async (data: any) => {
    const token = await getToken();
    const response = await axios.post('/uploads', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const editUpload = async (id: string, data: any) => {
    const token = await getToken();
    const response = await axios.patch(`/uploads/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const deleteUpload = async (id: string) => {
    const token = await getToken();
    const response = await axios.delete(`/uploads/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  return { getUploads, getUploadById, createUpload, editUpload, deleteUpload };
}

export default useUploadsApi;
