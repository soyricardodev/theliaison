import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gdSudCP9E7W
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Component() {
	return (
		<div key="1" className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
			<Tabs className="w-full" defaultValue="community">
				<TabsList className="mb-8 flex w-full justify-start border-b border-gray-200 dark:border-gray-800">
					<TabsTrigger value="community">Community Thoughts</TabsTrigger>
					<TabsTrigger value="ai">AI Thoughts</TabsTrigger>
					<TabsTrigger value="owner">Owner Thoughts</TabsTrigger>
				</TabsList>
				<TabsContent className="space-y-8" value="community">
					<div className="grid gap-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-2xl font-bold">
									What's your favorite feature?
								</h2>
								<img
									alt="Poll"
									className="rounded-lg mt-4 object-cover"
									height={400}
									src="/placeholder.svg"
									style={{
										aspectRatio: "600/400",
										objectFit: "cover",
									}}
									width={600}
								/>
							</div>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Drag & Drop
												</span>
												<span className="text-base font-medium">42%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[42%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Collaboration
												</span>
												<span className="text-base font-medium">28%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[28%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Deployment
												</span>
												<span className="text-base font-medium">18%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[18%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">Analytics</span>
												<span className="text-base font-medium">12%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[12%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
								</div>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									Total Votes: 1,234
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent className="space-y-8" value="ai">
					<div className="grid gap-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-2xl font-bold">
									What's your favorite feature?
								</h2>
								<img
									alt="Poll"
									className="rounded-lg mt-4 object-cover"
									height={400}
									src="/placeholder.svg"
									style={{
										aspectRatio: "600/400",
										objectFit: "cover",
									}}
									width={600}
								/>
							</div>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Drag & Drop
												</span>
												<span className="text-base font-medium">35%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[35%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Collaboration
												</span>
												<span className="text-base font-medium">32%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[32%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Deployment
												</span>
												<span className="text-base font-medium">22%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[22%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">Analytics</span>
												<span className="text-base font-medium">11%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[11%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
								</div>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									Total Votes: 987
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent className="space-y-8" value="owner">
					<div className="grid gap-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-2xl font-bold">
									What's your favorite feature?
								</h2>
								<img
									alt="Poll"
									className="rounded-lg mt-4 object-cover"
									height={400}
									src="/placeholder.svg"
									style={{
										aspectRatio: "600/400",
										objectFit: "cover",
									}}
									width={600}
								/>
							</div>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Drag & Drop
												</span>
												<span className="text-base font-medium">48%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[48%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Collaboration
												</span>
												<span className="text-base font-medium">25%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[25%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">
													Deployment
												</span>
												<span className="text-base font-medium">15%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[15%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
									<Card className="p-6">
										<CardContent className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-base font-medium">Analytics</span>
												<span className="text-base font-medium">12%</span>
											</div>
											<div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
												<div className="h-6 w-[12%] rounded-full bg-primary" />
											</div>
										</CardContent>
									</Card>
								</div>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									Total Votes: 1,456
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
			<div className="mt-12 space-y-8 grid md:grid-cols-2 gap-8">
				<div>
					<Separator />
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">Comments</h2>
						<div className="grid gap-6 max-h-[400px] overflow-auto">
							<div className="flex items-start gap-4">
								<Avatar className="w-10 h-10 border">
									<AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between">
										<div className="font-medium">John Doe</div>
										<div className="flex items-center gap-2">
											<Button size="icon" variant="ghost">
												<ArrowUpIcon />
											</Button>
											<Button size="icon" variant="ghost">
												<ArrowDownIcon />
											</Button>
											<time className="text-sm text-gray-500 dark:text-gray-400">
												2 days ago
											</time>
										</div>
									</div>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Great poll! I'm really interested to see the results. I
										think the Drag & Drop feature is the most useful for my
										team.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<Avatar className="w-10 h-10 border">
									<AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
									<AvatarFallback>SA</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between">
										<div className="font-medium">Sarah Anderson</div>
										<div className="flex items-center gap-2">
											<Button size="icon" variant="ghost">
												<ArrowUpIcon />
											</Button>
											<Button size="icon" variant="ghost">
												<ArrowDownIcon />
											</Button>
											<time className="text-sm text-gray-500 dark:text-gray-400">
												1 week ago
											</time>
										</div>
									</div>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										I'm really excited about the Collaboration features. Being
										able to work together in real-time is a game-changer for my
										team.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<Avatar className="w-10 h-10 border">
									<AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
									<AvatarFallback>MJ</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between">
										<div className="font-medium">Michael Johnson</div>
										<div className="flex items-center gap-2">
											<Button size="icon" variant="ghost">
												<ArrowUpIcon />
											</Button>
											<Button size="icon" variant="ghost">
												<ArrowDownIcon />
											</Button>
											<time className="text-sm text-gray-500 dark:text-gray-400">
												3 days ago
											</time>
										</div>
									</div>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										The Deployment feature looks really promising. I can't wait
										to try it out and see how it can streamline our workflow.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<Avatar className="w-10 h-10 border">
									<AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
									<AvatarFallback>EW</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between">
										<div className="font-medium">Emily Wilson</div>
										<div className="flex items-center gap-2">
											<Button size="icon" variant="ghost">
												<ArrowUpIcon />
											</Button>
											<Button size="icon" variant="ghost">
												<ArrowDownIcon />
											</Button>
											<time className="text-sm text-gray-500 dark:text-gray-400">
												1 day ago
											</time>
										</div>
									</div>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										I'm really impressed with the Analytics feature. It's going
										to be a game-changer for our team's decision-making process.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<Avatar className="w-10 h-10 border">
									<AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
									<AvatarFallback>JB</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between">
										<div className="font-medium">James Brown</div>
										<div className="flex items-center gap-2">
											<Button size="icon" variant="ghost">
												<ArrowUpIcon />
											</Button>
											<Button size="icon" variant="ghost">
												<ArrowDownIcon />
											</Button>
											<time className="text-sm text-gray-500 dark:text-gray-400">
												4 days ago
											</time>
										</div>
									</div>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										The Drag & Drop feature is a game-changer. It's made our
										workflow so much more efficient.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">Statistics</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
						<Card>
							<CardContent className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Gender</span>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-primary" />
										<span className="text-sm">Male</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-secondary" />
										<span className="text-sm">Female</span>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Age</span>
								</div>
								<div className="grid grid-cols-3 gap-2">
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-primary" />
										<span className="text-sm">18-24</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-secondary" />
										<span className="text-sm">25-34</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-tertiary" />
										<span className="text-sm">35+</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

function ArrowDownIcon() {
	return (
		<svg
			className="size-4"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M12 5v14" />
			<path d="m19 12-7 7-7-7" />
		</svg>
	);
}

function ArrowUpIcon() {
	return (
		<svg
			className="size-4"
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
			<path d="m5 12 7-7 7 7" />
			<path d="M12 19V5" />
		</svg>
	);
}
