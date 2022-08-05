import axios from 'axios';
export const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
const responseBody = (response) => response.data;
class HttpClient {
    get(endpoint, query) {
        return Axios.get(endpoint, { params: query }).then(responseBody);
    }
    post(endpoint, body) {
        return Axios.post(endpoint, body).then(responseBody);
    }
    put(endpoint, body) {
        return Axios.put(endpoint, body).then(responseBody);
    }
    delete(endpoint) {
        return Axios.delete(endpoint).then(responseBody);
    }
}
export default new HttpClient();
