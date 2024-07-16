"use client";

import { Button } from "@theliaison/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { Input } from "@theliaison/ui/input";
import { Label } from "@theliaison/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import { Textarea } from "@theliaison/ui/textarea";
import { ChevronLeftIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { createClient } from "~/supabase/client";

export default function CreateProduct() {
	const [productName, setProductName] = React.useState("");
	const [productDescription, setProductDescription] = React.useState("");
	const [productPrice, setProductPrice] = React.useState("");
	const [productCategory, setProductCategory] = React.useState("");
	const [productImage, setProductImage] = React.useState("");

	const supabase = createClient();

	return (
		<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Button variant="outline" size="icon" className="h-7 w-7">
					<ChevronLeftIcon className="h-4 w-4" />
					<span className="sr-only">Back</span>
				</Button>
				<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
					Create Product
				</h1>
				<div className="flex items-center gap-2 ml-auto md:flex">
					<Button variant="outline" size="sm">
						Discard
					</Button>
					<Button size="sm">Save Product</Button>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
				<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<Card>
						<CardHeader>
							<CardTitle>Product Details</CardTitle>
							<CardDescription>
								Enter the details of your new product
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="name">Name (required)</Label>
									<Input
										id="name"
										type="text"
										className="w-full"
										placeholder="Enter product name"
										value={productName}
										required
										onChange={(e) => setProductName(e.target.value)}
									/>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										placeholder="Enter product description"
										className="min-h-32"
										value={productDescription}
										onChange={(e) => setProductDescription(e.target.value)}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Product Images</CardTitle>
							<CardDescription>
								Upload images for your new product
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-2">
								<Image
									alt="Product"
									className="aspect-square w-full rounded-md object-cover"
									height="300"
									src="/placeholder.svg"
									width="300"
								/>
								<div className="grid grid-cols-3 gap-2">
									<button type="button">
										<Image
											alt="Product"
											className="aspect-square w-full rounded-md object-cover"
											height="84"
											src="/placeholder.svg"
											width="84"
										/>
									</button>
									<button type="button">
										<Image
											alt="Product"
											className="aspect-square w-full rounded-md object-cover"
											height="84"
											src="/placeholder.svg"
											width="84"
										/>
									</button>
									<button
										type="button"
										className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
									>
										<UploadIcon className="h-4 w-4 text-muted-foreground" />
										<span className="sr-only">Upload</span>
									</button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Card>
						<CardHeader>
							<CardTitle>
								<Label htmlFor="price">Price (required)</Label>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-3">
								<Input
									id="price"
									type="number"
									className="w-full"
									placeholder="Enter product price"
									value={productPrice}
									onChange={(e) => setProductPrice(e.target.value)}
								/>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Product Category</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6 sm:grid-cols-3">
								<div className="grid gap-3l">
									<Label htmlFor="category">Category</Label>
									<Select>
										<SelectTrigger id="category" aria-label="Select category">
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="her">For Her</SelectItem>
											<SelectItem value="him">For Him</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
