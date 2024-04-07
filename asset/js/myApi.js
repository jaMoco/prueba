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

// Variables para el OpenWeather
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Evento para el usodel openweather
search.addEventListener('click', () => {

    const APIKey = 'fa91866fdcf74b9499fdf130e7726887'; //llave para el uso del Openweather 
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${APIKey}`) //Usamos &lang=es para que los resusltados los diera en español
        .then(response => response.json())
        .then(json => {

            //Verificar si el código de respuesta de la API es 404 (no encontrado)
            if (json.cod === '404') {
                //Si es 404, ajustar el contenedor y mostrar el mensaje de error
                container.style.height = '400px'; // Cambiar la altura del contenedor
                weatherBox.style.display = 'none'; // Ocultar el cuadro de clima
                weatherDetails.style.display = 'none'; // Ocultar los detalles del clima
                error404.style.display = 'block'; // Mostrar el mensaje de error
                error404.classList.add('fadeIn');// Agregar clase para animación de entrada
                return;  // Salir de la función
            }

            // Si no es 404, ocultar el mensaje de error y actualizar la información del clima
            error404.style.display = 'none'; // Ocultar el mensaje de error
            error404.classList.remove('fadeIn');  // Quitar clase de animación de entrada

            // Seleccionar elementos del DOM para actualizar la información del clima
            const image = document.querySelector('.weather-box img'); // Imagen del clima
            const temperature = document.querySelector('.weather-box .temperature'); // Temperatura
            const description = document.querySelector('.weather-box .description');  // Descripción del clima
            const humidity = document.querySelector('.weather-details .humidity span'); // Humedad
            const wind = document.querySelector('.weather-details .wind span'); // Velocidad del viento

            // Actualizar la imagen del clima basada en la condición meteorológica principal
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/asset/img/img-api/clear.png'; // Imagen para cielo despejado
                    break;

                case 'Rain':
                    image.src = '/asset/img/img-api/rain.png'; // Imagen para lluvia
                    break;

                case 'Snow':
                    image.src = '/asset/img/img-api/snow.png'; // Imagen para nieve
                    break;

                case 'Clouds':
                    image.src = '/asset/img/img-api/cloud.png'; // Imagen para nieve
                    break;

                case 'Haze':
                    image.src = '/asset/img/img-api/mist.png'; // Imagen para neblina
                    break;

                default:
                    image.src = ''; // Si no hay coincidencia, no se muestra ninguna imagen
            }

            // Actualizar la temperatura, descripción, humedad y velocidad del viento
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; // Temperatura en grados Celsius
            description.innerHTML = `${json.weather[0].description}`; // Descripción del clima
            humidity.innerHTML = `${json.main.humidity}%`; // Humedad
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; // Velocidad del viento

            // Mostrar los elementos actualizados y agregar la clase de animación de entrada
            weatherBox.style.display = '';  // Mostrar el cuadro de clima
            weatherDetails.style.display = ''; // Mostrar los detalles del clima
            weatherBox.classList.add('fadeIn'); // Agregar clase para animación de entrada al cuadro de clima
            weatherDetails.classList.add('fadeIn'); // Agregar clase para animación de entrada a los detalles del clima
            container.style.height = '590px'; // Restaurar la altura del contenedor
        });
});
