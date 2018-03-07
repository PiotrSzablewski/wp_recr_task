import axios from 'axios';
import BASE_URL from './APP_URLs'
const instance = axios.create({
    baseURL:''
});
export default instance;
