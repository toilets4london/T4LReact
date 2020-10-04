import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {cache} from '../Cache/cacheHandler';

const key: String = "jPUpaH7NC0lANswl8XbwadZvtHSRjWC3";

export const routeMatrixApiClient = axios.create({ baseURL: 'https://open.mapquestapi.com/directions/v2/routematrix?key='+key});

routeMatrixApiClient.interceptors.request.use((request) => requestHandler(request));
routeMatrixApiClient.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error),
);

function responseHandler(response: AxiosResponse<any>): AxiosResponse<any> {
    if (response.config.method === 'POST' || 'post') {
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
    if (request.method === 'POST' || 'post') {
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