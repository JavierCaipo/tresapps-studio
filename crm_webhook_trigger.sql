-- =============================================================================
-- TresApps Synthetic Lab — CRM Webhook Trigger
-- File: crm_webhook_trigger.sql
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================================================


-- ─── STEP 1: Enable pg_net ────────────────────────────────────────────────────
-- pg_net ships with Supabase but must be enabled per project.
-- It allows async HTTP calls directly from PostgreSQL functions.

CREATE EXTENSION IF NOT EXISTS pg_net
  SCHEMA extensions;


-- ─── STEP 2: CRM URL Configuration ───────────────────────────────────────────
-- Store the CRM endpoint as a database-level parameter so you can update it
-- without touching the function body. Replace the value before running.
--
-- To update later:
--   ALTER DATABASE postgres
--     SET app.crm_webhook_url = 'https://your-real-crm.example.com/api/leads';

ALTER DATABASE postgres
  SET app.crm_webhook_url = 'https://your-crm-endpoint.example.com/api/leads';


-- ─── STEP 3: Trigger Function ─────────────────────────────────────────────────
-- Returns TRIGGER — required signature for PostgreSQL trigger functions.
-- SECURITY DEFINER runs as the function owner (postgres), giving it access
-- to pg_net even if the invoking role is restricted.

CREATE OR REPLACE FUNCTION public.notify_custom_crm()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public, extensions
AS $$
DECLARE
  _crm_url   TEXT;
  _payload   JSONB;
  _request_id BIGINT;
BEGIN
  -- ── 1. Read the CRM URL from the database parameter ─────────────────────
  _crm_url := current_setting('app.crm_webhook_url', true);

  IF _crm_url IS NULL OR _crm_url = '' THEN
    RAISE WARNING '[notify_custom_crm] app.crm_webhook_url is not configured. Skipping.';
    RETURN NEW;
  END IF;

  -- ── 2. Build the JSON payload from the new lead row ──────────────────────
  _payload := jsonb_build_object(
    'event',        'lead.created',
    'id',           NEW.id,
    'created_at',   NEW.created_at,
    'full_name',    NEW.full_name,
    'email',        NEW.email,
    'company_name', NEW.company_name,
    'project_idea', NEW.project_idea,
    'status',       NEW.status
  );

  -- ── 3. Fire the async HTTP POST (non-blocking) ───────────────────────────
  -- net.http_post returns a request_id; the response is stored in
  -- net._http_response and can be inspected for debugging.
  SELECT extensions.net.http_post(
    url     := _crm_url,
    body    := _payload::text,
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'X-Source',      'tresapps-synthetic-lab',
      'X-Event-Type',  'lead.created'
    )
  ) INTO _request_id;

  RAISE LOG '[notify_custom_crm] Webhook fired. request_id=% lead_id=%',
    _request_id, NEW.id;

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  -- Never let a webhook failure block the INSERT.
  RAISE WARNING '[notify_custom_crm] HTTP call failed: % — SQLSTATE: %',
    SQLERRM, SQLSTATE;
  RETURN NEW;
END;
$$;


-- ─── STEP 4: Bind the Trigger ─────────────────────────────────────────────────
-- Drop first to make this script idempotent (safe to re-run).

DROP TRIGGER IF EXISTS on_lead_created ON public.leads;

CREATE TRIGGER on_lead_created
  AFTER INSERT
  ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_custom_crm();


-- ─── STEP 5: (Optional) Inspect webhook responses ─────────────────────────────
-- After a test INSERT you can query the async response table:
--
--   SELECT id, status_code, content, error_msg, created
--   FROM net._http_response
--   ORDER BY created DESC
--   LIMIT 10;
--
-- status_code NULL = still in flight. 200/201 = success. 4xx/5xx = CRM error.
-- =============================================================================
