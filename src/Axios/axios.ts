import axios from 'axios';
export const TIMEOUT = 15000;

const instance = axios.create({
    baseURL: `http://localhost:4000/`,
    // baseURL: `http://127.0.0.1:3333/api/v1`,
    timeout: TIMEOUT
});
instance.interceptors.response.use(response => response, (error) => {
    if (error.response.status == 401) {

        try {

        } catch (e) { }
        finally {

        }
    }
    return error
})
export default instance;
