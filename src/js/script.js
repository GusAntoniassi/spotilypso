function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function toggleLoading(enable) {
    let loading = document.getElementsByClassName('loader')[0];
    if (enable) {
        loading.classList.add('loading');
    } else {
        loading.classList.remove('loading');
    }
}

function play(songIndex) {
    toggleLoading(true);

    let song = songs[songIndex];

    let audio = document.getElementById('audio');
    let source = document.getElementById('audio-source');
    source.src = song.file;

    audio.load();
    let promise = audio.play();

    if (promise !== undefined) {
        promise.catch(error => {
            // Autoplay was prevented.
            return;
        });
    }

    let listener = audio.addEventListener('canplaythrough', () => {
        console.log('done loading');
        toggleLoading(false);

        let songItem = document.querySelector('.song-item[data-index="' + (songIndex + 1) + '"]');
        let previousPlaying = document.getElementsByClassName('now-playing')[0];
        if (previousPlaying) {
            previousPlaying.classList.remove('now-playing');
        }
        songItem.classList.add('now-playing');
        let btnPlay = document.getElementById('btn-start-stop');
    
        btnPlay.classList.add('playing');
    
        audio.removeEventListener('canplaythrough', listener);
    });
}

function playPause() {
    let btnPlay = document.getElementById('btn-start-stop');
    let audio = document.getElementById('audio');

    if (audio.paused) {
        audio.play();
        btnPlay.classList.add('playing');
    } else {
        audio.pause()
        btnPlay.classList.remove('playing');
    }
}

function getCurrentSongIndex() {
    let currentSong = document.getElementsByClassName('now-playing')[0];
    let songIndex = currentSong.getAttribute('data-index');
    songIndex = parseInt(songIndex, 10) - 1;

    return songIndex;
}

function nextSong() {
    let currentSongIndex = getCurrentSongIndex();

    if (!songs[currentSongIndex+1]) {
        return;
    }

    play(currentSongIndex+1);
}

function previousSong() {
    let currentSongIndex = getCurrentSongIndex();

    if (!songs[currentSongIndex-1]) {
        return;
    }

    play(currentSongIndex-1);
}

function clickPlaySong(e) {
    let previousPlaying = document.getElementsByClassName('now-playing')[0];
    let songItem = e.target.closest('.song-item');

    if (previousPlaying == songItem) {
        return;
    }

    let songIndex = songItem.getAttribute('data-index');
    songIndex = parseInt(songIndex, 10) - 1;
    play(songIndex);
}

let songs = [
    {
        name: 'Beija-Flor',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AAAOCGY5nRGyTHAXX4RxZU2_a/01-beija-flor.mp3',
        duration: '03:10'
    },
    {
        name: 'Você me Enganou',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AAC2qrw2DYoIDwo60iiI8I8Ea/02-voce-me-enganou.mp3',
        duration: '03:07'
    },
    {
        name: 'Chamo por Você / Me Telefona',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AACDoFDfFQoNGRA9VDGdO-x2a/03-chamo-por-voce-me-telefona.mp3',
        duration: '05:07'
    },
    {
        name: 'Príncipe Encantado / Temporal',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AADmHBe0Q8d84xlmrTv4o68Wa/04-principe-encantado-temporal.mp3',
        duration: '05:11'
    },
    {
        name: 'Brincou Comigo',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AACPMZzQrs8KQukrxIGip85Fa/05-brincou-comigo.mp3',
        duration: '02:47'
    },
    {
        name: 'Paquera',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AABGSE_us8J43Fje33VYQVRpa/06-paquera.mp3',
        duration: '03:43'
    },
    {
        name: 'A Lua me Traiu',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AACED8csGkNiPi5tlaIsPz8Sa/07-a-lua-me-traiu.mp3',
        duration: '03:58'
    },
    {
        name: 'Imagino',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AADs3JR8fRj4C-gvoTvxV7uba/08-imagino.mp3',
        duration: '03:51'
    },
    {
        name: 'Esqueça Meu Coração',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AADuPrTXKUHRxkjJOqLaTzAZa/09-esqueca-meu-coracao.mp3',
        duration: '03:23'
    },
    {
        name: 'Não Faz Sentido',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AABaVx4DM0GyCvUsugfTlfp1a/10-nao-faz-sentido.mp3',
        duration: '03:27'
    },
    {
        name: 'Maridos e Esposas',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AACLc5QKRP9QPsA5YaikuotLa/11-maridos-e-esposas.mp3',
        duration: '04:05'
    },
    {
        name: 'Cúmbia do Amor',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AADTUrYDaXACrrqL_rSM-1hoa/12-cumbia-do-amor.mp3',
        duration: '02:47'
    },
    {
        name: 'Lágrimas de Sangue',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AAC-cgXWlI4XVuewYT7QJgHDa/13-lagrimas-de-sangue.mp3',
        duration: '02:25'
    },
    {
        name: 'Dudu',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AADfmZqBMlag2qU2cbvUJCtsa/14-dudu.mp3',
        duration: '03:51'
    },
    {
        name: 'Pra Todo Mundo Ver',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AAAJcHJZl0eddeZl6z0whXDda/15-pra-todo-mundo-ver.mp3',
        duration: '03:32'
    },
    {
        name: 'Dançando Calypso',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AAA0gH2W4rQ1IdPfbl5psxV4a/16-dancando-calypso.mp3',
        duration: '03:07'
    },
    {
        name: 'Primeiro Amor',
        file: 'https://dl.dropboxusercontent.com/sh/qr3eqw85tquesjj/AADkL8oP-YBlmvC3Pum1Q4aja/17-primeiro-amor.mp3',
        duration: '03:37'
    },
];

let songTemplate = '<article class="song-item" data-file="{{file}}" data-index="{{index}}"><span class="song-index">{{index}}</span><span class="song-name">{{name}}</span><span class="song-duration">{{duration}}</span></article>';
let songList = document.getElementById('song-list');

for (let i = 0; i < songs.length; i++) {
    let song = songs[i];
    let html = songTemplate
        .replace(/{{index}}/g, i + 1)
        .replace('{{name}}', song.name)
        .replace('{{file}}', song.file)
        .replace('{{duration}}', song.duration)
        ;

    songList.insertAdjacentHTML('beforeend', html);
}

window.setTimeout(() => {
    play(0);
}, 1000);

// Adicionar event listeners
let songItens = document.getElementsByClassName('song-item');
for (let i = 0; i < songItens.length; i++) {
    songItens[i].addEventListener('click', clickPlaySong);
};

document.getElementById('btn-start-stop').addEventListener('click', playPause);
document.getElementById('btn-previous').addEventListener('click', previousSong);
document.getElementById('btn-next').addEventListener('click', nextSong);


let audio = document.getElementById('audio');
let bar = document.getElementById('input-progress-bar');
bar.addEventListener('change', (e) => {
    let time = audio.duration * (bar.value / 100);

    audio.currentTime = time;
    e.stopPropagation();
});
audio.addEventListener('timeupdate', function (e) {
    let value = (100 / audio.duration) * audio.currentTime;

    bar.value = value;

    let songTime = audio.currentTime / 60;
    let minutes = Math.floor(songTime);
    let seconds = Math.floor((songTime % 1) * 60)

    document.getElementById('time-est').textContent = minutes + ':' + pad(seconds, 2);
});
audio.addEventListener('ended', nextSong);

function mudarVolume() {
    var valor = volume.value;

    console.log(valor);

    audio.volume = valor / 100;
}

