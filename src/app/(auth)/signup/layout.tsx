import { Logo } from "~/components/logo";

export default function SignupLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-dvh flex-col pt-10">
			<div className="flex items-center justify-center">
				<div className="relative flex h-screen w-screen">
					{/* logo */}
					<div className="absolute left-2 top-5 lg:left-5">
						<div className="flex items-center gap-x-2">
							<Logo />
						</div>
					</div>
					<div className="flex w-full items-center justify-center bg-background lg:w-1/2">
						{/* mobile form */}
						{children}
					</div>
					<div
						className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex"
						style={{
							backgroundImage:
								'url("https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg")',
							backgroundSize: "cover",
							backgroundPosition: "center center",
						}}
					>
						<div className="flex flex-col items-end gap-4">
							<div className="items-center justify-center gap-2 rounded-sm outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 flex flex-row-reverse">
								<span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-full">
									<img
										src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
										className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
										alt="Bruno Reichert"
									/>
								</span>
								<div className="inline-flex flex-col items-start">
									<span className="text-sm w-full text-right text-black">
										Bruno Reichert
									</span>
									<span className="text-xs text-black/80">
										Founder & CEO at ACME
									</span>
								</div>
							</div>
							<p className="w-full text-right text-2xl text-black/60">
								<span className="font-medium" />
								<span className="font-medium italic">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
									eget augue nec massa volutpat aliquet.
								</span>
								<span className="font-medium" />
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
