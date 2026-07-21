import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = await createClient();

  const admin = await requireAdmin(supabase);

  return Response.json({
    isAdmin: !!admin,
  });
}