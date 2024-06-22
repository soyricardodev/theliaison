"use client";

import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import { Input } from "@theliaison/ui/input";
import { Label } from "@theliaison/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";
import { z } from "zod";
import { useRecipientStore } from "~/store/recipient";

const recipientSchema = z.object({
	recipient_name: z.string().min(1, "You need to enter a name"),
	knows_address: z.enum(["yes", "no"]),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	postal_code: z.string().optional(),
	country: z.string().optional(),
	has_contact: z.enum(["yes", "no"]),
	phone: z.string().optional(),
	email: z.string().email("Please provide a valid email").optional(),
	social_platform: z.string().optional(),
	social_handle: z.string().optional(),
});

type RecipientDataFormValues = z.infer<typeof recipientSchema>;

export const RecipientDataForm = () => {
	const [[page, direction], setPage] = React.useState([0, 0]);
	const [canContinue, setCanContinue] = React.useState(false);

	const {
		canContinue: canContinueForm,
		recipientName,
		recipientSocial,
		recipientEmail,
		recipientPhone,
		recipientSocialHandle,
		setCanContinue: setCanContinueForm,
		setRecipientName,
		setRecipientSocial,
		setRecipientEmail,
		setRecipientPhone,
		setRecipientSocialHandle,
	} = useRecipientStore();

	const [knowAddress, setKnowAddress] = React.useState(false);

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 20 : -20,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 20 : -20,
			opacity: 0,
		}),
	};

	React.useEffect(() => {
		if (page === 0) {
			if (recipientName.trim() === "") {
				setCanContinue(false);
				return;
			}
			setCanContinue(true);
			return;
		}

		if (page === 1 && !knowAddress) {
			if (
				recipientSocialHandle != null &&
				recipientSocialHandle.trim() === "" &&
				recipientPhone != null &&
				recipientPhone.trim() === "" &&
				recipientEmail != null &&
				recipientEmail.trim() === ""
			) {
				setCanContinue(false);
				return;
			}
			setCanContinueForm(true);
		}
	}, [
		page,
		recipientName,
		recipientSocialHandle,
		recipientPhone,
		recipientEmail,
		knowAddress,
		setCanContinueForm,
	]);

	const paginate = (newDirection: number) => {
		if (page + newDirection < 0 || page + newDirection > 2) {
			return;
		}

		setPage([page + newDirection, newDirection]);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const formStepsContent = React.useMemo(() => {
		switch (page) {
			case 0:
				return (
					<>
						<div className="grid gap-2">
							<Label>Recipient Name</Label>
							<Input
								placeholder="shadcn"
								name="recipient_name"
								value={recipientName}
								onChange={(e) => setRecipientName(e.target.value)}
							/>
							<InputDescription>
								This is the name of the recipient. It will be used to create the
								gift.
							</InputDescription>
							<InputMessage />
						</div>

						<div className="grid gap-2">
							<Label>Did you know the address?</Label>

							<Button
								onClick={() => {
									setKnowAddress(true);
									if (canContinue) {
										paginate(1);
										setCanContinueForm(false);
									}
								}}
							>
								Yes
							</Button>
							<Button
								onClick={() => {
									setKnowAddress(false);
									if (canContinue) {
										paginate(1);
										setCanContinueForm(false);
									}
								}}
							>
								No
							</Button>
						</div>
					</>
				);
			case 1:
				return knowAddress ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-1">
						<div>
							<Label>Recipient Address</Label>
							<Input placeholder="shadcn" />
							<InputMessage />
						</div>
						<div>
							<Label>Recipient city</Label>
							<Input placeholder="shadcn" />
							<InputMessage />
						</div>
						<div>
							<Label>Recipient state</Label>
							<Input placeholder="shadcn" />
							<InputMessage />
						</div>
						<div>
							<Label>Recipient postal_code</Label>
							<Input placeholder="shadcn" />
							<InputMessage />
						</div>
						<div>
							<Label>Recipient country</Label>
							<Input placeholder="shadcn" />
							<InputMessage />
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4">
						<div>
							<Label>Recipient Phone Number</Label>
							<Input
								placeholder="+1 (555) 555-5555"
								name="recipient_phone"
								onChange={(e) => setRecipientPhone(e.target.value)}
								value={recipientPhone}
							/>
							<InputMessage />
						</div>

						<div>
							<Label>Recipient Email</Label>
							<Input
								placeholder="recipient@email.com"
								name="recipient_email"
								onChange={(e) => setRecipientEmail(e.target.value)}
								value={recipientEmail}
							/>
							<InputMessage />
						</div>

						<div>
							<Label>Social Platform</Label>
							<Select onValueChange={() => {}} defaultValue={"facebook"}>
								<SelectTrigger>
									<SelectValue placeholder="Select a Social Platform" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="facebook">Facebook</SelectItem>
									<SelectItem value="instagram">Instagram</SelectItem>
									<SelectItem value="twitch">Twitch</SelectItem>
									<SelectItem value="tiktok">Tiktok</SelectItem>
									<SelectItem value="x">X (Twitter)</SelectItem>
									<SelectItem value="snapchat">Snapchat</SelectItem>
									<SelectItem value="youtube">Youtube</SelectItem>
									<SelectItem value="linkedin">LinkedIn</SelectItem>
									<SelectItem value="github">Github</SelectItem>
								</SelectContent>
							</Select>
							<InputMessage />
						</div>

						<div>
							<Label>Social Handle</Label>
							<Input
								placeholder="@recipient_social_handle"
								name="recipient_social_handle"
								value={recipientSocialHandle}
								onChange={(e) => setRecipientSocialHandle(e.target.value)}
							/>
							<InputMessage />
						</div>
					</div>
				);
			default:
				return null;
		}
	}, [
		page,
		knowAddress,
		recipientName,
		setRecipientName,
		setRecipientSocial,
		setRecipientEmail,
		setRecipientPhone,
		canContinue,
	]);

	return (
		<AnimatePresence custom={direction} initial={false} mode="wait">
			<LazyMotion features={domAnimation}>
				<m.div
					key={page}
					animate="center"
					className="mt-8 flex flex-col gap-3"
					custom={direction}
					exit="exit"
					initial="enter"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					variants={variants}
				>
					{formStepsContent}
					<div className="w-full flex justify-end gap-2">
						<Button
							type="button"
							onClick={() => {
								console.log("back");
								paginate(-1);
							}}
							variant={"outline"}
							className={cn({ hidden: page === 0 })}
						>
							Go Back
						</Button>
					</div>
				</m.div>
			</LazyMotion>
		</AnimatePresence>
	);
};

function InputMessage({
	children,
	error,
}: { children?: React.ReactNode; error?: { message: string } }) {
	const body = error ? String(error.message) : children;

	if (!body) {
		return null;
	}

	return <p className="text-[0.8rem] font-medium text-destructive">{body}</p>;
}

function InputDescription({ children }: { children?: React.ReactNode }) {
	return (
		<p className="text-[0.8rem] font-medium text-muted-foreground">
			{children}
		</p>
	);
}
