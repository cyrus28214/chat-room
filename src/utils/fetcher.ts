import axios, { AxiosRequestConfig } from 'axios';
import { Response } from './types';

const prefix = 'https://chatroom.zjuxlab.com';
axios.defaults.baseURL = prefix;

export async function fetcher<T>(config: AxiosRequestConfig) {
    const { message, code, data } = (await axios<Response<T>>(config)).data;
    if (code !== 0) {
        throw new Error(`${message} ${code}`);
    }
    return data;
}

export async function getFetcher<T>(key: string) {
    return fetcher<T>({
        url: key,
        method: 'GET',
    });
}

export async function postFetcher<T, U>(key: string, data: U) {
    return fetcher<T>({
        url: key,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data,
    });
}