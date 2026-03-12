const form = document.getElementById('bookingForm');
const waBookingLink = document.getElementById('waBookingLink');

function getValue(id) {
  return document.getElementById(id)?.value?.trim() || '';
}

function buildMessage() {
  const nombre = getValue('nombre');
  const email = getValue('email');
  const telefono = getValue('telefono');
  const tipo = getValue('tipo');
  const fecha = getValue('fecha');
  const lugar = getValue('lugar');
  const formato = getValue('formato');
  const mensaje = getValue('mensaje');

  return [
    'Hola Ceci, quiero consultar disponibilidad para un evento.',
    '',
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    `Teléfono: ${telefono || 'No indicado'}`,
    `Tipo de evento: ${tipo}`,
    `Fecha: ${fecha || 'A definir'}`,
    `Lugar: ${lugar || 'A definir'}`,
    `Formato de interés: ${formato || 'A definir'}`,
    '',
    'Mensaje:',
    mensaje || 'Quiero recibir una propuesta personalizada.'
  ].join('\n');
}

function refreshWhatsAppLink() {
  const text = encodeURIComponent(buildMessage());
  waBookingLink.href = `https://wa.me/595985689454?text=${text}`;
}

form?.addEventListener('input', refreshWhatsAppLink);
refreshWhatsAppLink();

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const subject = encodeURIComponent('Consulta de reserva — El Violín de Ceci');
  const body = encodeURIComponent(buildMessage());
  window.location.href = `mailto:elviolindececi@gmail.com?subject=${subject}&body=${body}`;
});
