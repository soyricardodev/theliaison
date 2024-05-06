"use client";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signup } from "../actions";
import { signUpSchema, type SignUp } from "~/utils/validators/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "~/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";

import { countries } from "~/utils/countries";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { ScrollArea } from "~/components/ui/scroll-area";

export function SignupForm() {
	const [state, formAction] = useFormState(signup, {
		message: "",
	});

	const form = useForm<SignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			username: "",
			gender: "female",
			age: 0,
			maritalStatus: "single",
			country: "",
			city: "",
			...(state?.fields ?? {}),
		},
		mode: "onChange",
	});

	const formRef = useRef<HTMLFormElement | null>(null);

	const { pending } = useFormStatus();

	return (
		<Form {...form}>
			<form
				ref={formRef}
				className="grid gap-4"
				action={formAction}
				onSubmit={(evt) => {
					evt.preventDefault();
					form.handleSubmit(() => {
						formAction(new FormData(formRef.current!));
					})(evt);
				}}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormDescription>Your full name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="johndoe@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="********" {...field} />
							</FormControl>
							<FormDescription>
								Set a password for your account.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Age</FormLabel>
							<FormControl>
								<Input placeholder="18" {...field} />
							</FormControl>
							<FormDescription>
								You must be at least 18 years old.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Gender</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a gender" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="male">Male</SelectItem>
									<SelectItem value="female">Female</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>Select your gender.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col gap-2">
							<FormLabel>Country</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											role="combobox"
											className="rounded-md h-10 flex justify-between items-center"
										>
											{field.value
												? countries.find(
														(country) => country.isoCode === field.value,
													)?.label
												: "Select a country"}
											<ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent>
									<Command>
										<ScrollArea className="h-52">
											<CommandInput placeholder="Search for a country" />
											<CommandEmpty>No countries found.</CommandEmpty>
											<CommandGroup>
												{countries.map((country) => (
													<CommandItem
														key={country.isoCode}
														onSelect={() =>
															form.setValue("country", country.isoCode)
														}
													>
														<CheckIcon
															className={cn(
																"mr-2 h-4 w-4",
																country.isoCode === field.value
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>

														{country.label}
													</CommandItem>
												))}
											</CommandGroup>
										</ScrollArea>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={pending}>
					Signup
				</Button>
			</form>
		</Form>
	);
}
