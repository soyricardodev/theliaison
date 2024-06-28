"use client";
import Image from "next/image";
import React from "react";
import SignUp from "~/components/auth/signup-form";
import { SocialAuth } from "~/components/auth/social-auth";

export default function Register() {
	const queryString =
		typeof window !== "undefined" ? window?.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	const next = urlParams.get("next");

	return (
		<div className="w-full mx-auto sm:w-[26rem] sm:p-5 rounded-md">
			<div className="p-5 space-y-5">
				<div className="text-center space-y-3">
					<h1 className="font-bold text-xl">Create Account</h1>
					<p className="text-sm">
						Welcome! Please fill in the details to get started.
					</p>
				</div>
				{/* <SocialAuth redirectTo={next || "/"} />
				<div className="flex items-center gap-5">
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400" />
					<div className="text-sm">or</div>
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400" />
				</div> */}
			</div>
			<SignUp redirectTo={next || "/"} />
		</div>
	);
}
