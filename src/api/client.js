import axios from "axios";

const client = axios.create({baseURL: 'https://entertainment-central-backend.vercel.app/api',});

export default client; 

