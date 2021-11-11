const fileSelectElement = document.getElementById("audio-select");
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
var audioFiles; 
var musicPlaying = false; 

fileSelectElement.addEventListener("change", handleFiles, false);



function handleFiles() {
	const fileList = this.files;
	for (let i=0; i < fileList.length; i++) {
		const file = fileList[i];
		var fileElement = document.createElement('li');
		fileElement.appendChild(document.createTextNode(file.name));
		fileElement.className = 'song';
		fileElement.setAttribute('data-src', URL.createObjectURL(file));
		document. getElementById('song-list').appendChild(fileElement);
	}

	audioFiles = document.getElementsByClassName("song");
	for (var i = 0; i < audioFiles.length; i++) {
		audioFiles[i].addEventListener('click', playSong, false);
	}

}

var playSong = function() {
	if(musicPlaying) {
		document.querySelector('.playing').classList.remove('playing');
	}

	var songUrl = this.getAttribute('data-src');
	this.classList.add('playing');
	audioSource.src = songUrl;

	audioPlayer.load();
	audioPlayer.play();

	musicPlaying = true; 
}