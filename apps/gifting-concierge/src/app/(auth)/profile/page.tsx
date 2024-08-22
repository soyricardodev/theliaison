import { Avatar, Button } from "@nextui-org/react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import { Input } from "@theliaison/ui/input";
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
			<div className="flex flex-col relative overflow-hidden h-auto text-black box-border bg-white/30 backdrop-blur-2xl outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-xl p-2">
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
							<span className="text-sm text-black">
								{profileData.email}
							</span>
						</div>
					</div>
					<p className="text-sm text-black">
						The photo will be used for your profile, and will be visible to
						other users of the platform.
					</p>
				</div>

				<form
					id="profile-form"
					name="profile-form"
					className="relative w-full p-3 flex-auto flex-col [place-content:inherit] [align-items:inherit] h-auto break-words text-left text-black overflow-y-auto subpixel-antialiased grid grid-cols-1 gap-4 md:grid-cols-2"
					action={updateProfileAction}
				>
					<div className="flex flex-col">
						<label htmlFor="name" className="text-sm block mb-[5px]">
							Your Name
						</label>
						<Input
							placeholder={
								profileData.full_name?.trim() === ""
									? "Your Name"
									: profileData.full_name ?? "Your Name"
							}
							className="bg-white rounded-medium h-10"
							name="full_name"
							defaultValue={profileData.full_name ?? undefined}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="country" className="text-sm block mb-[5px]">
							Country
						</label>
						<Input
							placeholder={
								profileData.country?.trim() === ""
									? "Country"
									: profileData.country ?? "Enter Country"
							}
							className="bg-white rounded-medium h-10"
							name="country"
							defaultValue={profileData.country ?? undefined}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="state" className="text-sm block mb-[5px]">
							State
						</label>
						<Input
							placeholder={
								profileData.state?.trim() === ""
									? "Enter State"
									: profileData.state ?? "Enter State"
							}
							className="bg-white rounded-medium h-10"
							name="state"
							defaultValue={profileData.state ?? undefined}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="city" className="text-sm block mb-[5px]">
							City
						</label>
						<Input
							placeholder={
								profileData.city?.trim() === ""
									? "Enter City"
									: profileData.city ?? "Enter City"
							}
							className="bg-white rounded-medium h-10"
							name="city"
							defaultValue={profileData.city ?? undefined}
						/>
					</div>

					<div className="group flex flex-col group relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)] w-full">
						<div className="h-full flex flex-col">
							<label htmlFor="gender" className="text-sm block mb-[5px]">
								Select your gender
							</label>
							<div className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-white data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-10 min-h-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background">
								<div className="inline-flex w-full items-center h-full box-border">
									<Select defaultValue={profileData.gender ?? "female"}>
										<SelectTrigger className="w-full font-normal bg-transparent !outline-none placeholder:text-black focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full border-none">
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

					<div className="flex flex-col">
						<label htmlFor="zip_code" className="text-sm block mb-[5px]">
							Zip Code
						</label>
						<Input
							placeholder={
								profileData.zip_code?.toString() === ""
									? "Enter Zip Code"
									: profileData.zip_code?.toString() ?? "Enter Zip Code"
							}
							className="bg-white rounded-medium h-10"
							name="zip_code"
							defaultValue={profileData.zip_code ?? undefined}
						/>
					</div>
				
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
