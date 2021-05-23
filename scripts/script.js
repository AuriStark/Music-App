const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// List of The Songs
const songs = [{
        title: 'Green Chair',
        artist: 'Diego Nava',
        coverPath: 'assets/img/cover1.jpg',
        discPath: 'assets/music/music1.mp3',
        duration: '1:33',
    },
    {
        title: 'Dance with Me',
        artist: 'Ahjay Stelino',
        coverPath: 'assets/img/cover2.jpg',
        discPath: 'assets/music/music2.mp3',
        duration: '2:22',
    },
    {
        title: 'Gimme that Bottle',
        artist: 'Michael ramir',
        coverPath: 'assets/img/cover3.jpg',
        discPath: 'assets/music/music2.mp3',
        duration: '1:54',
    }
]

//  load Song initially
loadSong(songs[songIndex]);

// Load  a given song
function loadSong(song) {
    cover.src = song.coverPath; // cover c est img et a l'attribut src
    disc.src = song.discPath; // disc est un Tag audio donc attribut src 
    // textcontent to change The content of the span-Tags and h1/h2 Tags
    title.textContent = song.title;
    artist.textContent = song.artist;
    duration.textContent = song.duration;
}

// Manage Play and Pause
function playPauseMedia() {
    if (disc.paused) {
        disc.play();
    } else {
        disc.pause();
    }
}
//Update Play and Pause Icon
function updatePlayPauseIcon() {
    if (disc.paused) {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    } else {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
}

// Update Progress Bar
function updateProgress() {
    progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timer.textContent = minutes + ':' + seconds;
}

// Reset the Progress
function resetProgress() {
    progress.style.width = 0 + '%';
    timer.textContent = '0:00';
}
// go to Previous Song
function goToPreviousSong() {
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }

    const isDisplayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDisplayingNow) {
        playPauseMedia();
    }
}

//Go to Next Song
function goToNextSong() {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex = songIndex + 1;
    }

    const isDisplayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDisplayingNow) {
        playPauseMedia();
    }
}

// Change Progress when ckickin on Progress Bar
function setProgress(ev) {
    const totalWidth = this.clientwidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
}

// Play /Pause When Play Butto clicked
play.addEventListener('click', playPauseMedia);

//Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', goToNextSong.bind(null, true));

// Go to next song when Button clicked
next.addEventListener('click', goToNextSong);

//Go to Previous Song when Button clicked
prev.addEventListener('click', goToPreviousSong);

// Move to different place in the Song
progressContainer.addEventListener('click', setProgress);