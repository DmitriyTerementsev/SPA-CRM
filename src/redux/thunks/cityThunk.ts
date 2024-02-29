import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { City } from '../../interfaces/City';

//-------имитируем запрос на получение данных с сервера
export const getCities = createAsyncThunk('city/get', async () => {
  const response = await new Promise<City[]>((res) => {
    setTimeout(() => {
      res([
        {
          id: 'defad517-2fc8-43a4-ae01-aa0ef0d2f264',
          name: 'Сочи',
          address: 'ул. Роз 117, офис 403',
        },
        {
          id: '0af9c6f3-cc21-444c-94ec-2d86e654867d',
          name: 'Пятигорск',
          address: 'ул. Университетская 28',
        },
        {
          id: 'aa858457-43fd-4c42-82a6-8b6cee759fd9',
          name: 'Владикавказ',
          address: 'ул. Весенняя 15Г, офис 317',
        },
        {
          id: 'f197c4cb-0d12-49f7-b758-04cb11c6da07',
          name: 'Волгоград',
          address: 'ул. Академическая 22, офис 313',
        },
        {
          id: 'a483f910-8300-427e-aae8-7abc8e7b3b74',
          name: 'Ростов-на-Дону',
          address: 'пр-т М.Нагибина, 14а, офис 645',
        },
        {
          id: '9cabdf58-ca4c-4276-b81a-8b9dbb9f33f3',
          name: 'Краснодар',
          address: 'ул. Красная 180, офис 112',
        },
      ]);
    }, 500);
  });
  return response;
});

export const fetchCities = createAsyncThunk('city/fetch', async () => {
  const response = await axios.get('https://');
  return response.data;
});
//-------имитируем запрос на добавление города на сервер
export const addCity = createAsyncThunk(
  'city/add',
  async (data: { id: string; name: string; address: string }) => {
    const response = await new Promise<{
      id: string;
      name: string;
      address: string;
    }>((res) => {
      setTimeout(() => {
        res(data);
      }, 500);
    });
    return response;
  }
);

export const deleteCity = createAsyncThunk(
  'city/delete',
  async (id: string) => {
    const response = await new Promise<string>((res) => {
      setTimeout(() => {
        res(id);
      }, 500);
    });
    return response;
  }
);
