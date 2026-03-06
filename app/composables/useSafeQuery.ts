import type { PostgrestResponse } from "@supabase/supabase-js";

export async function safeQuery<T>(
  query: Promise<PostgrestResponse<T>>,
): Promise<T[] | null> {
  try {
    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Query failed:", err);
    return null;
  }
}
