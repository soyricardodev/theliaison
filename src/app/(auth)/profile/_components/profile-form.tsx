"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createClient } from "~/utils/supabase/client";
import { Avatar } from "./avatar";

const profileFormSchema = z.object({
	fullName: z
		.string({
			required_error: "Please enter your full name",
		})
		.min(3, {
			message: "Full name must be at least 3 characters.",
		}),
	username: z
		.string()
		.min(3, {
			message: "Username must be at least 3 characters.",
		})
		.max(30, {
			message: "Username must not be longer than 30 characters.",
		})
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: "Username must only contain letters, numbers, and underscores.",
		}),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user: User | null }) {
	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [avatar_url, setAvatarUrl] = useState<string | null>(null);

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			fullName: "",
			username: "",
		},
		mode: "onChange",
	});

	const getProfile = useCallback(async () => {
		try {
			setLoading(true);

			const { data, error, status } = await supabase
				.from("profiles")
				.select("full_name, username, avatar_url")
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				console.log(error);
				throw error;
			}

			if (data) {
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			toast.error("Error loading user data!");
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getProfile();
	}, [user, getProfile]);

	async function updateProfile({
		username,
		fullname,
		avatar_url,
	}: {
		username: string | null;
		fullname: string | null;
		avatar_url?: string | null;
	}) {
		try {
			const { error } = await supabase.from("profiles").upsert({
				id: user?.id as string,
				full_name: fullname,
				username,
				avatar_url,
				updated_at: new Date().toISOString(),
			});
			if (error) {
				throw error;
			}
		} catch (error) {
			throw error;
		} finally {
			return true;
		}
	}

	async function updateAvatar(url: string | null) {
		toast.loading("Updating your avatar");
		const { error } = await supabase.from("profiles").upsert({
			id: user?.id as string,
			avatar_url: url,
			updated_at: new Date().toISOString(),
		});
		if (error) {
			toast.error("Error updating your avatar!");
			throw error;
		}
		toast.success("Avatar updated");
	}

	async function onSubmit(data: ProfileFormValues) {
		setLoading(true);
		await toast.promise(
			updateProfile({ fullname: data.fullName, username: data.username }),
			{
				loading: "Updating your profile",
				success: "Profile updated",
				error: "Error updating your profile",
			},
		);
		setLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Avatar
					uid={user?.id ?? null}
					url={avatar_url}
					size={150}
					onUpload={(url) => {
						setAvatarUrl(url ?? null);
						updateAvatar(url);
					}}
				/>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name. It can be your real name or a
								pseudonym. You can only change this once every 30 days.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="johndoe" {...field} />
							</FormControl>
							<FormDescription>
								This is your public username. You can only change this once
								every 30 days.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div>
					<Button type="submit" disabled={loading}>
						{loading ? "Loading ..." : "Update"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
