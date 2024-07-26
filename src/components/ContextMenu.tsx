import { useEffect, useRef } from "react";

export interface ContextMenuProps {
    onBlur?: () => void,
    show: boolean,
    position: { x: number; y: number },
    items: { label: string; onClick: () => void }[]
}

export default function ContextMenu({ position, items, show, onBlur }: ContextMenuProps) {
    const ref = useRef<HTMLUListElement>(null);
    useEffect(() => {
        if (show) {
            ref.current?.focus();
        }
    }, [show]);
    return (<ul ref={ref}
        tabIndex={0}
        className='fixed menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow focus:outline-none'
        onBlur={onBlur}
        style={{
            top: position.y,
            left: position.x,
            display: show ? 'block' : 'none'
        }} >{
            items.map((item, index) => (
                <li key={index} onClick={item.onClick}><a>{item.label}</a></li>
            ))
        }</ul>);
}