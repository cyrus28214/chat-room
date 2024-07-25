import Modal from "./Modal";

interface RoomAddModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function RoomAddModal({ visible, onClose }: RoomAddModalProps) {
    return <Modal title='新建房间' visible={visible} onClose={onClose}>
        <div className='py-4 px-3'>
            <input
                type="text"
                placeholder="用户名"
                className="mt-4 input input-bordered input-primary w-full" />
            <input
                type="text"
                placeholder="房间名称"
                className="mt-4 input input-bordered input-primary w-full" />
        </div>
    </Modal>;
}
