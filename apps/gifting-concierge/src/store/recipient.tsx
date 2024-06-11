import { create } from "zustand";

export interface Recipient {
	canContinue: boolean;
	setCanContinue: (canContinue: boolean) => void;

	recipientName: string;
	setRecipientName: (recipientName: string) => void;

	recipientSocial: string;
	setRecipientSocial: (recipientSocial: string) => void;

	recipientEmail?: string;
	setRecipientEmail: (recipientEmail: string) => void;

	recipientPhone?: string;
	setRecipientPhone: (recipientPhone: string) => void;
}

export const useRecipientStore = create<Recipient>((set) => ({
	canContinue: false,
	setCanContinue: (canContinue) => set({ canContinue }),

	recipientName: "",
	setRecipientName: (recipientName) => set({ recipientName }),

	recipientSocial: "",
	setRecipientSocial: (recipientSocial) => set({ recipientSocial }),

	recipientEmail: undefined,
	setRecipientEmail: (recipientEmail) => set({ recipientEmail }),

	recipientPhone: undefined,
	setRecipientPhone: (recipientPhone) => set({ recipientPhone }),
}));
