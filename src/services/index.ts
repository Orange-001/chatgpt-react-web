import axios, { type HttpStatusCode } from 'axios';
import { message } from 'antd';

const { REACT_APP_BASE_URL, REACT_APP_OPENAI_KEY } = process.env;

const request = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${REACT_APP_OPENAI_KEY}`
  }
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    message.error(err.message);
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const status: HttpStatusCode | undefined = err.response?.status;
    const msg: string = err.response?.data?.error.message ?? err.message;
    switch (status) {
      case 401:
        message.error(msg);
        break;
      default:
        message.error(msg);
    }
    return Promise.reject(err);
  }
);

export default request;
