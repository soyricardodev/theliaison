"use client";

import { Icon } from "@iconify/react";
import { Button, Divider } from "@nextui-org/react";

import { signInWithOAuth } from "./actions";

export function AuthWithGoogle() {
	return (
		<>
			<form action={signInWithOAuth} className="w-full">
				<Button
					startContent={<Icon icon="flat-color-icons:google" width={24} />}
					variant="bordered"
					type="submit"
					className="w-full"
					fullWidth
				>
					Continue with Google
				</Button>
			</form>

			<div className="flex w-full items-center gap-4 py-2">
				<Divider className="flex-1" />
				<p className="text-tiny text-default-500 shrink-0">OR</p>
				<Divider className="flex-1" />
			</div>
		</>
	);
}
