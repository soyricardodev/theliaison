"use client";

import { Badge, Button, Progress } from "@nextui-org/react";
import { Toaster } from "@theliaison/ui/sonner";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowLeftIcon, ShoppingCartIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useCartStore } from "~/store/cart";
import { useRecipientStore } from "~/store/recipient";
import { OrderSummary } from "./_components/order-summary";
import { OrderSummaryConfirmation } from "./_components/order-summary-confirmation";
import { RecipientDataForm } from "./_components/recipient-data-form";
import { createGift } from "./actions";

export default function Component() {
	const [[page, direction], setPage] = React.useState([0, 0]);
	const { shoppingCart } = useCartStore();
	const {
		canContinue,
		recipientName,
		recipientSocial,
		recipientEmail,
		recipientPhone,
		recipientSocialHandle,
	} = useRecipientStore();

	const totalPrice = React.useMemo(() => {
		return shoppingCart.reduce(
			(acc, item) => acc + (item.unitPrice / 100) * item.quantity,
			0,
		);
	}, [shoppingCart]);
	const totalPriceFormatted = React.useMemo(() => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(totalPrice);
	}, [totalPrice]);

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

	const paginate = (newDirection: number) => {
		if (page + newDirection > 1) {
			console.log("Creating gift");
			toast.promise(
				createGift({
					recipient_name: recipientName,
					recipient_social: recipientSocial,
					recipient_email: recipientEmail,
					gifts: shoppingCart.map((gift) => ({
						id: gift.id,
						quantity: gift.quantity,
					})),
					knows_address: false,
					recipient_phone: recipientPhone,
					recipient_social_handle: recipientSocialHandle,
				}),
				{
					loading: "Creating order...",
					error: (error) => {
						console.log(error);
						return error;
					},
					success: () => {
						return "OK";
					},
				},
			);
			return;
		}

		if (page + newDirection < 0 || page + newDirection > 2) return;

		setPage([page + newDirection, newDirection]);
	};

	const shouldCancelContinue = React.useMemo(() => {
		return page === 0 ? false : !canContinue;
	}, [page, canContinue]);

	const ctaLabel = React.useMemo(() => {
		switch (page) {
			case 0:
				return "Continue to send gift";
			case 1:
				return "Finish gift";
			case 2:
				return "Place gift";
			default:
				return "Continue to shipping";
		}
	}, [page]);

	const stepTitle = React.useMemo(() => {
		switch (page) {
			case 0:
				return "Review your gift";
			case 1:
				return "Who do you want to send the gift to?";
			case 2:
				return "Confirm and Finish";
			default:
				return "Review your gift";
		}
	}, [page]);

	const stepsContent = React.useMemo(() => {
		switch (page) {
			case 0:
				return <OrderSummary hideTitle />;
			case 1:
				return (
					<div className="mt-4 flex flex-col gap-6">
						<RecipientDataForm />
						{/* <RecipientContactForm hideTitle variant="bordered" /> */}
					</div>
				);
			case 2:
				return (
					<div className="flex flex-col gap-4 mt-4">
						<OrderSummaryConfirmation />
					</div>
				);
			default:
				return null;
		}
	}, [page]);

	return (
		<section className="flex h-[calc(100vh_-_60px)] w-full gap-8">
			<div className="w-full flex-none py-4 px-10 lg:max-w-screen-xl mx-auto">
				<div className="flex justify-between px-2">
					<div className="flex items-center">
						<p className="font-semibold">Send the gift</p>
					</div>
					<div className="flex items-center gap-2">
						<p>
							<span className="text-small font-semibold text-default-700">
								{totalPriceFormatted}
							</span>
							<span className="ml-1 text-small text-default-500">
								({shoppingCart.length} items)
							</span>
						</p>
						<Badge content={shoppingCart.length} showOutline={false}>
							<ShoppingCartIcon width={28} />
						</Badge>
					</div>
				</div>

				<div className="flex h-full flex-1 flex-col p-4">
					<div>
						<Button
							className="-ml-2 text-default-700"
							isDisabled={page === 0}
							radius="full"
							variant="flat"
							onPress={() => paginate(-1)}
						>
							<ArrowLeftIcon width={20} />
							Go back
						</Button>
					</div>

					<AnimatePresence custom={direction} initial={false} mode="wait">
						<LazyMotion features={domAnimation}>
							<m.form
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
								onSubmit={(e) => e.preventDefault()}
							>
								<h1 className="text-2xl font-medium">{stepTitle}</h1>
								{stepsContent}
								<Button
									fullWidth
									className="mt-8 bg-foreground text-background"
									size="lg"
									onPress={() => paginate(1)}
									isDisabled={shouldCancelContinue}
								>
									{ctaLabel}
								</Button>
							</m.form>
						</LazyMotion>
					</AnimatePresence>

					<div className="mt-auto flex w-full justify-between gap-8 pb-8 pt-4">
						<div className="flex w-full flex-col items-start gap-2">
							<p className="text-small font-medium">Review</p>
							<Progress
								classNames={{
									indicator: "!bg-foreground",
								}}
								value={page >= 0 ? 100 : 0}
							/>
						</div>
						<div className="flex w-full flex-col items-start gap-2">
							<p className="text-small font-medium">Recipient Information</p>
							<Progress
								classNames={{
									indicator: "!bg-foreground",
								}}
								value={page >= 1 ? 100 : 0}
							/>
						</div>
						<div className="flex w-full flex-col items-start gap-2">
							<p className="text-small font-medium">Confirm and Finish</p>
							<Progress
								classNames={{
									indicator: "!bg-foreground",
								}}
								value={page >= 2 ? 100 : 0}
							/>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</section>
	);
}
