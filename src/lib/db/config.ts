/** Supabase được bật khi có URL + service role key trên server */
export function isSupabaseEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

export function getDatabaseMode(): "supabase" | "sqlite" {
  return isSupabaseEnabled() ? "supabase" : "sqlite";
}
