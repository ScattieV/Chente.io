# Web Chente — Daniel Valhalus Tattoos

Portfolio web de presentación para Daniel Valhalus.

## Cómo agregar las fotos

### Foto del artista (sección "Sobre mí")
- Coloca la foto en: `images/hero/artist.jpg`
- Proporción ideal: vertical (3:4), ej. 600×800 px

### Imagen de fondo del hero
- Coloca la imagen en: `images/hero/hero-bg.jpg`
- Resolución mínima recomendada: 1920×1080 px

### Galería de tatuajes
1. Coloca las fotos en: `images/gallery/`
2. Nombra los archivos: `tattoo-01.jpg`, `tattoo-02.jpg`, etc.
3. Para agregar más fotos, abre `index.html` y copia uno de los bloques `.gallery-item` dentro de `#galleryGrid`
4. Cambia `data-category` a: `blackwork`, `realismo`, `geometrico` o `tradicional`

### Agregar item featured (foto grande)
Agrega la clase `featured` al div para que ocupe 2 filas de altura:
```html
<div class="gallery-item featured" data-category="blackwork">
```

## Pasos finales antes de publicar
- [ ] Reemplaza el email en `script.js` (línea final) con el email real de Chente
- [ ] Agrega número de WhatsApp en el bloque comentado de `index.html`
- [ ] Ajusta los números de estadísticas en la sección "Sobre mí"
- [ ] Sube todas las fotos descargadas del Instagram
