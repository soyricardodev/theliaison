import { create } from "zustand";

export interface ConfirmDialogStore {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),
}));
