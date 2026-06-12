# TRESAPPS SYNTHETIC LAB - UI CORE TRUTH
**Última actualización:** Junio 2026
**Objetivo:** Mantener una estética "2040 Pro-Level" (Minimalismo Dark, Glassmorphism, Neon Glows).

## 1. REGLAS ESTRICTAS DE DISEÑO (Prohibido usar valores genéricos)
- **Fondo Global:** Estrictamente `#0A0A0B` (neutral). NUNCA usar blancos o grises claros.
- **Tipografía Hero:** Manrope. Tamaños extremos (`text-7xl` a `text-9xl`). OBLIGATORIO usar `font-black` (weight 900) y tracking negativo (`tracking-tighter`) para titulares principales.
- **Tipografía Body:** Inter. Tamaños legibles (`text-base` a `text-xl`), color `text-on-surface-variant` (gris/plata) con `leading-relaxed`.
- **Texto Gradiente (El ADN):** Cualquier texto destacado (ej. "real SaaS") DEBE usar: `text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6]`. NUNCA usar color sólido.
- **Assets de Marca (HD):** La marca utiliza assets estáticos de alta fidelidad 3D (ej. `logo-tresapps.png` e `icon.png` ubicados en `/public` y `/src/app`) gestionados estrictamente vía `next/image`. Queda prohibido el uso de SVGs vectoriales simples generados por código para los identificadores principales. Queda estrictamente prohibido el uso de archivos heredados `.ico` en el ecosistema; la marca se sirve exclusivamente a través de `.png` o `.webp` manejados dinámicamente por el objeto metadata con cache busting (`?v=2`).
- **Branding Escalar e Integración Quirúrgica:** El logotipo en la navegación debe proyectar autoridad masiva (`h-10` en móviles, `md:h-[72px]` en desktop). Para eliminar rectángulos de render oscuro en assets 3D, el logo debe estar envuelto en un contenedor de enmascaramiento (`rounded-full px-4 py-1 bg-black/50 backdrop-blur-sm`) y aplicarse la clase `mix-blend-lighten` directamente a la etiqueta `<Image>`, integrándolo de forma nativa con el fondo del navbar.

## 2. RECETAS VISUALES (Copiar y pegar estas clases exactas)
- **Ambient Glows (Neones de fondo):** `absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none`.
- **Glassmorphism (Tarjetas y Paneles):** `bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-2xl`. (Nunca usar fondos sólidos opacos para las tarjetas).
- **Active Neon Border (Tarjeta Central):** `border-[#8B5CF6]/50 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)]`.

## 3. INSTRUCCIONES PARA EL AGENTE DE IA
1. **ANTES DE ESCRIBIR CÓDIGO:** Debes leer obligatoriamente este archivo.
2. **AL MODIFICAR UI:** Aplica las recetas visuales de la Sección 2. No inventes clases de Tailwind nuevas para las tarjetas o textos principales.
3. **ACTUALIZACIÓN CONTINUA:** Si creamos un nuevo componente validado (ej. una tabla de datos futurista), tienes la obligación de registrar las clases base de ese componente en este archivo.
4. **ANIMACIONES PROFUNDAS (2040):** Motion must simulate energy flow and holographic depth. Utiliza GSAP para conteos y flujos de energía (stroke-dashoffset), y Framer Motion con `perspective` para rotaciones espaciales en 3D o pseudo-escaneos con luz.
5. **REGLAS DE ESCALADO CINEMÁTICO (SHOWCASE):** Al hacer expansiones de secciones clave con GSAP (ej. CinematicShowcase), nunca uses `100vw/100vh` absoluto ni pierdas el radio de los bordes. Utiliza escala controlada (ej. `90vw/85vh` y `borderRadius: 24px`) para mantener proporción. Además, implementa siempre una táctica de fuga (fadeOut/blur) al terminar el timeline de scroll para devolver el protagonismo al contenido.
6. **SCROLLYTELLING Y PIPELINES:** Los procesos de varios pasos deben utilizar pinning horizontal y scrub en GSAP (`pin: true`, `scrub: 1`, `end: "+=150%"`) para garantizar la retención de lectura progresiva y la ignición secuencial de nodos a través del scroll del usuario.
7. **MUTACIÓN DIMENSIONAL:** Las líneas de tiempo complejas deben mutar del eje X al eje Y en viewports menores a 768px utilizando `gsap.matchMedia()`. En desktop: pin horizontal con scrub. En móvil: sin pin, con línea SVG vertical que crece (`scaleY`) y nodos que se ignitan individualmente por interseccion (ScrollTrigger por nodo).