import axios from '@/lib/axios';

import { useAuth } from '@clerk/nextjs';

import { JWT_TEMPLATE } from './constants/api';

function usePayoutsApi() {
  const { getToken } = useAuth();

  const getAllPayouts = async () => {
    const token = await getToken({ template: JWT_TEMPLATE });
    const response = await axios.get(`/payouts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const getDueAmount = async () => {
    const token = await getToken({ template: JWT_TEMPLATE });
    const response = await axios.get('/payouts/due-amount', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const requestPayout = async () => {
    const token = await getToken({ template: JWT_TEMPLATE });
    const response = await axios.post(
      '/payouts/request',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  };

  return {
    getAllPayouts,
    getDueAmount,
    requestPayout
  };
}

export default usePayoutsApi;
