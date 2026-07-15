import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSupabaseUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!rawUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }

  try {
    const url = new URL(rawUrl);
    const pathname = url.pathname.replace(/\/+$/, "");

    if (pathname === "/rest/v1" || pathname.endsWith("/rest/v1")) {
      return url.origin;
    }

    return `${url.origin}${pathname}`;
  } catch {
    return rawUrl.replace(/\/+$/, "").replace(/\/rest\/v1\/?$/, "");
  }
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    getSupabaseUrl(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
