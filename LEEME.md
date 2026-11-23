# CV web de Manuel García

Sitio estático responsive, sin instalación ni dependencias externas.

## Tres archivos principales

- `index.html`: contenido del CV, enlaces de contacto y metadatos SEO.
- `styles.css`: diseño, adaptación a dispositivos y estilos de impresión.
- `script.js`: menú móvil, filtros, animaciones y panel de WhatsApp.

La carpeta `assets` contiene la foto original, el CV en PDF, la imagen Open Graph de 1200 × 630 píxeles y los iconos del navegador. `robots.txt` y `sitemap.xml` completan los archivos auxiliares para buscadores.

## Uso

Descomprimí el ZIP y abrí `index.html`. Para publicar, subí todos los archivos de la carpeta, incluida `assets`, a un alojamiento de sitios estáticos. No hace falta compilar ni instalar paquetes.

## Configuración y cambios

- Teléfono y WhatsApp: `+54 9 11 3009-4051`. Los enlaces usan `5491130094051`.
- Correo: `alejanpublic.dev@gmail.com`.
- Única red social: `https://www.linkedin.com/in/alejanpublic/`.
- Para actualizar el currículum descargable, reemplazá `assets/ManuelG-CV2027.pdf` conservando ese nombre.
- Los textos profesionales se editan en `index.html`; el contenido sigue siendo legible sin JavaScript.
- Los colores principales están en las variables al comienzo de `styles.css`.

## SEO y vista previa al compartir

La URL configurada es `https://manuel-garcia-cv.bushyape.chatgpt.site/`.

Si usás otro dominio o una subcarpeta, reemplazá esa URL en `index.html`, `robots.txt` y `sitemap.xml`, incluyendo las direcciones de las imágenes. Las URL de canonical, Open Graph y datos estructurados deben apuntar al alojamiento definitivo. La imagen para compartir es `assets/og-manuel-garcia.jpg`.

El HTML incluye título, descripción, canonical, etiquetas Open Graph, metadatos de tarjeta grande, datos estructurados de ProfilePage y Person, iconos y etiquetas semánticas. Las etiquetas de tarjeta grande son metadatos de vista previa; no agregan otra red social al sitio.

La vista inicial de Sites es privada. Para que buscadores, WhatsApp y LinkedIn puedan acceder al HTML y mostrar la tarjeta, el alojamiento definitivo debe ser público. Los servicios de vista previa pueden conservar una imagen anterior en caché durante un tiempo.

## Comportamiento

El botón flotante abre un panel con acceso a WhatsApp y un mensaje laboral ya preparado; la persona elige enviarlo desde WhatsApp. Los filtros permiten ver cuatro experiencias en caja y atención o dos experiencias de otras áreas. Las animaciones respetan la preferencia de reducir movimiento.

## Mejoras incorporadas

- Galería de tres comprobantes: cajero bancario, Argentina Programa 4.0 y secundario convalidado.
- Vista ampliada accesible con cierre mediante Escape, botón o clic fuera del documento, y descarga individual.
- CV descargable actualizado desde `Pdf-cv/ManuelG-Cv-(descargas).pdf`.
- WhatsApp con motivos de contacto, mensaje editable y enlace al número configurado. El visitante confirma el envío en WhatsApp.
- Tarjetas, galería y panel adaptables a pantallas pequeñas; animaciones compatibles con reducción de movimiento.
- Los comprobantes están en `assets/certificado-*.png`.
