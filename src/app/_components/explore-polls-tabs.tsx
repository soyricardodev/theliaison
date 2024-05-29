"use client";
import { Tab, Tabs } from "@nextui-org/react";
import type { SVGProps } from "react";

export function ExplorePollsTabs({
	allPolls,
	featuredPolls,
}: {
	allPolls: React.ReactNode;
	featuredPolls: React.ReactNode;
}) {
	return (
		<Tabs aria-label="Polls" variant="bordered">
			<Tab
				title={
					<div className="flex items-center justify-center space-x-2">
						<SolarStarsMinimalisticBoldDuotone />
						<span>All Polls</span>
					</div>
				}
			>
				{allPolls}
			</Tab>
			<Tab
				title={
					<div className="flex items-center justify-center space-x-2">
						<SolarCrownStarBoldDuotone />
						<span>Featured Polls</span>
					</div>
				}
			>
				{featuredPolls}
			</Tab>
		</Tabs>
	);
}

export function SolarCrownStarBoldDuotone(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5em"
			height="1.5em"
			viewBox="0 0 24 24"
			aria-hidden="true"
			{...props}
		>
			<path
				fill="currentColor"
				d="m21.838 11.126l-.229 2.436c-.378 4.012-.567 6.019-1.75 7.228C18.678 22 16.906 22 13.36 22h-2.72c-3.545 0-5.317 0-6.5-1.21c-1.183-1.21-1.371-3.216-1.749-7.228l-.23-2.436c-.18-1.912-.27-2.869.058-3.264a.992.992 0 0 1 .675-.367c.476-.042 1.073.638 2.268 1.998c.618.704.927 1.055 1.271 1.11a.923.923 0 0 0 .562-.09c.319-.16.53-.595.955-1.464l2.237-4.584C10.989 2.822 11.39 2 12 2c.61 0 1.011.822 1.813 2.465l2.237 4.584c.424.87.636 1.304.955 1.464c.176.089.37.12.562.09c.344-.055.653-.406 1.271-1.11c1.195-1.36 1.792-2.04 2.268-1.998a.992.992 0 0 1 .675.367c.327.395.237 1.352.057 3.264"
				opacity={0.5}
			/>
			<path
				fill="currentColor"
				d="m12.952 12.699l-.098-.176c-.38-.682-.57-1.023-.854-1.023c-.284 0-.474.34-.854 1.023l-.098.176c-.108.194-.162.29-.246.354c-.085.064-.19.088-.4.135l-.19.044c-.738.167-1.107.25-1.195.532c-.088.283.164.577.667 1.165l.13.152c.143.167.215.25.247.354c.032.104.021.215 0 .438l-.02.203c-.076.785-.114 1.178.115 1.352c.23.174.576.015 1.267-.303l.178-.082c.197-.09.295-.136.399-.136c.104 0 .202.046.399.136l.178.082c.691.319 1.037.477 1.267.303c.23-.174.191-.567.115-1.352l-.02-.203c-.021-.223-.032-.334 0-.438c.032-.103.104-.187.247-.354l.13-.152c.503-.588.755-.882.667-1.165c-.088-.282-.457-.365-1.195-.532l-.19-.044c-.21-.047-.315-.07-.4-.135c-.084-.064-.138-.16-.246-.354"
			/>
		</svg>
	);
}

export function SolarStarsMinimalisticBoldDuotone(
	props: SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="1.5em"
			height="1.5em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="M10.08 7.897C11.157 5.966 11.695 5 12.5 5c.805 0 1.343.966 2.42 2.897l.278.5c.306.549.46.823.698 1.004c.238.181.535.248 1.13.383l.54.122c2.091.473 3.137.71 3.385 1.51c.249.8-.464 1.633-1.89 3.3l-.368.43c-.405.474-.607.711-.699 1.004c-.09.293-.06.609.001 1.24l.056.576c.216 2.224.323 3.336-.328 3.83c-.651.495-1.63.044-3.587-.857l-.507-.234c-.556-.256-.834-.384-1.129-.384c-.295 0-.573.128-1.13.384l-.506.234c-1.957.9-2.936 1.352-3.587.857c-.651-.494-.543-1.606-.328-3.83l.056-.575c.061-.632.092-.948 0-1.24c-.09-.294-.293-.53-.698-1.004l-.369-.432c-1.425-1.666-2.138-2.5-1.89-3.3c.25-.8 1.295-1.036 3.386-1.509l.54-.122c.595-.135.892-.202 1.13-.383c.239-.18.392-.455.698-1.004z"
			/>
			<path
				fill="currentColor"
				d="M4.868 2.5c.03-.105.217-.106.248 0c.14.482.4 1.194.793 1.585c.393.39 1.108.646 1.59.783c.107.03.107.217.002.248c-.482.14-1.195.4-1.586.793c-.39.393-.645 1.108-.782 1.59c-.03.107-.218.107-.249.002c-.14-.482-.4-1.195-.793-1.586c-.393-.39-1.107-.645-1.59-.782c-.106-.03-.107-.218-.001-.249c.482-.14 1.194-.4 1.585-.793c.39-.393.646-1.107.783-1.59"
				opacity={0.5}
			/>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M19 3.25a.75.75 0 0 1 .75.75v.25H20a.75.75 0 0 1 0 1.5h-.25V6a.75.75 0 0 1-1.5 0v-.25H18a.75.75 0 0 1 0-1.5h.25V4a.75.75 0 0 1 .75-.75"
				clipRule="evenodd"
				opacity={0.5}
			/>
		</svg>
	);
}
