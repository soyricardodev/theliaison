"use client";

import { Button } from "@theliaison/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { Input } from "@theliaison/ui/input";
import { Label } from "@theliaison/ui/label";
import { RadioGroup, RadioGroupItem } from "@theliaison/ui/radio-group";
import { useState } from "react";

export function SimpleSendGift() {
	const [recipientName, setRecipientName] = useState("");
	const [contactInfo, setContactInfo] = useState("");

	return (
		<Card className="mx-auto max-w-md bg-background">
			<CardHeader>
				<CardTitle className="text-lg text-foreground">Send a custom Gift</CardTitle>
				<CardDescription className="text-base">
					Fill out the form below to send an anonymous gift to someone special.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4">
					<div className="grid gap-2 text-foreground">
						<Label htmlFor="recipient-name">Recipient's Name</Label>
						<Input
							id="recipient-name"
							placeholder="Enter recipient's name"
							name="recipient-name"
							value={recipientName}
							onChange={(e) => setRecipientName(e.target.value)}
						/>
					</div>
					<div className="grid gap-2 text-foreground">
						<Label htmlFor="contact-method">Contact Method</Label>
						<RadioGroup defaultValue="email" className="grid grid-cols-3 gap-4">
							<div>
								<RadioGroupItem
									value="email"
									id="email"
									className="peer sr-only"
								/>
								<Label
									htmlFor="email"
									className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<MailIcon className="mb-3 h-6 w-6" />
									Email
								</Label>
							</div>
							<div>
								<RadioGroupItem
									value="phone"
									id="phone"
									className="peer sr-only"
								/>
								<Label
									htmlFor="phone"
									className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<PhoneIcon className="mb-3 h-6 w-6" />
									Phone
								</Label>
							</div>
							<div>
								<RadioGroupItem
									value="social"
									id="social"
									className="peer sr-only"
								/>
								<Label
									htmlFor="social"
									className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<FacebookIcon className="mb-3 h-6 w-6" />
									Social
								</Label>
							</div>
						</RadioGroup>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="contact-info">Contact Information</Label>
						{/* <div>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select social network" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="facebook">Facebook</SelectItem>
									<SelectItem value="twitter">Twitter</SelectItem>
									<SelectItem value="instagram">Instagram</SelectItem>
									<SelectItem value="linkedin">LinkedIn</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Input
								id="phone-number"
								placeholder="+1 (555) 555-5555"
								maxLength={15}
							/>
						</div> */}
						<Input
							id="contact-info"
							placeholder="recipient@email.com"
							name="contact-info"
							value={contactInfo}
							onChange={(e) => setContactInfo(e.target.value)}
						/>
					</div>
					<Button type="submit" className="w-full bg-foreground text-background">
						Send Gift
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
		</svg>
	);
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
	);
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);
}
