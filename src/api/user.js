import axios from 'axios';

const BASE = 'http://localhost:3000/user';

export const getUsers = () => axios.get(BASE);

export const createUser = (data) => axios.post(BASE, data);

export const getUserDetail = (id) => axios.get(`${BASE}/${id}`);

// import { getUsers, createUser } from '@/api/user';
// import { getProducts } from '@/api/product';

// async function loadData() {
//   console.log((await getUsers()).data);
//   console.log((await getProducts()).data);
//   console.log((await createUser({ name: 'Bob', age: 22 })).data);
// }