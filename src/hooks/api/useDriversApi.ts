import axios from '@/lib/axios';

import { useAuth } from '@clerk/nextjs';

function useDriversApi() {
  const { getToken } = useAuth();

  const getDriver = async () => {
    const token = await getToken();
    const response = await axios.get(`/drivers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const createDriver = async (data: any) => {
    const token = await getToken();
    const response = await axios.post('/drivers', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const createDriverVehicle = async (data: any) => {
    const token = await getToken();
    const response = await axios.post('/drivers/vehicles', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const createDriverBankAccount = async (data: any) => {
    const token = await getToken();
    const response = await axios.post('/drivers/bank-accounts', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const createDriverBusiness = async (data: any) => {
    const token = await getToken();
    const response = await axios.post('/drivers/businesses', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const createDriverDocuments = async (data: any[]) => {
    const token = await getToken();
    const response = await axios.post('/drivers/documents', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const editDriver = async (data: any) => {
    const token = await getToken();
    const response = await axios.patch(`/drivers`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const editDriverVehicle = async (data: any) => {
    const token = await getToken();
    const response = await axios.patch(`/drivers/vehicles`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const editDriverAvailability = async (data: any) => {
    const token = await getToken();
    const response = await axios.patch(`/drivers/operating-hours`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const editDriverBankAccount = async (data: any) => {
    const token = await getToken();
    const response = await axios.patch(`/drivers/bank-accounts`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const editDriverBusiness = async (data: any) => {
    const token = await getToken();
    const response = await axios.patch(`/drivers/businesses`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const editDriverDocuments = async (data: any[]) => {
    const token = await getToken();
    const response = await axios.patch(`/drivers/documents`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const deleteDriver = async (id: string) => {
    const token = await getToken();
    const response = await axios.delete(`/drivers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  return {
    getDriver,
    createDriver,
    createDriverVehicle,
    createDriverBankAccount,
    createDriverBusiness,
    createDriverDocuments,
    editDriver,
    editDriverVehicle,
    editDriverAvailability,
    editDriverBankAccount,
    editDriverBusiness,
    editDriverDocuments,
    deleteDriver
  };
}

export default useDriversApi;
