import _axios from 'axios';

type ENV = 'development' | 'production';

let API_BASE_URL;

const NODE_ENV = process.env.NEXT_PUBLIC_ENV as ENV;

if (NODE_ENV === 'production') {
  API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
  console.log('Starting in Production mode');
} else {
  API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_DEV;
  console.log('Starting in Development mode');
}

const axios = _axios.create({
  baseURL: API_BASE_URL
});

export default axios;
