const pianoKeys = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slider input');
const keysCheckbox = document.querySelector('.keys-checkbox input');

let allKeys = [],
    audio = new Audio("audio/a.wav");

pianoKeys.forEach(key => {
    // Check if the key is visible (not hidden via display: none)
    if (!(key.offsetHeight === 0 && key.offsetWidth === 0)) {
        allKeys.push(key.dataset.key); // adding the key's data-key attribute to the allKeys array
        key.addEventListener('click', () => playTune(key.dataset.key)); // Ensure we pass the correct dataset key
    }
});

function playTune(key) {
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (!clickedKey) {
        console.error(`Key element with data-key="${key}" not found.`);
        return;
    }
    clickedKey.classList.add('active');
    setTimeout(() => {
        audio.src = `audio/${key}.wav`; // Set the correct audio file
        audio.play();
        clickedKey.classList.remove('active');
    }, 150);
}

function pressedKey(e) {
    if (allKeys.includes(e.key) && !e.repeat) playTune(e.key);
}

volumeSlider.addEventListener('input', handleVolume);

function handleVolume() {
    audio.volume = volumeSlider.value;
}

keysCheckbox.addEventListener('input', showHideKeys);

function showHideKeys() {
    pianoKeys.forEach(key => key.classList.toggle('hide'));
}

window.addEventListener('keydown', pressedKey);
