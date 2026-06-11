(function(){
    const formulario = document.getElementById('formulario-pedidos');
    const mensaje = document.getElementById('mensaje-pedido');
    const listaPedidos = document.getElementById('lista-pedidos');
    if (!formulario) return;

    formulario.addEventListener('submit', function(evento){
        evento.preventDefault();

        const nombre = document.getElementById('nombre-cliente').value.trim();
        const direccion = document.getElementById('direccion-cliente').value.trim();
        const telefono = document.getElementById('telefono-cliente').value.trim();
        const producto = document.getElementById('productos-cliente').value.trim();
        const cantidad = document.getElementById('cantidad-pedido').value.trim();
        const estado = document.getElementById('estado-pedido').value.trim();

        if (mensaje) {
            mensaje.textContent = `Pedido guardado: ${nombre}, ${producto} x${cantidad}, estado ${estado}`;
            mensaje.classList.add('visible');
        }

        if (listaPedidos) {
            const linea = document.createElement('li');
            linea.textContent = `${new Date().toLocaleTimeString()} - ${nombre}, ${producto} x${cantidad}, ${direccion}, ${telefono}, ${estado}`;
            listaPedidos.prepend(linea);
        }

        formulario.reset();
        document.getElementById('nombre-cliente').focus();
    });
})();
