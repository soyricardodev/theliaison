import { createClient } from "~/utils/supabase/server";
import { HeaderNavigation } from "./header-navigation";

export async function HeaderUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) return <HeaderNavigation isLoggedIn={false} />;

  const { data: userData, error: userDataError } = await supabase
    .from("users")
    .select("full_name, username, avatar_url")
    .eq("id", user.id)
    .single();

  if (!userData || userDataError)
    return <HeaderNavigation isLoggedIn={false} />;

  return <HeaderNavigation isLoggedIn={true} {...userData} />;
}
