import { z } from "zod";

export const sendByLinkSchema = z.object({
	recipientName: z.string().min(1, { message: "Recipient name is required" }),
	recipientEmail: z.string().email({ message: "Invalid email" }).optional(),
	recipientSocial: z.string().optional(),
	recipientSocialHandle: z.string().optional(),
	recipientPhone: z.string().optional(),
	giftLink: z.string().url({ message: "Invalid URL" }),
	giftSpecifications: z
		.string()
		.min(5, { message: "Gift specifications are required" }),
});
