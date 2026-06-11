"use server";

import { supabase } from "@/lib/supabase/client";
import type { LeadInsert } from "@/lib/supabase/types";

// ─── Return type ──────────────────────────────────────────────────────────────

type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string };

// ─── Input validation ─────────────────────────────────────────────────────────

function extractString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim();
}

// ─── Server Action ────────────────────────────────────────────────────────────

/**
 * submitLead
 *
 * Receives a FormData payload from the contact form and inserts a new row
 * into the `leads` table in Supabase.
 *
 * Fields consumed:
 *   - full_name     (required)
 *   - email         (required, unique-constrained in DB)
 *   - company_name  (optional)
 *   - project_idea  (optional)
 */
export async function submitLead(
  formData: FormData
): Promise<SubmitLeadResult> {
  // ── 1. Extract & validate inputs ──────────────────────────────────────────
  const full_name = extractString(formData, "full_name");
  const email = extractString(formData, "email");
  const company_name = extractString(formData, "company_name") || null;
  const project_idea = extractString(formData, "project_idea") || null;

  if (!full_name) {
    return { success: false, error: "Full name is required." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "A valid email address is required." };
  }

  // ── 2. Build typed insert payload ─────────────────────────────────────────
  const payload: LeadInsert = {
    full_name,
    email,
    company_name,
    project_idea,
    status: "new",
  };

  // ── 3. Insert into Supabase ───────────────────────────────────────────────
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from("leads").insert(payload as any);

    if (error) {
      // Handle unique email constraint violation gracefully
      if (error.code === "23505") {
        return {
          success: false,
          error: "This email is already registered. We'll be in touch!",
        };
      }

      console.error("[submitLead] Supabase error:", error.message);
      return { success: false, error: "Failed to submit. Please try again." };
    }

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[submitLead] Unexpected error:", message);
    return { success: false, error: message };
  }
}
