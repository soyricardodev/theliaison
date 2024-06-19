import { brands } from "~/lib/constants/brands";

export function Companies() {
	return (
		<section
			id="companies"
			className="text-center mx-auto max-w-[80rem] px-6 md:px-8"
		>
			<div className="py-14">
				<div className="mx-auto max-w-screen-xl px-4 md:px-8">
					<h3 className="text-center text-balance text-sm font-semibold text-gray-600">
						TRUSTED BY BRANDS FROM AROUND THE WORLD
					</h3>
					<div className="relative mt-6">
						<ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-black ">
							{brands.map((brand, idx) => (
								<li key={`${idx}-${brand.slug}`}>{brand.logo}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
