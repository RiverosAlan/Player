// src/main/resources/static/js/scripts.js
document.addEventListener('DOMContentLoaded', function () {
    let audioPlayer = document.getElementById('audioPlayer');
    let toggleButton = document.getElementById('playStopBtn');
    let playbarInner = document.querySelector('.playbar_inner');

    // Función para alternar entre play y pause
    toggleButton.addEventListener('click', function () {
        if (audioPlayer.paused) {
            if (audioPlayer.src) {
                audioPlayer.play().then(() => {
                    console.log('Reproducción iniciada.');
                    toggleButton.textContent = '⏹'; // Cambia el texto a "Pause"

                }).catch(error => {
                    console.error('Error al reproducir el archivo:', error);
                });
            } else {
                console.log('No hay archivo para reproducir.');
            }
        } else {
            audioPlayer.pause();
            console.log('Reproducción pausada.');
            toggleButton.textContent = '▶'; // Cambia el texto a "Play"
        }
    });

    // Opcional: Inicializa el texto del botón
    toggleButton.textContent = '▶'; // Texto inicial del botón


    // Función para actualizar la barra de progreso
    function updatePlaybar() {
        if (audioPlayer.duration) {
            let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            playbarInner.style.width = progress + '%';
        }
    }

    // Actualiza la barra de progreso cada 100ms
    setInterval(updatePlaybar, 100);



});
