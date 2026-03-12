# El Violín de Ceci — proyecto listo para GitHub

Sitio estático optimizado para GitHub Pages con estas rutas:

- `/` → home rediseñada
- `/booking/` → landing de reserva
- `/test/` → test para novios original
- `/reviews/` → testimonios y reseñas original

## Qué se mejoró

- contacto mucho más visible
- WhatsApp flotante
- sección de prensa
- enlace al blog de Medium
- narrativa de marca más clara
- comunicación de Paraguay + disponibilidad para viajar
- landing separada de reserva
- home con mejor estructura UX manteniendo la estética visual original
- se mantienen las fotos existentes
- se mantienen los códigos del test para novios y del módulo de testimonios

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub, por ejemplo `el-violin-de-ceci-site`
2. Subir **todo** el contenido de esta carpeta a la raíz del repositorio.
3. En GitHub ir a **Settings > Pages**.
4. En **Build and deployment**, elegir **Deploy from a branch**.
5. Seleccionar la rama principal y la carpeta `/root`.
6. Guardar.

## Estructura

- `index.html` → home principal
- `style.css` → estilos globales del home
- `app.js` → menú móvil + animaciones
- `booking/` → landing de reserva con envío por `mailto:` y WhatsApp prellenado
- `test/` → test premium para novios (conservado)
- `reviews/` → reseñas y testimonios (conservado)
- `assets/fotos/` → fotos originales

## Integraciones actuales

- WhatsApp: `https://wa.me/595985689454`
- Email: `elviolindececi@gmail.com`
- Blog: `https://medium.com/@elviolindececi`
- Instagram: `https://www.instagram.com/elviolindececi/`

## Próxima mejora recomendada

Conectar la landing de reserva a Formspree o Netlify Forms para no depender de `mailto:` y guardar leads automáticamente.
