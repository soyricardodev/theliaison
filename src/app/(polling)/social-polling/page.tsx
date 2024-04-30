import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "~/utils/supabase/server";
import { SearchForm } from "../_components/search-form";
import { PollCard } from "../_components/poll-card";

export default async function SocialPollingPage() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    toast.message("Login to enjoy the full experience");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  const pollsWithOptionsQuery = supabase.from("polls").select(
    `
		    id,
				question,
				options (id, text, votes)
			`,
  );

  const { data, error: pollsError } = await pollsWithOptionsQuery;

  console.log(data, pollsError);

  return (
    <main className="flex-1 overflow-auto">
      <div className="relative mb-4 flex items-center justify-center py-[26vh] pt-[18vh] text-gray-900 sm:pt-[26vh]">
        <div className="relative flex w-full flex-col items-center gap-6 px-6 text-center">
          <div className="flex w-full flex-col items-center gap-1.5">
            <h2 className="text-4xl font-heading font-medium tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
              Ask The Liaison.
            </h2>
            <p>Sharing collective insights and perspectives.</p>
          </div>
          {/* Search form */}
          <div className="z-10 m-auto flex w-full flex-col divide-zinc-600 overflow-hidden rounded-xl bg-gray-900 shadow-lg shadow-black/40 sm:max-w-xl">
            <SearchForm />
          </div>
          {/* End search form */}

          {/* Categories */}
          <div className="absolute top-full mx-auto mt-6 flex max-w-full flex-wrap items-center justify-center gap-2 whitespace-nowrap px-4 text-sm">
            {categories != null
              ? categories.map((category, idx) => (
                  <CategoryButton key={idx} name={category.name} />
                ))
              : null}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col px-6 pb-20">
        <div className="grid gap-4">
          <h2 className="text-4xl font-semibold">Explore</h2>
          <div className="grid gap-6">
            <div className="grid auto-cols-[minmax(0,_1fr)]">
              <div className="col-start-1 row-start-1">
                <ul className="mx-auto grid w-full grid-cols-[repeat(auto-fit,_minmax(296px,1fr))] gap-4">
                  {data != null
                    ? data.map((poll, idx) => (
                        <li
                          key={`${poll.id}-${idx}`}
                          className="space-y-4 w-full"
                        >
                          <Link href={`/social-polling/${poll.id}`}>
                            <PollCard
                              question={poll.question}
                              options={poll.options}
                            />
                          </Link>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CategoryButton({ name }: { name: string }) {
  return (
    <button className="inline-flex select-none items-center gap-1 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-2 py-0.5 transition-colors hover:border-zinc-800">
      {name}
      <MoveUpRight width={15} height={15} />
    </button>
  );
}
