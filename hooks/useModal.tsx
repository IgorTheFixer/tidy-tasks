import { create } from "zustand";

type ModalType = "deleteTask" | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  taskId: string | null
  onOpen: (type: ModalType, taskId: string) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  taskId: null,
  onOpen: (type, taskId) => set({ isOpen: true, modalType: type, taskId }),
  onClose: () => set({ isOpen: false, taskId: null }),
}));