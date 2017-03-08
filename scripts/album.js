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

var createSongRow = function (songNumber, songName, songLength) {
    var template =
      '<tr class="album-view-song-item">'
    + '        <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '        <td class="song-item-title">' + songName + '</td>'
    + '        <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    return $(template);
};

var setCurrentAlbum = function (album) {

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    // ensures song list is empty
    $albumSongList.empty();

    // loop through the album's available songs & create a row for each with song title & duration
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var findParentByClassName = function (element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

var getSongItem = function (element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName (element, 'song-item-number');
            break;

        case 'album-view-song-item':
            return element.querySelector ('.song-item-number');
            break;

        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName (element, 'album-view-song-item').querySelector ('.song-item-number');
            break;

        case 'song-item-number':
            return element;
            break;

        default:
            return;
    }
};

var clickHandler = function (targetElement) {

    // store the .song-item-number in a variable using the getSongItem function
    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {

        // set the songItem's content to the pause button
        songItem.innerHTML = pauseButtonTemplate;
        // set currentlyPlayingSong to new song's number
        currentlyPlayingSong = songItem.getAttribute('data-song-number');

    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {

        // on second click, revert back to play button
        songItem.innerHTML = playButtonTemplate;
        // set currentlyPlayingSong to null
        currentlyPlayingSong = null;

    // if the clicked song is not the active song
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {

        // Go over this with KEVIN
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');

        // Go over this with KEVIN
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');

        // set content of new song to pause button
        songItem.innerHTML = pauseButtonTemplate;

        // set currentlyPlayingSong to the new song
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};


// Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Placeholder for playing song
var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {

        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {

            // store song item number of clicked element
            var songItem = getSongItem(event.target);

            // if the clicked element is not the currently playing song
            if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {

                // Change the content from the number to the play button's HTML
                songItem.innerHTML = playButtonTemplate;
            }
        }
        // looks like the song-item-number is no longer triggering an event on mouseover, only other elements (song.item, song.title, song.duration) trigger the event
    });

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {

            //store the song item that we're leaving
            var songItem = getSongItem(event.target);

            // store the song number that we're leaving
            var songItemNumber = songItem.getAttribute('data-song-number');

            // KEVIN, what's the diff between the song-item-number & the data-song-number?

            // checks to make sure the item the mouse is leaving isn't the current song, and only changes content if it isn't
            if (songItemNumber !== currentlyPlayingSong) {

                songItem.innerHTML = songItemNumber;
            }

        });

        songRows[i].addEventListener('click', function (event) {
            clickHandler(event.target);
        });
    }
}
