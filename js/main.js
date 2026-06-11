function validarEntrada() {
    const identificador = document.getElementById('idUsuario').value.trim();
    const password = document.getElementById('passUsuario').value;
    const telefono = document.getElementById('telCliente').value;

    // 1. Lógica para la ADMINISTRADORA (Isabel)
    // Según los requisitos de seguridad y atributos definidos [1, 5]
    if (identificador.toLowerCase() === "isabel") {
        if (password === "novo2024") { // Contraseña de ejemplo definida en requisitos
            alert("Bienvenida, Isabel. Redirigiendo al Panel de Administración...");
            window.location.href = "admin/admin.html"; // Módulo de gestión interna [7]
            return;
        } else {
            alert("Contraseña de administradora incorrecta.");
            return;
        }
    }

    // 2. Lógica para el CLIENTE (Existente o Nuevo) [1, 2]
    let clientesGuardados = JSON.parse(localStorage.getItem('clientes_novo')) || [];
    let clienteExistente = clientesGuardados.find(c => c.nombre.toLowerCase() === identificador.toLowerCase());

    if (clienteExistente) {
        // CLIENTE EXISTENTE: Solo requiere su nombre
        alert(`Hola de nuevo, ${clienteExistente.nombre}. Accediendo al catálogo...`);
        sessionStorage.setItem('usuario_actual', JSON.stringify(clienteExistente));
        window.location.href = "catalogo.html"; // Módulo 2 [9]
    } else {
        // CLIENTE NUEVO: Requiere registro (nombre + teléfono) [1]
        if (telefono === "") {
            alert("No te encontramos en el sistema. Por favor, introduce tu teléfono para registrarte.");
            document.getElementById('mensaje-guia').innerText = "Registro de nuevo cliente";
        } else {
            // Método registrarCliente()
            const nuevoCliente = {
                idCliente: Date.now(),
                nombre: identificador,
                teléfono: telefono
            };
            clientesGuardados.push(nuevoCliente);
            localStorage.setItem('clientes_novo', JSON.stringify(clientesGuardados));
            
            alert("¡Bienvenido a Natural Novo! Tu registro ha sido exitoso.");
            sessionStorage.setItem('usuario_actual', JSON.stringify(nuevoCliente));
            window.location.href = "catalogo.html";
        }
    }
}