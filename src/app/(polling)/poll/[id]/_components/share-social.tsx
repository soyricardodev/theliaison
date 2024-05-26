"use client";

import {
	FacebookShareButton,
	WhatsappShareButton,
	TelegramShareButton,
	TwitterShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	TelegramIcon,
} from "react-share";

export function ShareSocial() {
	return (
		<div className="flex justify-center items-center gap-2 p-4 text-center">
			<FacebookShareButton url="https://theliaison.com">
				<FacebookIcon size={32} />
			</FacebookShareButton>
			<TwitterShareButton url="https://theliaison.com">
				<TwitterIcon size={32} />
			</TwitterShareButton>
			<WhatsappShareButton url="https://theliaison.com">
				<WhatsappIcon size={32} />
			</WhatsappShareButton>
			<TelegramShareButton url="https://theliaison.com">
				<TelegramIcon size={32} />
			</TelegramShareButton>
		</div>
	);
}
