/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NLqJBYDW4jV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Separator } from "@theliaison/ui/separator";
import { Button } from "@theliaison/ui/button";

export function PayInvoice() {
	return (
		<div className="flex flex-col min-h-screen">
			<section className="bg-primary text-primary-foreground py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
								We Have the Recipient Address!
							</h1>
							<p className="max-w-[700px] mx-auto text-primary-foreground md:text-xl lg:text-2xl">
								This is an exciting moment that we should celebrate. Let's make
								sure the invoice is delivered promptly and accurately.
							</p>
						</div>
					</div>
				</div>
			</section>
			<main className="flex-1 p-6">
				<div className="max-w-md mx-auto bg-background rounded-lg shadow-lg p-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Invoice</h2>
							<div className="text-sm text-muted-foreground">June 26, 2024</div>
						</div>
						<div className="grid grid-cols-[1fr_auto] gap-4">
							<div>The Liaison Service</div>
							<div className="text-right">$10</div>
						</div>
						<Separator />
						<div className="grid grid-cols-[1fr_auto] gap-4 font-medium">
							<div>Total</div>
							<div className="text-right">$10</div>
						</div>
						<Button className="w-full">Pay Bill</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
