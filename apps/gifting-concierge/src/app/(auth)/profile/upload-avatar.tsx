"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { createClient } from "~/supabase/client";

export function UploadAvatar({ userId }: { userId: string }) {
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		const supabase = createClient();
		const id = nanoid();

		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(`${id}-${file.name}`, file, {
				contentType: file.type,
			});

		console.log({ data, error });

		await supabase
			.from("users")
			.update({
				avatar_url: `avatars/${data?.path}`,
			})
			.eq("id", userId);

		router.refresh();
	};

	return (
		<button
			type="button"
			onClick={() => inputRef.current?.click()}
			className="flex z-10 flex-wrap absolute box-border rounded-full whitespace-nowrap place-content-center origin-center items-center select-none font-regular scale-100 opacity-100 subpixel-antialiased data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0 px-1 text-small border-transparent border-0 bg-primary text-primary-foreground bottom-[10%] right-[10%] translate-x-1/2 translate-y-1/2 w-5 h-5"
		>
			<label className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny rounded-full !gap-0 transition-transform-colors-opacity motion-reduce:transition-none bg-transparent data-[hover=true]:bg-default/40 min-w-8 w-8 h-8 p-0 text-primary-foreground">
				<input
					type="file"
					accept="image/*"
					onChange={handleChange}
					hidden
					className="hidden"
					ref={inputRef}
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					role="img"
					className="iconify iconify--solar"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
				>
					<g fill="none" stroke="currentColor" strokeWidth="1.5">
						<path strokeLinecap="round" d="M4 22h16" />
						<path d="m13.888 3.663l.742-.742a3.146 3.146 0 1 1 4.449 4.45l-.742.74m-4.449-4.448s.093 1.576 1.483 2.966c1.39 1.39 2.966 1.483 2.966 1.483m-4.449-4.45L7.071 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-.875 2.626m14.08-8.13l-6.817 6.817c-.462.462-.692.692-.947.891c-.3.234-.625.435-.969.599c-.291.139-.601.242-1.22.448l-2.626.876m0 0l-.641.213a.848.848 0 0 1-1.073-1.073l.213-.641m1.501 1.5l-1.5-1.5" />
					</g>
				</svg>
			</label>
		</button>
	);
}
