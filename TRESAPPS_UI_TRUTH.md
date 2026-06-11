# TRESAPPS SYNTHETIC LAB - UI CORE TRUTH
**Última actualización:** Junio 2026
**Objetivo:** Mantener una estética "2040 Pro-Level" (Minimalismo Dark, Glassmorphism, Neon Glows).

## 1. REGLAS ESTRICTAS DE DISEÑO (Prohibido usar valores genéricos)
- **Fondo Global:** Estrictamente `#0A0A0B` (neutral). NUNCA usar blancos o grises claros.
- **Tipografía Hero:** Manrope. Tamaños extremos (`text-7xl` a `text-9xl`). OBLIGATORIO usar `font-black` (weight 900) y tracking negativo (`tracking-tighter`) para titulares principales.
- **Tipografía Body:** Inter. Tamaños legibles (`text-base` a `text-xl`), color `text-on-surface-variant` (gris/plata) con `leading-relaxed`.
- **Texto Gradiente (El ADN):** Cualquier texto destacado (ej. "real SaaS") DEBE usar: `text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6]`. NUNCA usar color sólido.
- **Assets de Marca (HD):** La marca utiliza assets estáticos de alta fidelidad 3D (ej. `logo-tresapps.png` e `icon.png` ubicados en `/public` y `/src/app`) gestionados estrictamente vía `next/image`. Queda prohibido el uso de SVGs vectoriales simples generados por código para los identificadores principales.
- **Branding Escalar:** El logotipo en la navegación debe proyectar lujo masivo. Las dimensiones responsivas estandarizadas son `h-10` para móviles y `md:h-14` para desktop, acompañadas de márgenes asimétricos o `py-3 md:py-4` en su contenedor.

## 2. RECETAS VISUALES (Copiar y pegar estas clases exactas)
- **Ambient Glows (Neones de fondo):** `absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none`.
- **Glassmorphism (Tarjetas y Paneles):** `bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-2xl`. (Nunca usar fondos sólidos opacos para las tarjetas).
- **Active Neon Border (Tarjeta Central):** `border-[#8B5CF6]/50 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)]`.

## 3. INSTRUCCIONES PARA EL AGENTE DE IA
1. **ANTES DE ESCRIBIR CÓDIGO:** Debes leer obligatoriamente este archivo.
2. **AL MODIFICAR UI:** Aplica las recetas visuales de la Sección 2. No inventes clases de Tailwind nuevas para las tarjetas o textos principales.
3. **ACTUALIZACIÓN CONTINUA:** Si creamos un nuevo componente validado (ej. una tabla de datos futurista), tienes la obligación de registrar las clases base de ese componente en este archivo.