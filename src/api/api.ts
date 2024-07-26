import axios, { AxiosRequestConfig } from "axios";
import { Message, Response, RoomPreviewInfo } from "../utils/types";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

axios.defaults.baseURL = 'https://chatroom.zjuxlab.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 通过apiList解耦具体的api调用和api的url，这样当api的url发生变化时，只需要修改apiList即可。
// 同时，这样可以自由地修改SWR的缓存策略，不受具体的url限制。
const apiList = {
    roomList: {
        url: '/api/room/list',
        method: 'GET',
    },
    roomAdd: {
        url: '/api/room/add',
        method: 'POST',
    },
    roomDelete: {
        url: '/api/room/delete',
        method: 'POST',
    },
    messageAdd: {
        url: '/api/message/add',
        method: 'POST',
    },
    messageList: {
        url: '/api/room/message/list',
        method: 'GET',
    },
};
// 带来的另一个好处是可以检查key有没有写错
type ApiKey = keyof typeof apiList;

async function fetcher<T = unknown>(key: ApiKey, body?: { arg: AxiosRequestConfig }) {
    const { data: res } = await axios.request<Response<T>>({ ...apiList[key], ...body?.arg });
    const { code, message, data } = res;
    if (code !== 0) {
        throw new Error(`${message}(code: ${code})`);
    }
    return data;
}

// Room List
interface RoomListRes {
    rooms: RoomPreviewInfo[];
}
function useRoomList() {
    return useSWR<RoomListRes, any, ApiKey>('roomList', fetcher, {
        refreshInterval: 1000
    });
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
    const { trigger } = useSWRMutation<RoomAddRes, any, ApiKey,
        { data: RoomAddArgs }
    >('roomAdd', fetcher<RoomAddRes>);
    const { mutate } = useSWRConfig();
    return async (args: RoomAddArgs) => {
        const res = await trigger({ data: args });
        mutate('roomList');
        return res;
    }
}

// Room Delete
interface RoomDeleteArgs {
    user: string;
    roomId: number;
}
function useRoomDelete() {
    const { trigger } = useSWRMutation<null, any, ApiKey,
        { data: RoomDeleteArgs }
    >('roomDelete', fetcher<null>);
    const { mutate } = useSWRConfig();
    return async (args: RoomDeleteArgs) => {
        await trigger({ data: args });
        mutate('roomList');
    }
}

// Message Add
interface MessageAddArgs {
    roomId: number;
    content: string;
    sender: string;
}
function useMessageAdd() {
    const { trigger } = useSWRMutation<null, any, ApiKey,
        { data: MessageAddArgs }
    >('messageAdd', fetcher<null>);
    const { mutate } = useSWRConfig();
    return async (args: MessageAddArgs) => {
        await trigger({ data: args });
        mutate(`messageList_${args.roomId}`);
    }
}

// Message List
interface MessageListArgs {
    roomId: number;
}
interface MessageListRes {
    messages: Message[];
}
function useMessageList(args: MessageListArgs | null) {
    const key = args && `messageList_${args.roomId}`;
    const res = useSWR<MessageListRes>(key,
        () => fetcher<MessageListRes>('messageList', { arg: { params: args } })
    );
    return res;
}

export default { useRoomList, useRoomAdd, useRoomDelete, useMessageAdd, useMessageList };