import useSWR from "swr";
import { getFetcher } from "../utils/fetcher";
import { RoomPreviewInfo } from "../utils/types";

// // Room Add
// interface RoomAddArgs {
//     user: string;
//     roomName: string;
// }
// interface RoomAddRes {
//     roomId: string;
// }
// export const useRoomAdd = (token: RoomAddArgs) => useSWR<RoomAddRes>(['/api/room/add', token], ([url, token]) => postFetcher(url, token));

// Room List
interface RoomListRes {
    rooms: RoomPreviewInfo[];
}
export const useRoomList = () => useSWR<RoomListRes>('/api/room/list', getFetcher);

export default { useRoomList };