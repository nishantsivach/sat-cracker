import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin-client";
import { requireAdmin } from "@/utils/supabase/admin";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = searchParams.get("status");
  const plan = searchParams.get("plan");
  const search = searchParams.get("search");

  let userIdFilter: string[] | null = null;

  if (search) {
    const { data: matchingProfiles } = await supabase
      .from("profiles")
      .select("id")
      .ilike("full_name", `%${search}%`);

    userIdFilter = (matchingProfiles ?? []).map((p) => p.id);
    if (userIdFilter.length === 0) {
      return new Response(JSON.stringify({ subscriptions: [], totalCount: 0 }), { status: 200 });
    }
  }

  let query = supabase
    .from("subscription")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false });

  if (status && status !== "all") query = query.eq("status", status);
  if (plan && plan !== "all") query = query.eq("plan", plan);
  if (userIdFilter) query = query.in("user_id", userIdFilter);

  const from = (page - 1) * PAGE_SIZE;
  const { data, count, error } = await query.range(from, from + PAGE_SIZE - 1);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const subs = data ?? [];
  const userIds = subs.map((s) => s.user_id);

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", userIds.length ? userIds : ["00000000-0000-0000-0000-000000000000"]);

  const nameById = new Map((profiles ?? []).map((p) => [p.id, p.full_name]));


  const adminClient = createAdminClient();
  const emailById = new Map<string, string>();
  await Promise.all(
    userIds.map(async (id) => {
      const { data } = await adminClient.auth.admin.getUserById(id);
      if (data.user?.email) emailById.set(id, data.user.email);
    }),
  );

  const enriched = subs.map((s) => ({
    ...s,
    full_name: nameById.get(s.user_id) ?? null,
    email: emailById.get(s.user_id) ?? null,
  }));

  return new Response(JSON.stringify({ subscriptions: enriched, totalCount: count ?? 0 }), { status: 200 });
}