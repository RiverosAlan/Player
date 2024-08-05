const playbar = document.getElementById('playbar');
const playbarInner = document.getElementById('playbarInner');
const circleIndicator = document.getElementById('circleIndicator');
const audioPlayer = document.getElementById('audioPlayer');

if (playbar && playbarInner && circleIndicator && audioPlayer) {
    let isDragging = false;

    playbar.addEventListener('mouseenter', function() {
        circleIndicator.style.display = 'block';
    });

    playbar.addEventListener('mouseleave', function() {
        if (!isDragging) {
            circleIndicator.style.display = 'none';
        }
    });

    playbar.addEventListener('mousedown', function(event) {
        isDragging = true;
        moveProgress(event);
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            moveProgress(event);
        }
    });

    function moveProgress(event) {
        const rect = playbar.getBoundingClientRect();
        const moveX = Math.min(Math.max(0, event.clientX - rect.left), rect.width);
        const newTime = (moveX / rect.width) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
        updatePlaybar(newTime);
    }

    function updatePlaybar(time) {
        if (audioPlayer.duration) {
            let progress = (time / audioPlayer.duration) * 100;
            playbarInner.style.width = progress + '%';
            const rect = playbar.getBoundingClientRect();
            const circleX = (progress / 100) * rect.width;
            circleIndicator.style.left = circleX + 'px';
        }
    }

    // Asegúrate de actualizar la barra de progreso durante la reproducción
    audioPlayer.addEventListener('timeupdate', function() {
        if (!isDragging) {
            updatePlaybar(audioPlayer.currentTime);
        }
    });

    // Inicializar la posición del círculo al cargar
    audioPlayer.addEventListener('loadedmetadata', function() {
        updatePlaybar(audioPlayer.currentTime);
    });
} else {
    console.error('Uno o más elementos no fueron encontrados en el DOM');
}
