import { useState } from 'react';
import PlusIcon from '../assets/icons/solid/plus.svg?react';
import RoomAddModal from './RoomAddModal';
import ThemeToggler from './ThemeToggler';

export default function ToolBar() {
    const [showModal, setShowModal] = useState(false);
    const itemClass = 'menu-item tooltip';
    const btnClass = 'btn btn-sm btn-circle btn-ghost p-1';
    return (<ul className='menu menu-horizontal justify-end space-x-3'>
        <li className={itemClass} data-tip='新建房间'>
            <PlusIcon
                className={`${btnClass} fill-current`}
                onClick={() => setShowModal(true)} />
            <RoomAddModal show={showModal} onClose={() => setShowModal(false)} />
        </li>
        <li className={itemClass} data-tip='切换主题'>
            <ThemeToggler className={btnClass} />
        </li>
    </ul>);
}
