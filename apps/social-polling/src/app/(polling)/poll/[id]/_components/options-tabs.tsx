"use client";

import { Tabs, Tab } from "@nextui-org/react";

export default function OptionsTabs({
	aiOptions,
	communityOptions,
	theliaisonOptions,
}: {
	communityOptions: React.ReactNode;
	theliaisonOptions: React.ReactNode;
	aiOptions?: React.ReactNode;
}) {
	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options">
				<Tab key="community" title="Community">
					{communityOptions}
				</Tab>
				<Tab key="theliaison" title="The Liaison">
					{theliaisonOptions}
				</Tab>
				<Tab key="ai" title="AI" disabled>
					{aiOptions}
				</Tab>
			</Tabs>
		</div>
	);
}
