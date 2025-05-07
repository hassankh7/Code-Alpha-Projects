

 // Playlist with songs - public domain/sample audio URLs with cover art
 const songs = [
    {
      title: "Acoustic Breeze",
      artist: "Justin Bieber",
      src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
      cover: "https://images.pexels.com/photos/707915/pexels-photo-707915.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Creative Minds",
      artist: "Justin Bieber",
      src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
      cover: "https://www.bensound.com/bensound-img/creativeminds.jpg"
    },
    {
      title: "Sunny",
      artist: "Justin Bieber",
      src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
      cover: "https://www.bensound.com/bensound-img/sunny.jpg"
    }
  ];
  // Elements
  const cover = document.getElementById('cover');
  const title = document.getElementById('title');
  const artist = document.getElementById('artist');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const progressContainer = document.getElementById('progress-container');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  // Audio object
  let audio = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;
   // Load song
   function loadSong(song) {
    cover.src = song.cover;
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
  }

   // Play song
   function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '&#10073;&#10073;'; // Pause icon
    playBtn.title = "Pause";
  }
  // Pause song
  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '&#9658;'; // Play icon
    playBtn.title = "Play";
  }
   // Toggle play/pause
   playBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
  // Previous song
  prevBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
  });

    // Next song
    nextBtn.addEventListener('click', () => {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
          currentSongIndex = 0;
        }
        loadSong(songs[currentSongIndex]);
        playSong();
      });
      // Update progress bar
      audio.addEventListener('timeupdate', updateProgress);
      // Set progress bar
      progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if(duration) {
          audio.currentTime = (clickX / width) * duration;
        }
      });
        // Update progress & time display function
  function updateProgress() {
    if (!audio.duration) return;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + '%';
    // Current time
    currentTimeEl.textContent = formatTime(audio.currentTime);
    // Duration
    durationEl.textContent = formatTime(audio.duration);
  }
  // Format time as m:ss
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ":" + (secs < 10 ? "0" + secs : secs);
  }
    // When song ends, play next track
    audio.addEventListener('ended', () => {
        nextBtn.click();
      });
      // Initialize player with first song
      loadSong(songs[currentSongIndex]);