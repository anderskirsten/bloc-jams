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

    var $row = $(template);

    var clickHandler = function() {

        // find & store the song number of the clicked element
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {

            // store the number of the selected song
            var currentlyPlayingCell = $('.song-item-number[data-song-number = "' + currentlyPlayingSong + '"]');

            // change the content from the play button to the song number as user has chosen a new song
            currentlyPlayingCell.html(currentlyPlayingSong);
        }

        if (currentlyPlayingSong !== songNumber) {

            // set the songItem's content from play to pause
            $(this).html(pauseButtonTemplate);

            // set currentlyPlayingSong to new song's number
            currentlyPlayingSong = songNumber;

        } else if (currentlyPlayingSong === songNumber) {
            // change from pause back to play button
            $(this).html(playButtonTemplate);

            // set currentlyPlayingSong to null
            currentlyPlayingSong = null;
        }
    };

    var onHover = function(event) {

        // find & store song item number of hover target
        var songNumberCell = $(this).find('.song-item-number');

        // get & store song number of songNumberCell
        var songNumber = songNumberCell.attr('data-song-number');


        // if the clicked element is not the currently playing song
        if(songNumber !== currentlyPlayingSong) {

            // Change the content from the number to the play button
            songNumberCell.html(playButtonTemplate);
         }
     };

    var offHover = function(event) {

        // find & store song item number of hover target being left
        var songNumberCell = $(this).find('.song-item-number');

        // get & store song number of that songNumberCell
        var songNumber = songNumberCell.attr('data-song-number');


        // if the target being left is not the currently playing song
        if(songNumber !== currentlyPlayingSong) {

            // Change the content to the current song number
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
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

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Placeholder for playing song
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});
