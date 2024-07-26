import axios, { AxiosRequestConfig } from "axios";
import { Response, RoomPreviewInfo } from "../utils/types";
import useSWR, { useSWRConfig } from "swr";

axios.defaults.baseURL = 'https://chatroom.zjuxlab.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const apiList = {
    roomList: {
        url: '/api/room/list',
        method: 'GET',
    },
    roomAdd: {
        url: '/api/room/add',
        method: 'POST',
    },
};
type ApiKey = keyof typeof apiList;

async function fetcher<T = unknown>(key: ApiKey, args: AxiosRequestConfig = {}) {
    const { data: res } = await axios.request<Response<T>>({ ...apiList[key], ...args });
    const { code, message, data } = res;
    if (code !== 0) {
        throw new Error(`${code}: ${message}`);
    }
    return data;
}

// Room List
interface RoomListRes {
    rooms: RoomPreviewInfo[];
}
function useRoomList() {
    return useSWR<RoomListRes, any, ApiKey>('roomList', fetcher);
}

// Room Add
interface RoomAddArgs {
    user: string;
    roomName: string;
}
interface RoomAddRes {
    roomId: string;
}
function useRoomAdd() {
    const { mutate } = useSWRConfig();
    return async (args: RoomAddArgs) => {
        const res = await fetcher<RoomAddRes>('roomAdd', { data: args });
        mutate('roomList');
        return res;
    }
}

export default { useRoomList, useRoomAdd };