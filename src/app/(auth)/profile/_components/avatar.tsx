"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "~/utils/supabase/client";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

export function Avatar({
	uid,
	url,
	size,
	onUpload,
}: {
	uid: string | null;
	url: string | null;
	size: number;
	onUpload: (url: string) => void;
}) {
	const supabase = createClient();
	const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage
					.from("avatars")
					.download(path);
				if (error) {
					throw error;
				}

				const url = URL.createObjectURL(data);
				setAvatarUrl(url);
			} catch (error) {
				console.log("Error downloading image: ", error);
			}
		}

		if (url) downloadImage(url);
	}, [url, supabase]);

	const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
		event,
	) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];
			const fileExt = file?.name.split(".").pop();
			const filePath = `${uid}-${Math.random()}.${fileExt}`;

			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, file!);

			if (uploadError) {
				throw uploadError;
			}

			onUpload(filePath);
		} catch (error) {
			alert("Error uploading avatar!");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			{avatarUrl ? (
				<Image
					width={size}
					height={size}
					src={avatarUrl}
					alt="Avatar"
					className="rounded-full size-28"
					style={{ height: size, width: size }}
				/>
			) : (
				<div
					className="avatar no-image"
					style={{ height: size, width: size }}
				/>
			)}
			<div style={{ width: size }}>
				<Label
					className={cn(
						buttonVariants({ variant: "outline", size: "sm" }),
						"my-2 cursor-pointer",
					)}
					htmlFor="single"
				>
					{uploading ? "Uploading ..." : "Upload avatar"}
				</Label>
				<Input
					style={{
						visibility: "hidden",
						position: "absolute",
					}}
					type="file"
					id="single"
					accept="image/*"
					onChange={uploadAvatar}
					disabled={uploading}
				/>
			</div>
		</div>
	);
}