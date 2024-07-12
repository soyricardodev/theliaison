"use client";
import React from "react";
import { RegisterForm } from "./register-form";
import { Card, CardContent, CardHeader } from "@theliaison/ui/card";

export default function Register() {
	const queryString =
		typeof window !== "undefined" ? window?.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	const next = urlParams.get("next");

	return (
		<div className="w-full mx-auto sm:w-[26rem] my-12 p-5 rounded-md">
			<Card className="bg-white/80 backdrop-blur-2xl border-transparent">
				<CardHeader>
					<div className="p-5">
						<div className="text-center space-y-3">
							<h1 className="font-bold text-2xl">Create Account</h1>
							<p className="text-base text-pretty">
								Welcome! Please fill in the details to get started.
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<RegisterForm redirectTo={next || "/"} />
				</CardContent>
			</Card>
		</div>
	);
}
