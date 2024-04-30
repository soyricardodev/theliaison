export function Container({ children }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section className="max-w-screen-2xl px-6 lg:px-8 mt-16 mx-auto mb-28">
			<div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
		</section>
	);
}
