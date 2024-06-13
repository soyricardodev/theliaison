"use client";

import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Button,
	Avatar,
	Tabs,
	Tab,
	Chip,
} from "@nextui-org/react";

export default function Component() {
	return (
		<div className="flex h-full  w-full items-start justify-center overflow-scroll">
			<Card className="my-10 w-[400px]">
				<CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-gray-600 via-primary to-black">
					<Avatar
						className="h-20 w-20 translate-y-12"
						src="https://i.pravatar.cc/150?u=a04258114e29026708c"
					/>
				</CardHeader>
				<CardBody>
					<div className="pb-4 pt-6">
						<p className="text-large font-medium">Ricardo</p>
						<p className="max-w-[90%] text-small text-default-400">@ricardo</p>
						<div className="flex gap-2 pb-1 pt-2">
							<Chip variant="flat">Developer</Chip>
							<Chip variant="flat">AI</Chip>
							<Chip variant="flat">Chess Player</Chip>
						</div>
						<p className="py-2 text-small text-foreground">
							User description. i'm ricardo and i am the only user in this
							platform so anyway, soon Ray you will login here.
						</p>
						<div className="flex gap-2">
							<p>
								<span className="text-small font-medium text-default-500">
									13
								</span>
								&nbsp;
								<span className="text-small text-default-400">Following</span>
							</p>
							<p>
								<span className="text-small font-medium text-default-500">
									2500
								</span>
								&nbsp;
								<span className="text-small text-default-400">Followers</span>
							</p>
						</div>
					</div>
					<Tabs fullWidth>
						<Tab key="polls" title="Polls" />
						<Tab key="likes" title="Likes" />
						<Tab key="gifts" title="Gifts" />
					</Tabs>
				</CardBody>
			</Card>
		</div>
	);
}
