import React, { useEffect, useRef } from "react";
import XmarkIcon from "../../assets/icons/solid/xmark.svg?react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    show: boolean;
}

export default function Modal({ children, show, onClose }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        show ? modalRef.current.showModal() : modalRef.current.close();
    }, [show]);

    const onCancel = (event: any) => {
        event.preventDefault();
        onClose();
    }

    return createPortal(
        <dialog ref={modalRef} className="modal" onCancel={onCancel}>
            <div className="modal-box bg-base-200 overflow-hidden break-words">
                <XmarkIcon onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 p-1 fill-current" />
                {children}
            </div>
            {/* 点在黑色处也能关闭 */}
            <div onClick={onClose} className="modal-backdrop" />
        </dialog>, document.body);
}