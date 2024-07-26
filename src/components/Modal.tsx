import React, { useEffect, useRef } from "react";
import XmarkIcon from "../assets/icons/solid/xmark.svg?react";
import { createPortal } from "react-dom";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    visible: boolean;
}

export default function Modal({ title, children, visible, onClose }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        visible ? modalRef.current.showModal() : modalRef.current.close();
    }, [visible]);

    const onCancel = (event: any) => {
        event.preventDefault();
        onClose();
    }

    return createPortal(
        <dialog ref={modalRef} className="modal" onCancel={onCancel}>
            <div className="modal-box bg-base-200">
                <XmarkIcon onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 p-1 fill-current" />
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
            </div>
            {/* 点在黑色处也能关闭 */}
            <div onClick={onClose} className="modal-backdrop" />
        </dialog>, document.body);
}