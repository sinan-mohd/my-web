const songs_DB = [
    {
        'id': 1,
        'name': "Aapke pyaar mein  cover",
        'path': "./audio/Aapke pyaar mein  cover.mp3"
    },
    {
        'id': 2,
        'name': "aziyat",
        'path': "./audio/aziyat.mp3"
    },
    {
        'id': 3,
        'name': "soch na sake cover",
        'path': "./audio/soch na sake cover.mp3"
    },
    {
        'id': 4,
        'name': "Tu jaane na",
        'path': "./audio/Tu jaane na.mp3"
    },
    {
        'id': 5,
        'name': "saari ki saari",
        'path': "./audio/saari ki saari.mp3"
    }
]

const body = document.body;
const audio = document.querySelector('#audio');
const random_song_btn = document.querySelector('#random_song_btn');
const play_btn = document.querySelector('#play');
const prev_btn = document.querySelector('#previous_song');
const next_btn = document.querySelector('#next_song');
const song_title = document.querySelector('#song_name');
const progressBar = document.querySelector('#progress_bar');
const progress = document.querySelector('#progress');

const current_time = document.querySelector('#current_time');
const duration_time= document.querySelector('#duration_time');

let song_index = 0;
// functions
function randomNumber() {
    return Math.floor(Math.random() * songs_DB.length)
}
function loadSong(song) {
    song_title.innerText = song.name;
    audio.src = song.path;
}

// playSong
function playSong() {
    body.classList.add('play');
    play_btn.querySelector('i.fa-solid').classList.remove('fa-play');
    play_btn.querySelector('i.fa-solid').classList.add('fa-pause');

    audio.play();
}

// pauseSong
function pauseSong() {
    body.classList.remove('play');
    play_btn.querySelector('i.fa-solid').classList.add('fa-play');
    play_btn.querySelector('i.fa-solid').classList.remove('fa-pause');

    audio.pause();
}

// prevSong
function prevSong() {
    song_index--;

    if (song_index < 0) {
        song_index = songs_DB.length - 1;
    }

    loadSong(songs_DB[song_index])
    playSong();
}
// nextSong
function nextSong() {
    song_index++;

    if (song_index > songs_DB.length - 1) {
        song_index = 0;
    }

    loadSong(songs_DB[song_index])
    playSong();
}

// updateprogress
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progresPerecentage = (currentTime / duration) * 100;

    progress.style.width = `${progresPerecentage}%`
}

// setProgress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0: Math.floor(currentTime/60);
	    min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	// currTime.innerHTML = min +':'+ sec;
	current_time.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	// durTime.innerHTML = min_d +':'+ sec_d;
	duration_time.innerHTML = min_d +':'+ sec_d;
};



// ** eventlisteners

random_song_btn.addEventListener('click', () => {
    song_index = randomNumber();
    body.classList.add('play');
    loadSong(songs_DB[song_index])
    playSong();
})

play_btn.addEventListener('click', () => {
    const isPlaying = body.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

// changesong
prev_btn.addEventListener('click', prevSong);
next_btn.addEventListener('click', nextSong);

// updateprogress
audio.addEventListener('timeupdate', updateProgress)

// stprogress
progressBar.addEventListener('click', setProgress)

// songends
audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate', DurTime);
