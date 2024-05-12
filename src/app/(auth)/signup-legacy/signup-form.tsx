"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "~/components/ui/command";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { countries } from "~/utils/countries";
import { type SignUp, signUpSchema } from "~/utils/validators/auth";
import { signup, signupLean } from "../actions";

export function SignupForm() {
	const [state, formAction] = useFormState(signup, {
		message: "",
	});

	const router = useRouter();

	const form = useForm<SignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			username: "",
			gender: "female",
			dob: new Date("1/1/2000"),
			maritalStatus: "single",
			country: "US",
			city: "",
			...(state?.fields ?? {}),
		},
		mode: "onChange",
	});

	const formRef = useRef<HTMLFormElement | null>(null);

	const { pending } = useFormStatus();

	async function onSubmit(data: SignUp) {
		const profileData = await signupLean({ ...data });

		if (profileData) {
			router.push(`/${data.username}`);
		}
	}

	return (
		<Form {...form}>
			<form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
					name="username"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="john2doe" {...field} />
							</FormControl>
							<FormDescription>
								Your username just can contain numbers and letters and
								underscores.
							</FormDescription>
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
								<Input
									type="email"
									placeholder="johndoe@example.com"
									{...field}
								/>
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
								<Input type="password" placeholder="********" {...field} />
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
					name="dob"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col gap-2">
							<FormLabel>Date of birth</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn(
												"pl-3 text-left font-normal rounded-none",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto size-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										fromYear={1900}
										toYear={2005}
										initialFocus
										captionLayout="dropdown-buttons"
									/>
								</PopoverContent>
							</Popover>
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
					name="maritalStatus"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Relationship Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select your marital status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="single">Single</SelectItem>
									<SelectItem value="married">Married</SelectItem>
									<SelectItem value="divorced">Divorced</SelectItem>
									<SelectItem value="widowed">Widowed</SelectItem>
									<SelectItem value="separated">Separated</SelectItem>
									<SelectItem value="in relationship">
										In Relationship
									</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>Select your Marital Status.</FormDescription>
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
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input placeholder="Nothing hill" {...field} />
							</FormControl>
							<FormDescription>Write your city</FormDescription>
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
