document.addEventListener('DOMContentLoaded', function() {
    const playStopBtn = document.getElementById('playStopBtn');
    let isPlaying = false; // Track whether the music is playing

    playStopBtn.addEventListener('click', function() {
        if (isPlaying) {
            // Switch to stop
            playStopBtn.innerHTML = '▶'; // Play icon
            isPlaying = false;
            // Add logic to stop the music here
        } else {
            // Switch to play
            playStopBtn.innerHTML = '⏹'; // Stop icon
            isPlaying = true;
            // Add logic to play the music here
        }
    });

    


});