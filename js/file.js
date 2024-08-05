// src/main/resources/static/js/scripts.js
document.addEventListener('DOMContentLoaded', function () {

    var audioPlayer = document.getElementById('audioPlayer');
    let dropArea = document.getElementById('file-area');
    let fileInput = document.getElementById('fileElem');

    let spanLength = document.getElementById('length');
    let spanStart = document.getElementById('start');

    let titleSong = document.getElementById('titleSong');

    var filesMap = {}; // Object to store files with names as keys


    var songNames = Object.keys(filesMap);
    var currentIndex = 0;
    var indexNext = 0;


    var toggleButton = document.getElementById('playStopBtn');



    // Variable para llevar el conteo de canciones
    var songIndex = 0;



    // Manejar el evento dragover
    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();  // Evita el comportamiento por defecto
        e.stopPropagation();
        dropArea.classList.add('dragover');  // Agrega clase para indicar el área activa
    });

    // Manejar el evento dragleave
    dropArea.addEventListener('dragleave', function (e) {
        e.preventDefault();  // Evita el comportamiento por defecto
        e.stopPropagation();
        dropArea.classList.remove('dragover');  // Restaura el estilo cuando el archivo sale del área
    });

    // Manejar el evento drop
    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();  // Evita el comportamiento por defecto
        e.stopPropagation();
        dropArea.classList.remove('dragover');  // Restaura el estilo cuando se suelta el archivo

        let files = e.dataTransfer.files;
        handleFiles(files);  // Maneja los archivos arrastrados
    });


    // Manejar el cambio en el input
    fileInput.addEventListener('change', function () {
        let files = fileInput.files;
        handleFiles(files);  // Maneja los archivos seleccionados a través del input
    });

    // Función para manejar los archivos
    function handleFiles(files) {
        if (files.length === 0) {
            console.log('No se seleccionaron archivos.');
            return;
        }
        if (files.length > 0) {
            let file = files[0]; // Tomar el primer archivo
            console.log('Archivo:', file);
            playStopBtn.innerHTML = '⏹'; // Play icon
            let audioURL = URL.createObjectURL(file);
            audioPlayer.src = audioURL;
            filesMap[file.name] = audioURL;
            //index para cuando termine la cancion
            indexNext = songIndex;
            // console.log('contador final' + indexNext);

            //index para el btn next
            currentIndex = songIndex;

            // console.log('contador next' + currentIndex);


            audioPlayer.play().then(() => {
                console.log('Reproducción iniciada.');
                lengthSong();
                nameSong(file.name);
                musicList(file.name);
            }).catch(error => {
                console.error('Error al reproducir el archivo:', error);
            });
        }

    }

    nextMusic();


    //REALIZA EL EFECTO DE BARRA CUANDO ESTA REPRODUCIENDO UNA CANCION
    function lengthSong() {
        function updateDurationAndStartTimer() {
            var durationInSeconds = audioPlayer.duration;
            var minutes = Math.floor(durationInSeconds / 60);
            var seconds = Math.floor(durationInSeconds % 60);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            spanLength.innerHTML = minutes + ':' + seconds;

            // Usar setInterval para actualizar el tiempo actual
            var intervalId = setInterval(function () {
                var currentTime = audioPlayer.currentTime;
                var currentMinutes = Math.floor(currentTime / 60);
                var currentSeconds = Math.floor(currentTime % 60);
                currentSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;

                spanStart.innerHTML = currentMinutes + ':' + currentSeconds;

                // Detener el intervalo cuando la canción termine
                if (currentTime >= durationInSeconds) {
                    clearInterval(intervalId);
                }
            }, 1000); // Actualizar cada segundo

        }

        //Preguntamos si los metadatos ya estan cargados
        if (audioPlayer.readyState >= 1) {
            updateDurationAndStartTimer();
        } else {
            audioPlayer.addEventListener('loadedmetadata', updateDurationAndStartTimer);
        }
    }

    function nextMusic() {
        // Manejador para el evento 'ended'
        function handleSongEnd() {

            // Actualiza el índice para la siguiente canción
            indexNext = (indexNext + 1) % songNames.length;

            // Cambia la fuente de audio y nombre de la canción
            audioPlayer.src = filesMap[songNames[indexNext]];
            nameSong(songNames[indexNext]);
            lengthSong();

            // Asegúrate de que el archivo de audio esté completamente cargado antes de reproducir
            audioPlayer.addEventListener('canplaythrough', function onCanPlay() {
                console.log(indexNext);
                audioPlayer.play(); // Reproduce la siguiente canción
                audioPlayer.currentTime = 0; // Reinicia el tiempo de reproducción
                audioPlayer.removeEventListener('canplaythrough', onCanPlay); // Remueve el listener
            }, { once: true }); // Agrega el listener como "once" para que se ejecute solo una vez
        }

        // Primero, elimina cualquier listener anterior para evitar la acumulación
        audioPlayer.removeEventListener('ended', handleSongEnd);

        // Agrega un nuevo listener para el evento 'ended'
        audioPlayer.addEventListener('ended', handleSongEnd);
    }



    function musicList(fileName) {
        var listContainer = document.getElementById('listSongs');
        songIndex++; // Incrementar el índice de canción
        songNames = Object.keys(filesMap);

        // Configura un tamaño fijo para el contenedor y el desplazamiento vertical
        listContainer.style.maxHeight = '300px'; // Ajusta el tamaño según tus necesidades
        listContainer.style.overflowY = 'auto'; // O 'scroll' para siempre mostrar el scrollbar

        // 1. Crear el elemento <li>
        var li = document.createElement('li');
        // Crea una nueva etiqueta <a> para cada archivo de audio
        var a = document.createElement('a');
        a.textContent = songIndex + ". " + fileName; // Agrega el número de canción al texto del enlace
        a.href = "#"; // Establece el enlace para evitar la navegación
        a.style.display = "block"; // Hace que cada enlace aparezca en una nueva línea
        a.style.color = "white"; // Establece el color del texto a blanco
        a.style.textDecoration = "none"; // Elimina el subrayado del enlace

        a.className = 'dropdown-item';

        a.style.transition = "color 0.3s"; // Transición suave para el cambio de color

        a.addEventListener('mouseenter', function () {
            a.style.color = "#a8caff"; // Cambia a un color más claro en hover
        });

        a.addEventListener('mouseleave', function () {
            a.style.color = "white";
        });

        // Añadir un evento de clic para reproducir la canción seleccionada
        a.addEventListener('click', function (e) {
            e.preventDefault(); // Evitar la acción por defecto del enlace
            audioPlayer.src = filesMap[fileName]; // Establecer la fuente del audio al archivo seleccionado
            audioPlayer.play(); // Reproducir el audio     
            nameSong(fileName);
            lengthSong();
            toggleButton.textContent = '⏹';

            indexNext = getFileIndex(fileName);
            // console.log('contador final' + indexNext);

            //index para el btn next
            currentIndex = getFileIndex(fileName);

            // console.log('contador next' + currentIndex);


        });


        li.appendChild(a);
        // Añade la etiqueta <a> al contenedor de la lista de canciones
        listContainer.appendChild(li);

        // Verificar si hay más de 8 canciones
        if (listContainer.children.length > 8) {
            listContainer.style.overflowY = 'auto'; // Habilitar el scroll vertical
        } else {
            listContainer.style.overflowY = 'hidden'; // Deshabilitar el scroll si hay menos de 8 canciones
        }

    }


    // Función para reproducir una canción por índice
    function playSong(index) {
        if (index >= 0 && index < songNames.length) {
            lengthSong();
            currentIndex = index;
            audioPlayer.src = filesMap[songNames[currentIndex]];
            nameSong(songNames[currentIndex]); //cambindo nombre
            audioPlayer.play();

        }
    }

    // Botón "Siguiente"
    document.getElementById("nextBtn").addEventListener("click", function () {
        if (currentIndex < songNames.length - 1) {
            playSong(currentIndex + 1);
        } else {
            playSong(0); // Ir a la primera canción si estamos en la última
        }
        toggleButton.innerHTML = '⏹'; // Stop icon
    });

    // Botón "Anterior"
    document.getElementById("prevBtn").addEventListener("click", function () {
        if (currentIndex > 0) {
            playSong(currentIndex - 1);
        } else {
            playSong(songNames.length - 1); // Ir a la última canción si estamos en la primera
        }
        toggleButton.innerHTML = '⏹'; // Stop icon
    });



    function nameSong(filename) {
        titleSong.innerHTML = filename;
    }

    //RETORNA EL INDICE DE LA CANCION SELECCIONADA
    function getFileIndex(fileName) {
        var keys = Object.keys(filesMap);
        return keys.indexOf(fileName);
    }


});
