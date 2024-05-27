"use client";

import {
	FacebookIcon,
	FacebookShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from "react-share";

export function ShareSocial({ id }: { id: string }) {
	const pageUrl = `https://theliaison.vercel.app/poll/${id}`;
	return (
		<div className="flex justify-center items-center gap-2 p-4 text-center">
			<FacebookShareButton url={pageUrl}>
				<FacebookIcon size={32} />
			</FacebookShareButton>
			<TwitterShareButton url={pageUrl}>
				<TwitterIcon size={32} />
			</TwitterShareButton>
			<WhatsappShareButton url={pageUrl}>
				<WhatsappIcon size={32} />
			</WhatsappShareButton>
			<TelegramShareButton url={pageUrl}>
				<TelegramIcon size={32} />
			</TelegramShareButton>
		</div>
	);
}
