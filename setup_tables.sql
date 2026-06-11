-- Activar la extensión para generar UUIDs si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla: leads
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL UNIQUE,
    project_idea TEXT,
    status TEXT DEFAULT 'new'
);

-- Tabla: project_metrics
CREATE TABLE public.project_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    project_id TEXT NOT NULL,
    cost_reduction_percentage NUMERIC,
    workflow_velocity_multiplier NUMERIC,
    global_reach_users NUMERIC
);

-- Habilitar Row Level Security (RLS) opcionalmente por buenas prácticas
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_metrics ENABLE ROW LEVEL SECURITY;

-- Crear políticas básicas para permitir inserciones desde el cliente (anónimo/autenticado)
-- (Estas políticas asumen que vas a usar el anon key de Supabase para insertar leads)
CREATE POLICY "Enable insert for all users" ON public.leads
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON public.project_metrics
    FOR SELECT
    USING (true);
