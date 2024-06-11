import { User } from "@nextui-org/react";

import { Logo } from "~/components/logo";

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex h-screen w-screen">
			<div className="absolute left-2 top-5 lg:left-5">
				<div className="flex items-center">
					<Logo className="size-10" />
				</div>
			</div>

			{children}

			{/* Right side */}
			<div className="rounded-medium shadow-small relative hidden w-1/2 flex-col-reverse bg-[url('/white-building.webp')] bg-cover bg-center p-10 lg:flex">
				<div className="flex flex-col items-end gap-4">
					<User
						avatarProps={{
							src: "/avatar.webp",
						}}
						classNames={{
							base: "flex flex-row-reverse",
							name: "w-full text-right text-black",
							description: "text-black/80",
						}}
						name="Bruno Reichert"
					/>
					<p className="w-full text-right text-2xl text-black/60">
						<span className="font-medium">“</span>
						<span className="font-normal italic">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
							augue nec massa volutpat aliquet.
						</span>
						<span className="font-medium">”</span>
					</p>
				</div>
			</div>
		</div>
	);
}
