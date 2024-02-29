import axios from 'axios';

export const getProducts = async () =>
  (await axios.get('http://localhost:3001/products')).data;

export const getPromocodes = async () =>
  (await axios.get('http://localhost:3001/promocodes')).data;
