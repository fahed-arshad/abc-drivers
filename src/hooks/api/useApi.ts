import useDriversApi from './useDriversApi';
import usePayoutsApi from './usePayoutsApi';
import useStorageApi from './useStorageApi';

function useApi() {
  const driversApi = useDriversApi();
  const storageApi = useStorageApi();
  const payoutsApi = usePayoutsApi();

  return {
    drivers: driversApi,
    storage: storageApi,
    payouts: payoutsApi
  };
}

export default useApi;
