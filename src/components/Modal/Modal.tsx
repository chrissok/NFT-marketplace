"use client";

import { ReactNode, useEffect, useState } from "react";
import ButtonIcon from "../Buttons/ButtonIcon";
import { IconEnum } from "@/constants/iconEnum";

type ModalProps = {
  isOpen: boolean;
  closeModal: VoidFunction;
  children: ReactNode;
  wrapperStyle?: string;
  disableClose?: boolean;
};

const Modal = ({
  isOpen,
  closeModal,
  children,
  wrapperStyle,
  disableClose = false,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    // Start the closing animation
    setShowModal(false);

    // Set a timeout equal to the animation duration before executing onClose
    // This ensures the animation completes before removing the modal from the DOM
    setTimeout(() => {
      closeModal();
    }, 500); // Match this duration to your animation duration
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-500`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className={`${wrapperStyle} shadow-xl transform relative transition-all duration-500 ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <div className="absolute top-[5%] right-[5%]">
          {!disableClose && (
            <ButtonIcon icon={IconEnum.Cross} onClick={handleClose} />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
