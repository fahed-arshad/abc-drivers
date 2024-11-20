import useDriversApi from './useDriversApi';
import useStorageApi from './useStorageApi';

function useApi() {
  const driversApi = useDriversApi();
  const storageApi = useStorageApi();

  return {
    drivers: driversApi,
    storage: storageApi
  };
}

export default useApi;
