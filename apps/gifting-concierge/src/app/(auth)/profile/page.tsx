import { Avatar, Button, Input } from "@nextui-org/react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { env } from "~/env";
import { createClient } from "~/supabase/server";
import { UploadAvatar } from "./upload-avatar";

export default async function ProfilePage() {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		redirect("/login");
	}

	const { data: profileData, error: profileError } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id)
		.single();

	if (profileError || !profileData) {
		return <div>Error</div>;
	}

	const updateProfileAction = async (formData: FormData) => {
		"use server";

		const supabase = createClient();

		const name = formData.get("full_name") as string;
		const country = formData.get("country") as string;
		const state = formData.get("state") as string;
		const city = formData.get("city") as string;
		const gender = formData.get("gender") as string;
		const zip_code = formData.get("zip_code") as string;

		const { error } = await supabase
			.from("users")
			.upsert({
				id: user.id,
				full_name: name,
				country: country,
				state: state,
				city: city,
				gender: gender as "female" | "male" | "other",
				zip_code: Number(zip_code),
			})
			.eq("id", user.id);

		if (error) {
			console.log(error);
			return;
		}

		revalidatePath("/", "layout");
	};

	return (
		<div className="flex flex-col items-center min-h-screen h-full justify-center p-4">
			<div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-white/30 backdrop-blur-2xl outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-xl p-2">
				<div className="p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col items-start px-4 pb-0 pt-4">
					<p className="text-lg font-medium">Account Details</p>
					<div className="flex gap-4 py-4">
						<div className="relative inline-flex shrink-0">
							<span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground rounded-full h-14 w-14">
								<Avatar
									src={
										profileData.avatar_url != null
											? profileData.avatar_url.startsWith("avatars/")
												? `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${profileData.avatar_url}`
												: profileData.avatar_url
											: ""
									}
									className="flex object-cover w-full h-full"
									showFallback
								/>
							</span>
							<UploadAvatar userId={user.id} />
						</div>
						<div className="flex flex-col items-start justify-center">
							<p className="font-medium">
								{profileData.full_name ? profileData.full_name : "Your name"}
							</p>
							<span className="text-sm text-default-800">
								{profileData.email}
							</span>
						</div>
					</div>
					<p className="text-sm text-default-800">
						The photo will be used for your profile, and will be visible to
						other users of the platform.
					</p>
				</div>

				<form
					id="profile-form"
					name="profile-form"
					className="relative w-full p-3 flex-auto flex-col [place-content:inherit] [align-items:inherit] h-auto break-words text-left overflow-y-auto subpixel-antialiased grid grid-cols-1 gap-4 md:grid-cols-2"
					action={updateProfileAction}
				>
					<Input
						label="Your Name"
						placeholder={
							profileData.full_name?.trim() === ""
								? "Your Name"
								: profileData.full_name ?? "Your Name"
						}
						className="w-full"
						name="full_name"
						labelPlacement="outside"
						defaultValue={profileData.full_name ?? undefined}
					/>
					<Input
						label="Country"
						placeholder={
							profileData.country?.trim() === ""
								? "Select country"
								: profileData.country ?? "Select country"
						}
						className="w-full"
						name="country"
						labelPlacement="outside"
						defaultValue={profileData.country ?? undefined}
					/>
					<Input
						label="State"
						placeholder={
							profileData.state?.trim() === ""
								? "Enter state"
								: profileData.state ?? "Enter state"
						}
						className="w-full"
						name="state"
						labelPlacement="outside"
						defaultValue={profileData.state ?? undefined}
					/>

					<Input
						label="City"
						placeholder={
							profileData.city?.trim() === ""
								? "Enter City"
								: profileData.city ?? "Enter City"
						}
						className="w-full"
						name="city"
						labelPlacement="outside"
						defaultValue={profileData.city ?? undefined}
					/>

					<div className="group flex flex-col group relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)] w-full">
						<div className="h-full flex flex-col">
							<label htmlFor="gender" className="text-sm block mb-[5px]">
								Select your gender
							</label>
							<div className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-10 min-h-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background">
								<div className="inline-flex w-full items-center h-full box-border">
									<Select defaultValue={profileData.gender ?? "female"}>
										<SelectTrigger className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full border-none">
											<SelectValue placeholder="Select a gender" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Fruits</SelectLabel>
												<SelectItem value="female">Female</SelectItem>
												<SelectItem value="male">Male</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</div>

					<Input
						label="Zip Code"
						placeholder={profileData.zip_code?.toString() ?? "Enter Zip Code"}
						className="w-full"
						name="zip_code"
						labelPlacement="outside"
						defaultValue={
							profileData.zip_code != null
								? profileData.zip_code.toString()
								: undefined
						}
					/>
				</form>

				<div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large mt-4 justify-end gap-2">
					<Button
						radius="full"
						color="primary"
						form="profile-form"
						type="submit"
					>
						Save Changes
					</Button>
				</div>
			</div>
		</div>
	);
}
