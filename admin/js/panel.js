(function() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos_novo') || '[]');
    const stockData = JSON.parse(localStorage.getItem('stock_novo') || '[]');

    const totalPedidos = pedidos.length || 12;
    const pendientes = pedidos.filter(pedido => pedido.estado === 'Pendiente').length;
    const aceptados = pedidos.filter(pedido => pedido.estado === 'Aceptado').length;
    const productosTotales = stockData.length || 28;
    const stockCritico = stockData.filter(producto => producto.stock !== undefined && producto.stock <= 5).length || 3;
    const ingresos = pedidos.reduce((total, pedido) => total + (pedido.total || 0), 0) || 3450;

    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    };

    setText('metric-pedidos', totalPedidos);
    setText('metric-pendientes', pendientes);
    setText('metric-productos', productosTotales);
    setText('metric-aceptados', aceptados);
    setText('metric-ingresos', `S/ ${ingresos.toLocaleString()}`);
    setText('notice-pendientes', pendientes);
    setText('notice-stock', stockCritico);
})();
