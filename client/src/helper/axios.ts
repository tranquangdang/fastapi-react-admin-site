import axios from 'axios';
const Cookies = require('js-cookie');
const url = process.env.REACT_APP_HOST;
let access_token: string;
//Cấu hình authorization cho header khi dùng axios
const axiosConfig = () =>
  axios.interceptors.request.use(
    (config: any) => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [url];
      if (allowedOrigins.includes(origin)) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const getData = (path: string) => {
  access_token = Cookies.get('access_token');
  axiosConfig();
  return axios
    .get(`${url}/${path}`)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      if (error.response.status === 401) {
        return (window.location.href = '/');
      }
      return error;
    });
};

const getDataById = (path: string, id: string) => {
  access_token = Cookies.get('access_token');
  axiosConfig();
  return axios
    .get(`${url}/${path}/${id}`)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        return (window.location.href = '/');
      }
      return error;
    });
};

const createData = (path: string, object: any) => {
  access_token = Cookies.get('access_token');
  axiosConfig();
  return axios
    .post(`${url}/${path}`, object, {
      withCredentials: true,
    })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

const updateData = (path: string, object: any) => {
  access_token = Cookies.get('access_token');
  axiosConfig();
  return axios
    .patch(`${url}/${path}`, object)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

const deleteData = (path: string, id: any) => {
  access_token = Cookies.get('access_token');
  axiosConfig();
  return axios
    .delete(`${url}/${path}/${id}`)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

const exportFunc = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData,
};

export default exportFunc;
