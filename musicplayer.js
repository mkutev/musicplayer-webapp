const fileSelectElement = document.getElementById("audio-select");
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

const playBtn = document.getElementById('btn-play');

var audioFileSources = [];
var audioFileElements = []; 
var isMusicPlaying = false; 
var songIndex = 0;

fileSelectElement.addEventListener("change", handleFiles, false);



function handleFiles() {
	const fileList = this.files;
	for (let i=0; i < fileList.length; i++) {
		const file = fileList[i];

		var fileElement = document.createElement('li');
		var fileSrc = URL.createObjectURL(file) 
		fileElement.appendChild(document.createTextNode(file.name));
		fileElement.className = 'song';
		fileElement.setAttribute('data-src', fileSrc );
		fileElement.setAttribute('index', i);
		fileElement.addEventListener('click', playSong, false);

		var load = new Audio(fileSrc);
		load.load();
		audioFileSources.push(load);
		
		document. getElementById('song-list').appendChild(fileElement);
	}

	console.log(audioFileSources);
	fileSelectElement.style.opacity = 0;

}

function playSong() {
	if(isMusicPlaying) {
		if (this.classList.contains('playing')) {
			audioPlayer.pause();
			document.querySelector('.playing').classList.remove('playing');
			isMusicPlaying = false;
			return;
		} else {
			document.querySelector('.playing').classList.remove('playing');
		}
	}
	 
	var songUrl = this.getAttribute('data-src');
	this.classList.add('playing');
	audioPlayer.src = songUrl;

	audioPlayer.load();
	audioPlayer.play();

	isMusicPlaying = true; 

	console.log(audioPlayer.currentSrc);
	
}

function playPause() {
	if(!isMusicPlaying) {
		audioFileSources[songIndex].play();
		isMusicPlaying = true;
		playBtn.innerHTML= 'pause';
	} else {
		audioFileSources[songIndex].pause();
		isMusicPlaying = false;
		playBtn.innerHTML = 'play';
	}
}

function nextSong() {
	function increment() {
		if (songIndex < audioFileSources.length -1) {
			songIndex ++;
		} else {
			songIndex = 0;
		}
	}

	if (isMusicPlaying) {
		audioFileSources[songIndex].pause();
		increment();
		audioFileSources[songIndex].play();
	} else {
		increment();
	}
}

function prevSong() {
	function decrement() {
		if (songIndex > 0) {
			songIndex--;
		} else {
			songIndex = audioFileSources.length;
		}
	}

	if (isMusicPlaying) {
		audioFileSources[songIndex].pause();
		decrement();
		audioFileSources[songIndex].play();	
	}
}

function showCurrentSong() {
	
}