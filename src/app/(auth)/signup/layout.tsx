import { Logo } from "~/components/logo";

export default function SignupLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-dvh flex-col">
			<div className="flex items-center justify-center h-screen">
				<div
					className="flex h-screen w-screen items-center justify-start overflow-hidden rounded-small bg-content1 p-2 sm:p-4 lg:p-8"
					style={{
						backgroundImage:
							'url("https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture-2.jpg")',
						backgroundSize: "cover",
						backgroundPosition: "center center",
					}}
				>
					<div className="absolute left-10 top-10">
						<div className="flex items-center">
							<Logo isWhite />
						</div>
					</div>

					<div className="absolute bottom-10 right-10 hidden md:block">
						<p className="max-w-xl text-right text-white/60">
							<span className="font-medium">"</span>
							<span className="font-medium">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
								eget augue nec massa volutpat aliquet.
							</span>
							<span className="font-medium">"</span>
						</p>
					</div>

					{children}
				</div>
			</div>
		</div>
	);
}
