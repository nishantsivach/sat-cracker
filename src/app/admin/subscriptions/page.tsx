import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin-client";
import SubscriptionsList from "./SubscriptionsList";

const PAGE_SIZE = 20;

export default async function AdminSubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string; plan?: string }>;
}) {
  const { page, search, status, plan } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = await createClient();

  // Get current admin user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  let userIdFilter: string[] | null = null;
  if (search) {
    const { data: matchingProfiles } = await supabase
      .from("profiles")
      .select("id")
      .ilike("full_name", `%${search}%`);
    userIdFilter = (matchingProfiles ?? []).map((p) => p.id);
  }

  let query = supabase
    .from("subscription")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false });

  if (status && status !== "all") query = query.eq("status", status);
  if (plan && plan !== "all") query = query.eq("plan", plan);
  if (userIdFilter)
    query = query.in("user_id", userIdFilter.length ? userIdFilter : ["00000000-0000-0000-0000-000000000000"]);

  const from = (currentPage - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

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
    })
  );

  const subscriptions = subs.map((s) => ({
    ...s,
    full_name: nameById.get(s.user_id) ?? null,
    email: emailById.get(s.user_id) ?? null,
  }));

  return (
    <SubscriptionsList
      subscriptions={subscriptions}
      totalCount={count ?? 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      search={search ?? ""}
      status={status ?? "all"}
      plan={plan ?? "all"}
      currentUserId={currentUserId}
    />
  );
}