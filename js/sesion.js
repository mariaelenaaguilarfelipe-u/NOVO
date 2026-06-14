
const modal = document.getElementById('modalForm');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const form = document.getElementById('formContent');

// Abrir el modal usando la API nativa (.showModal)
openBtn.addEventListener('click', () => {
  modal.showModal();
});

// Cerrar el modal al hacer clic en la 'X'
closeBtn.addEventListener('click', () => {
  modal.close();
});

// Manejar el envío del formulario
form.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;
  console.log("Nombre enviado:", name);
  
  // Al usar method="dialog" en el HTML, el modal se cierra automáticamente al presionar enviar.
});
