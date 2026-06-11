const btnLanzarModal=doccument.getElementById('lanzar-modal');
const btnOcultarModal=document.getElementById('ocultar-modal');
const contModal=document.getElementById('ocultar-modal');
const nombreInput=document.getElementById('nombre');
const telefonoInput=document.getElementById('telefono');

btnLanzarModal.addEventListener('click',(e)=>{

  e.preventDefault();
  contModal.classList.add('mostar');
})

btnOcultarModal.addEventListener('click',(e)=>{

  e.preventDefault();
  contModal.classList.remove('mostar');
})

// Función para validar el formulario de registro

function validarformulario(e){

  e.preventDefault();
  const nombre=nombreInput.value.trim();
  const telefono=telefonoInput.value.trim();
  if (!nombre === '') {
    alert('Por favor, ingresa tu nombre.');
    nombreInput.focus();
    return;
  } else if (!telefono === '') {
    alert('Por favor, ingresa tu teléfono.');
    telefonoInput.focus();
    return;
  } else if (!/^[0-9]+$/.test(telefono)) {
    alert('El teléfono solo puede contener números.');
    telefonoInput.focus();
    return;
  } else if (!/^[0-9]{7,15}$/.test(telefono)) {
    alert('El teléfono debe tener entre 7 y 15 dígitos.');
    telefonoInput.focus();
    return;
  }
}