const btnLanzarModal=document.querySelector('#lanzar-modal');
const btnOcultarModal=document.querySelector('#ocultar-modal');
const contModal=document.querySelector('.contenedor-modal');

const nombreInput=document.querySelector('#nombre');
const empleoInput=document.querySelector('#empleo');

btnLanzarModal.addEventListener('click',(e)=>{
    e.preventDefault();
    contModal.classList.add('mostrar')
})

btnOcultarModal.add('click',(e)=>{
    e.preventDefault();
    contModal.classList.remove('mostrar')
})