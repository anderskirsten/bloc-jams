// Example Album

var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' },
    ]
};

// Another Example Album

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15' },
    ]
};

// Assignment #11 New Album

var albumWhat = {
    title: 'Off the Rails',
    artist: 'PJ Faust',
    label: 'Dante',
    year: '1689',
    albumArtUrl: 'assets/images/album_covers/05.png',
    songs: [
        { title: 'Brimstone Calling', duration: '15:09' },
        { title: 'Mother\'s Milk', duration: '7:15' },
        { title: 'Limbo', duration: '8:02' },
        { title: 'Three Days', duration: '3:14' },
        { title: '1,000 Years', duration: '22:47' },
    ]
};


var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '        <td class="song-item-number">' + songNumber + '</td>'
    + '        <td class="song-item-title">' + songName + '</td>'
    + '        <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    return template;
};

// switch these to global so event listener can access them
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {

    // #2
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3
    albumSongList.innerHTML = "";

    // #4
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

window.onload = function() {
    setCurrentAlbum(albumPicasso);

};

// Assignment #11 Listener Event

// create array of album choices + placeholder variable for index
var albumList = [albumPicasso, albumMarconi, albumWhat];
var i = 1;

// create click event
albumImage.addEventListener("click", function(event) {

    // change current album
    setCurrentAlbum(albumList[i]);
    i++;

    // start back at zero if you're on last index
    if(i == albumList.length) {
        i = 0;
    }
});

