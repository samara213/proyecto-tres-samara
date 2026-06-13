const headerMenuBtn = document.getElementById('header-menu-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const btnShowPlayer = document.getElementById('btn-show-player');
const btnShowTracks = document.getElementById('btn-show-tracks');
const jsSongsMenu = document.getElementById('js-songs-menu');
const playerContainer = document.getElementById('player-view-section');
const btnChangePhrase = document.getElementById('btn-change-phrase');

const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');


headerMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

window.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== headerMenuBtn) {
        dropdownMenu.classList.remove('show');
    }
});

loginBtn.addEventListener('click', (e) => { 
    e.stopPropagation();
    loginModal.classList.add('active'); 
});

closeModal.addEventListener('click', () => { 
    loginModal.classList.remove('active'); 
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userValue = usernameInput.value.trim();
    if (userValue) {
        localStorage.setItem('activeUser', userValue);
        loginBtn.innerHTML = `<i class="fas fa-user-check"></i> Hola, ${userValue}`;
        loginModal.classList.remove('active');
        loginForm.reset();
    }
});

function checkSavedUser() {
    const savedUser = localStorage.getItem('activeUser');
    if (savedUser) {
        loginBtn.innerHTML = `<i class="fas fa-user-check"></i> Hola, ${savedUser}`;
    }
}
checkSavedUser();

btnShowPlayer.addEventListener('click', () => {
    btnShowTracks.classList.remove('active-tab-btn');
    btnShowPlayer.classList.add('active-tab-btn');
    jsSongsMenu.classList.remove('open-list');
    dropdownMenu.classList.remove('show');
    
    playerContainer.classList.add('focus-glow');
    setTimeout(() => {
        playerContainer.classList.remove('focus-glow');
    }, 800);
});

btnShowTracks.addEventListener('click', (e) => {
    e.stopPropagation();
    btnShowPlayer.classList.remove('active-tab-btn');
    btnShowTracks.classList.add('active-tab-btn');
    jsSongsMenu.classList.toggle('open-list');
});

const playPauseBtn = document.querySelector('.control-btn.play-pause');
const playPauseIcon = playPauseBtn.querySelector('i');
const prevBtn = document.querySelector('.control-btn.prev');
const nextBtn = document.querySelector('.control-btn.next');
const shuffleBtn = document.querySelector('.control-btn.shuffle');
const repeatBtn = document.querySelector('.control-btn.repeat');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationTimeEl = document.querySelector('.duration-time');
const volumeSlider = document.querySelector('.volume-slider');
const trackArt = document.getElementById('track-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackPhrase = document.getElementById('track-phrase');

const audio = new Audio();

const playlist = [
    {
        title: "Beast",
        artist: "Mia Martina",
        cover: "img/beast.jpg",
        url: "canciones/Mia Martina -Beast.mp3",
        phrase: '"Miradas fijas como estrellas que iluminan la noche profunda."'
    },
    {
        title: "Burning",
        artist: "Mia Martina",
        cover: "img/burning.jpg",
        url: "canciones/Mia Martina - Burning.mp3",
        phrase: '"Fuego en las venas y ritmos que no se apagan nunca."'
    },
    {
        title: "HeartBreaker",
        artist: "Mia Martina",
        cover: "img/heartbreaker.jpg",
        url: "canciones/Mia Martina - HeartBreaker.mp3",
        phrase: '"Rompiendo esquemas al compás de un latido constante."'
    }, 
    {
        title: "Latin Moon",
        artist: "Mia Martina",
        cover: "img/latinMoon.jpg",
        url: "canciones/Mia Martina - Latin Moon.mp3",
        phrase: '"Bajo el reflejo plateado, la música nos hace libres."'
    }, 
    {
        title: "Go Crazy",
        artist: "Mia Martina",
        cover: "img/goodcrazy.jpg",
        url: "canciones/Go Crazy - Mia Martina.mp3",
        phrase: '"Una locura brillante que se lleva en los oídos."'
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function loadTrack(index) {
    try {
        currentTrackIndex = index;
        const track = playlist[index];
        audio.src = track.url;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        trackArt.src = track.cover;
        trackPhrase.textContent = track.phrase;
        
        progressBar.value = 0;
        currentTimeEl.textContent = "0:00";
        durationTimeEl.textContent = "0:00";
        updateDropdownActiveSong();
    } catch(err) {
        console.log("Error cargando archivo multimedia ignorado para proteger la UI");
    }
}

function playTrack() {
    audio.play().catch(err => console.log("Auto-play detenido por el navegador"));
    isPlaying = true;
    playPauseIcon.className = 'fas fa-pause';
    updateDropdownActiveSong();
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playPauseIcon.className = 'fas fa-play';
    updateDropdownActiveSong();
}

function togglePlay() {
    if (isPlaying) pauseTrack(); else playTrack();
}

function nextTrack() {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? '#e06c9f' : '#b3b3b3';
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? '#e06c9f' : '#b3b3b3';
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playTrack();
    } else {
        nextTrack();
    }
});

function buildDropdownSongs() {
    jsSongsMenu.innerHTML = '';
    playlist.forEach((track, index) => {
        const button = document.createElement('button');
        button.classList.add('song-item-btn');
        button.innerHTML = `
            <span>${index + 1}. ${track.title}</span>
            <i class="fas fa-play"></i>
        `;
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            loadTrack(index);
            playTrack();
            dropdownMenu.classList.remove('show');
        });
        jsSongsMenu.appendChild(button);
    });
}

function updateDropdownActiveSong() {
    const songButtons = jsSongsMenu.querySelectorAll('.song-item-btn');
    if(!songButtons.length) return;
    songButtons.forEach((btn, idx) => {
        if (idx === currentTrackIndex) {
            btn.classList.add('playing');
            btn.querySelector('i').className = isPlaying ? 'fas fa-volume-up' : 'fas fa-pause';
        } else {
            btn.classList.remove('playing');
            btn.querySelector('i').className = 'fas fa-play';
        }
    });
}

btnChangePhrase.addEventListener('click', (e) => {
    e.stopPropagation();
    const randomIndex = Math.floor(Math.random() * playlist.length);
    trackPhrase.textContent = playlist[randomIndex].phrase;
});

buildDropdownSongs();
loadTrack(currentTrackIndex);