import axios from 'axios';

const BASE = 'http://localhost:3000/api'

export const useDeepSeek = (data) => axios.post(BASE,data);
export const useOllama = (data) => axios.post(BASE,data);
