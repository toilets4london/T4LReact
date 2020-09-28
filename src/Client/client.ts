import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {cache} from '../Cache/cacheHandler';

export const client = axios.create({ baseURL: 'https://toilets4london.herokuapp.com/'});

client.interceptors.request.use((request) => requestHandler(request));
client.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error),
);

function responseHandler(response: AxiosResponse<any>): AxiosResponse<any> {
    if (response.config.method === 'GET' || 'get') {
        if (response.config.url) {
            console.log('storing in cache');
            cache.store(response.config.url, JSON.stringify(response.data));
        }
    }
    return response;
}

function errorHandler(error: any) {
    if (error.headers.cached === true) {
        console.log('got cached data in response, serving it directly');
        return Promise.resolve(error);
    }
    return Promise.reject(error);
}

function requestHandler(request: AxiosRequestConfig) {
    if (request.method === 'GET' || 'get') {
        const checkIsValidResponse = cache.isValid(request.url || '');
        if (checkIsValidResponse.isValid) {
            console.log('serving cached data');
            request.headers.cached = true;
            request.data = JSON.parse(checkIsValidResponse.value || '{}');
            return Promise.reject(request);
        }
    }
    return request;
}