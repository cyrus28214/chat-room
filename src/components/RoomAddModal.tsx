import Modal from "./Modal";

interface RoomAddModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function RoomAddModal({ visible, onClose }: RoomAddModalProps) {
    return <Modal title='新建房间' visible={visible} onClose={onClose}>
        <div className='py-7 px-3 space-y-5'>
            <div className='relative'>
                <p className='ms-2 mb-1 text-xs text-error'>用户名不能为空</p>
                <input
                    type="text"
                    placeholder="用户名"
                    className="input input-bordered input-primary w-full" />
            </div>

            <div className='relative'>
                <p className='ms-2 mb-1 text-xs text-error'>房间名称不能为空</p>
                <input
                    type="text"
                    placeholder="房间名称"
                    className="input input-bordered input-primary w-full" />
            </div>
        </div>
        <div className='pt-2 px-3 flex justify-stretch space-x-4'>
            <button className='btn btn-outline btn-primary flex-1' onClick={onClose}>取消</button>
            <button className='btn btn-primary flex-1' onClick={onClose}>创建</button>
        </div>
    </Modal>;
}
