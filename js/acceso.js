const btnAceder = document.getElementById('btn-acceder');
const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const passwordInput = document.getElementById('contraseña');

btnAceder.addEventListener('click', (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (nombre === 'isabel') {
        if (password === 'novo2024') {
            localStorage.setItem('adminLoggedIn', 'true');
            alert('Bienvenida, isabel a su panel');
            window.location.href = 'index.html';
            return;
        }

        alert('Contraseña incorrecta');
        return;
    }

    alert('Usuario incorrecto');
});