let productos = [];
let productoSeleccionado = null;

const contenedorProductos = document.getElementById('contenedor-productos');
const filtros = document.querySelectorAll('.btn-filtro');
const modalCompra = document.getElementById('modal-compra');
const cerrarModalBtn = document.querySelector('.cerrar-modal');
const nombreProductoModal = document.getElementById('nombre-producto-modal');
const formularioPedido = document.getElementById('formulario-pedido');
const inputNombreCliente = document.getElementById('nombre-cliente');
const inputDireccionCliente = document.getElementById('direccion-cliente');
const inputTelefonoCliente = document.getElementById('telefono-cliente');
const inputNotasCliente = document.getElementById('notas-cliente');

function cargarProductos() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../json/productos.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                productos = JSON.parse(xhr.responseText);
                mostrarProductos(productos);
                configurarFiltros();
            } catch (error) {
                console.error('Error al leer productos.json:', error);
                contenedorProductos.innerHTML = '<p>No se pudo cargar el catálogo.</p>';
            }
        } else {
            contenedorProductos.innerHTML = '<p>No se pudo cargar el catálogo.</p>';
        }
    };
    xhr.onerror = function() {
        contenedorProductos.innerHTML = '<p>No se pudo conectar al servidor.</p>';
    };
    xhr.send();
}

function mostrarProductos(lista) {
    if (!contenedorProductos) return;

    if (!lista.length) {
        contenedorProductos.innerHTML = '<p>No hay productos en esta categoría.</p>';
        return;
    }

    contenedorProductos.innerHTML = lista.map(producto => {
        return `
            <article class="producto-card">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" loading="lazy">
                <div class="producto-detalles">
                    <h3>${producto.nombre}</h3>
                    <p class="producto-categoria">${producto.categoria}</p>
                    <p class="producto-precio">${producto.precio}</p>
                    <button class="btn-comprar" data-id="${producto.id}">Solicitar</button>
                </div>
            </article>
        `;
    }).join('');

    configurarBotonesComprar();
}

function configurarFiltros() {
    if (!filtros.length) return;

    filtros.forEach(boton => {
        boton.addEventListener('click', () => {
            filtros.forEach(btn => btn.classList.remove('activo'));
            boton.classList.add('activo');

            const categoria = boton.id;
            if (categoria === 'todos') {
                mostrarProductos(productos);
            } else {
                const productosFiltrados = productos.filter(p => p.categoria === categoria);
                mostrarProductos(productosFiltrados);
            }
        });
    });
}

function configurarBotonesComprar() {
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = Number(boton.dataset.id);
            productoSeleccionado = productos.find(p => p.id === id);
            if (!productoSeleccionado) return;

            nombreProductoModal.textContent = productoSeleccionado.nombre;
            abrirModal();
        });
    });
}

function abrirModal() {
    if (!modalCompra) return;
    modalCompra.classList.add('mostrar');
}

function cerrarModal() {
    if (!modalCompra) return;
    modalCompra.classList.remove('mostrar');
}

function enviarPedidoWhatsApp(event) {
    event.preventDefault();
    if (!productoSeleccionado) return;

    const nombre = inputNombreCliente.value.trim();
    const direccion = inputDireccionCliente.value.trim();
    const telefono = inputTelefonoCliente.value.trim();
    const notas = inputNotasCliente.value.trim();

    if (!nombre || !direccion || !telefono) {
        alert('Por favor, completa tu nombre, dirección y teléfono antes de enviar el pedido.');
        return;
    }

    const mensaje = `Hola, quiero pedir:%0A- Producto: ${productoSeleccionado.nombre}%0A- Categoría: ${productoSeleccionado.categoria}%0A- Precio: ${productoSeleccionado.precio}%0A%0ADatos de envío:%0A- Nombre: ${nombre}%0A- Dirección: ${direccion}%0A- Teléfono: ${telefono}%0A- Notas: ${notas}`;
    const urlWhatsApp = `https://api.whatsapp.com/send?text=${mensaje}`;

    window.open(urlWhatsApp, '_blank');
    formularioPedido.reset();
    cerrarModal();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarProductos);
} else {
    cargarProductos();
}

if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener('click', cerrarModal);
}

if (modalCompra) {
    modalCompra.addEventListener('click', event => {
        if (event.target === modalCompra) {
            cerrarModal();
        }
    });
}

if (formularioPedido) {
    formularioPedido.addEventListener('submit', enviarPedidoWhatsApp);
}

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        cerrarModal();
    }
});

