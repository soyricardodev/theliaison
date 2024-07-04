"use client";
import React from "react";
import SignUp from "~/components/auth/signup-form";

export default function Register() {
	const queryString =
		typeof window !== "undefined" ? window?.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	const next = urlParams.get("next");

	return (
		<div className="w-full mx-auto sm:w-[26rem] sm:p-5 rounded-md">
			<div className="p-5 space-y-5">
				<div className="text-center space-y-3">
					<h1 className="font-bold text-2xl">Create Account</h1>
					<p className="text-lg text-pretty">
						Welcome! Please fill in the details to get started.
					</p>
				</div>
			</div>
			<SignUp redirectTo={next || "/"} />
		</div>
	);
}
