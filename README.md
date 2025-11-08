
# Aplicación SmartTV OTT - Prueba técnica

Aplicación Angular 9 con reproductor nativo HTML5 y navegación en carrusel pensada para SmartTV y plataformas OTT.

## Stack tecnológico

- Angular 9.1.0
- TypeScript 3.8
- Node.js 10.x - 12.x
- SCSS para estilos
- API de video HTML5

## Instrucciones de instalación

### Requisitos previos

- Node.js (versión 10.x a 12.x)
- npm (versión 6.x o superior)

### Instalación

1. Abrir el proyecto:

```bash
cd smarttv-ott-app
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

### Compilar para producción

Para crear una build de producción con compatibilidad ES5:

```bash
npm run build-es5
```

## Estructura del proyecto

```text
smarttv-ott-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── carousel/              # Componente de carrusel horizontal
│   │   │   ├── content-card/          # Tarjeta individual de contenido
│   │   │   └── video-player/          # Reproductor HTML5
│   │   ├── models/
│   │   │   └── content.model.ts       # Interfaces TypeScript
│   │   ├── services/
│   │   │   └── content.service.ts     # Servicio de gestión de contenido
│   │   ├── app.component.*            # Componente raíz de la aplicación
│   │   └── app.module.ts              # Configuración del módulo Angular
│   ├── environments/                   # Configuración de entornos
│   ├── styles/                         # Estilos globales SCSS
│   └── index.html                      # Plantilla HTML
├── angular.json                        # Configuración del CLI de Angular
├── tsconfig.json                       # Configuración de TypeScript (target ES5)
└── package.json                        # Dependencias y scripts
```

## Características implementadas

### 1. Componente de navegación (Carrusel)

- Carrusel horizontal con transiciones suaves
- Botones de navegación Anterior/Siguiente
- Indicadores visuales que muestran la posición actual
- Soporte para múltiples elementos de contenido
- TODO: Navegación con teclas de flecha del teclado

### 2. Componente reproductor de vídeo

- Elemento de vídeo nativo HTML5
- Controles de Reproducir/Pausa
- Búsqueda/arrastre en la línea de tiempo
- Control de volumen
- Detección de buffering
- Visualización de tiempo (actual/total)
- Controles que se ocultan automáticamente
- TODO: Atajos de teclado (espacio, flechas, Esc)

### 3. Componente tarjeta de contenido

- Diseño en tarjetas para el contenido
- Visualización de miniatura (thumbnail)
- Título del contenido y metadatos
- Estado hover con overlay de botón de reproducción
- Visualización de puntuación
- TODO: Lazy loading de imágenes

### 4. Servicio de contenido

- Datos mock con contenido realista
- Agrupación por categorías (Trending, Nature, Featured)
- Recuperación de contenido por ID
- TODO: Integración con una API real

## Desafíos técnicos - Tareas a completar

Las secciones marcadas con `// TODO:` requieren implementación. Tiempo estimado total: **5-10 horas**.

### Mejoras del reproductor de vídeo

Ubicado en: `src/app/components/video-player/`

- Implementar manejo de eventos de teclado (espacio, flechas, control de volumen)
- Implementar manejador de errores de carga de vídeo
- Añadir selector de calidad (720p, 1080p, 4K)
- Añadir control de velocidad de reproducción (0.5x, 1x, 1.5x, 2x)
- Añadir selector de subtítulos/pistas de audio
- Añadir tracking de eventos para analítica

### Mejoras del componente carrusel

Ubicado en: `src/app/components/carousel/`

- Añadir navegación por teclado (flecha izquierda/derecha)
- Implementar animaciones de desplazamiento suaves
- Añadir auto-scroll con timeout configurable
- Mejorar la lógica del carrusel para tamaños responsivos
- Añadir funcionalidad de loop

### Mejoras en las tarjetas de contenido

Ubicado en: `src/app/components/content-card/`

- Implementar lazy loading para imágenes
- Añadir manejo de errores para miniaturas faltantes
- Añadir efectos de animación para estados hover desde control remoto
- Mejorar estilos de la tarjeta para distintos tamaños de pantalla
- Añadir esqueleto de carga mientras la imagen se carga

### Mejoras globales y de layout

Ubicado en: `src/app/` y `src/styles/`

- Añadir manejo global de atajos de teclado
- Implementar manejo de eventos de control remoto
- Añadir estilos de foco (focus ring) para navegación por remoto
- Implementar breakpoints responsivos
- Añadir transiciones suaves para cambios de página
- Añadir comportamiento de desplazamiento suave para el carrusel

### Servicio y gestión de estado

Ubicado en: `src/app/services/`

- Reemplazar datos mock por llamadas a API reales (puedes usar json server para no hacer trabajo adicional den backend)
- Implementar paginación para grandes catálogos de contenido
- Añadir capacidades de filtrado y ordenación
- Añadir motor de recomendaciones
- Implementar funcionalidad de favoritos/lista para ver

## Tiempo estimado de la prueba

La prueba está pensada para dedicarle entre 5 y 10 horas para que no dediques más tiempo del necesario. **No es imprescindible terminar todas las tareas** prioriza según tu criterio. Si, durante la prueba, encuentras cosas que quieres arreglar, mejorar o extender siéntete libre de hacerlo.

## Guía de estilo de código

- Seguir la guía de estilo de Angular
- Usar TypeScript en modo estricto para seguridad de tipos
- Usar SCSS con anidamiento para estilos mantenibles
- Los archivos de componentes deberían estar en carpetas individuales
- Usar nombres de variables y funciones significativos
- Añadir comentarios para lógica compleja

## Compatibilidad con navegadores

La aplicación está configurada para funcionar en:

- Chrome 40+ (Samsung Tizen, Android TV)
- Safari 9+ (Apple TV)
- Firefox 35+
- Edge 12+

## Solución de problemas

### Puerto 4200 ya en uso

```bash
ng serve --port 4300
```

### Errores de módulo no encontrado

```bash
rm -rf node_modules package-lock.json
npm install
```

### Errores de compilación de TypeScript

Asegúrate de que `tsconfig.json` tenga el target establecido a "es5"

## Fuentes de vídeo usadas en la demo

La demo incluye vídeos de ejemplo del repositorio Google Test Media:

- Big Buck Bunny
- Elephant's Dream
- For Bigger Blazes
- For Bigger Escapes
- For Bigger Fun
- Sintel

Estos son provistos por Google para fines de prueba.
