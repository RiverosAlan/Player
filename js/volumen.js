document.addEventListener('DOMContentLoaded', () => {
    const volumeContainer = document.querySelector('.volume');
    const volumeArrow = document.querySelector('.volume-arrow');
    const audioPlayer = document.getElementById('audioPlayer');
  
    if (!volumeContainer || !volumeArrow || !audioPlayer) {
      console.error('One or more required elements are missing.');
      return;
    }
  
    const volumeIndicator = document.createElement('div');
    volumeIndicator.className = 'volume-indicator';
    volumeContainer.appendChild(volumeIndicator);
  
    const volumeContainerRect = volumeContainer.getBoundingClientRect();
    const volumeHeight = volumeContainerRect.height;
    const arrowHeight = volumeArrow.offsetHeight;
  
    // Ajusta este valor para mover la flecha más abajo
    const offset = 200; // Valor para la nueva posición inicial más abajo
  
    // Inicializa la posición de la flecha con el desplazamiento
    const initialTop = Math.min(volumeHeight - arrowHeight, offset);
    volumeArrow.style.top = `${initialTop}px`;
  
    let isDragging = false;
    let startY = 0;
  
    // Maneja el inicio del arrastre
    volumeArrow.addEventListener('mousedown', (event) => {
      isDragging = true;
      startY = event.clientY;
      event.preventDefault(); // Previene el comportamiento por defecto del navegador
    });
  
 // Maneja el movimiento durante el arrastre
document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaY = (startY - event.clientY) * 0.7; // Ajusta el factor para controlar la velocidad
    startY = event.clientY;

    const volumeRect = volumeContainer.getBoundingClientRect();
    const arrowRect = volumeArrow.getBoundingClientRect(); // Obtiene las dimensiones de la flecha

    // Calcula la nueva posición de la flecha
    const newTop = volumeArrow.offsetTop - deltaY;

    // Ajusta el rango de movimiento para la flecha
    const minTop = -arrowRect.height + 80; // Permite que la flecha se mueva hasta arriba del contenedor
    const maxTop = volumeRect.height + 30; // Permite que la flecha se mueva más allá del límite inferior del contenedor

    // Asegura que la flecha se mantenga dentro de los límites
    const clampedTop = Math.max(minTop, Math.min(newTop, maxTop));

    // Ajusta el volumen basado en la posición de la flecha
    const volume = 1 - ((clampedTop - minTop) / (maxTop - minTop));
    updateVolume(volume);

    // Actualiza la posición de la flecha
    volumeArrow.style.top = `${clampedTop}px`;

    // Sincroniza la barra de volumen con la flecha
    const volumeBar = document.querySelector('.volume-bar'); // Asegúrate de seleccionar el elemento correcto
    const barHeight = volumeRect.height;
    
    // Calcula la nueva altura y posición para la barra de volumen
    const barTop = volumeRect.height - (clampedTop + arrowRect.height);
    volumeBar.style.height = `${barHeight - barTop}px`;
    volumeBar.style.top = `${barTop}px`;
  }
});

    
    
  
    // Maneja el fin del arrastre
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    // Actualiza el volumen y el indicador visual
    function updateVolume(volume) {
      audioPlayer.volume = volume;
      volumeIndicator.style.height = `${volume * 100}%`;
    }
  });
  