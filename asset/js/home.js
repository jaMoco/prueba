
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

// Evento para cerrar sesión
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('nombre');
    localStorage.removeItem('correo');
    localStorage.removeItem('contraseña');
    window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
});

//animacion del click 
document.getElementById('bton').addEventListener('click',()=>{
    window.location.href = 'myApi.html'; // Redirige a la página de la API para indicar el tiempo
});
