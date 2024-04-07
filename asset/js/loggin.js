//variables para el delizamiento
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Evento para abrir form de registro
signUpButton.addEventListener('click', () => {
container.classList.add('right-panel-active');
});

// Evento para regresar al form de iniciar sesión
signInButton.addEventListener('click', () => {
container.classList.remove('right-panel-active');
});

// LocaLStorage
// SET: ES PARA GUARDAR informcacion 
// get: es para obtener informacion

//registro de seccion
document.getElementById('lila').addEventListener('click', () => {
    const nombre = document.querySelector('input[type="text"]').value;
    const correo = document.querySelector('input[type="email"]').value;
    const contraseña = document.querySelector('input[type="password"]').value;

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('correo', correo);
    localStorage.setItem('contraseña', contraseña);
});

// Función para validar los datos de inicio de sesión
function validarInicioSesion(correo, contraseña) {
    const correoRegistrado = localStorage.getItem('correo');
    const contraseñaRegistrada = localStorage.getItem('contraseña');

    console.log('Correo ingresado:', correo);
    console.log('Contraseña ingresada:', contraseña);
    console.log('Correo registrado:', correoRegistrado);
    console.log('Contraseña registrada:', contraseñaRegistrada);

    return correo === correoRegistrado && contraseña === contraseñaRegistrada;
};

// Evento para iniciar sesión con el localStorage
document.getElementById('ini').addEventListener('click', (event) => {
    event.preventDefault();

    const correo = document.querySelector('.form-container.sign-in-container input[type="email"]').value;
    const contraseña = document.querySelector('.form-container.sign-in-container input[type="password"]').value;

    console.log('Correo capturado:', correo);
    console.log('Contraseña capturada:', contraseña);

    if (validarInicioSesion(correo, contraseña)) {
        window.location.href = 'home.html';
    } else {
        alert('Datos incorrectos. Por favor, verifica tu correo y contraseña.');
    }
});

// Comprobar si hay datos de registro en localStorage y mostrarlos en el formulario de inicio de sesión
if (localStorage.getItem('correo') && localStorage.getItem('contraseña')) {
    document.querySelector('.form-container.sign-in-container input[type="email"]').value = localStorage.getItem('correo');
}
