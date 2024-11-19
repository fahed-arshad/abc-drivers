import useDriversApi from './useDriversApi';

function useApi() {
  const driversApi = useDriversApi();

  return {
    drivers: driversApi
  };
}

export default useApi;
