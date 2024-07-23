import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FormStore {
	recipientName: string;
	setRecipientName: (recipientName: string) => void;

	recipientContactWay: "email" | "phone" | "social";
	setRecipientContactWay: (
		recipientContactWay: "email" | "phone" | "social",
	) => void;

	recipientPhoneNumber?: string;
	setRecipientPhoneNumber: (recipientPhoneNumber?: string) => void;

	recipientEmail?: string;
	setRecipientEmail: (recipientEmail?: string) => void;

	recipientSocialPlatform?: string;
	setRecipientSocialPlatform: (recipientSocialPlatform?: string) => void;

	recipientSocialHandle?: string;
	setRecipientSocialHandle: (recipientSocialHandle?: string) => void;
}

export const useFormStore = create(
	persist<FormStore>(
		(set) => ({
			recipientName: "",
			setRecipientName: (recipientName: string) => set({ recipientName }),

			recipientContactWay: "email",
			setRecipientContactWay: (
				recipientContactWay: "email" | "phone" | "social",
			) => set({ recipientContactWay }),

			recipientPhoneNumber: undefined,
			setRecipientPhoneNumber: (recipientPhoneNumber?: string) =>
				set({ recipientPhoneNumber }),

			recipientEmail: undefined,
			setRecipientEmail: (recipientEmail?: string) => set({ recipientEmail }),

			recipientSocialPlatform: undefined,
			setRecipientSocialPlatform: (recipientSocialPlatform?: string) =>
				set({ recipientSocialPlatform }),

			recipientSocialHandle: undefined,
			setRecipientSocialHandle: (recipientSocialHandle?: string) =>
				set({ recipientSocialHandle }),
		}),
		{
			name: "send-custom",
			storage: createJSONStorage(() => sessionStorage),
			version: 2,
		},
	),
);
