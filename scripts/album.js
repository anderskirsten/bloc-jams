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
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {

            // store the number of the selected song
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

            // change the content from the play button to the song number as user has chosen a new song
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

        if (currentlyPlayingSongNumber !== songNumber) {

            // set the songItem's content from play to pause
            $(this).html(pauseButtonTemplate);

            // set currentlyPlayingSong to new song's number & currentSongFromAlbum to new value
            setSong(songNumber);

            // change player bar accordingly - tested & functioning correctly
            updatePlayerBarSong();

        } else if (currentlyPlayingSongNumber === songNumber) {
            // change from pause back to play button
            $(this).html(playButtonTemplate);

            // change player bar pause icon to play
            $('.main-controls .play-pause').html(playerBarPlayButton);

            // set currentlyPlayingSong to null
            currentlyPlayingSongNumber = null;

            // set currentSongFromAlbum back to null since nothing is playing
            currentSongFromAlbum = null;
        }
    };

    var onHover = function(event) {

        // find & store song item number of hover target
        var songNumberCell = $(this).find('.song-item-number');

        // get & store song number of songNumberCell
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));


        // if the clicked element is not the currently playing song
        if(songNumber !== currentlyPlayingSongNumber) {

            // Change the content from the number to the play button
            songNumberCell.html(playButtonTemplate);
         }
     };

    var offHover = function(event) {

        // find & store song item number of hover target being left
        var songNumberCell = $(this).find('.song-item-number');

        // get & store song number of that songNumberCell
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        // if the target being left is not the currently playing song
        if(songNumber !== currentlyPlayingSongNumber) {

            // !!! Change the content to the current song number
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

// updates player bar text to show current song title & for mobile devices - song title + artist
var updatePlayerBarSong = function() {

    // change currently playing song name to currentSongFromAlbum's title
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);

    // change the content of the '.artist-name' to currentAlbum.artist
    $('.currently-playing .artist-name').text(currentAlbum.artist);

    // change content of the '.artist-song-mobile' to song title & artist
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);

    // change play icon to pause on player bar
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var setCurrentAlbum = function (album) {

    // set the function argument to the current album
    currentAlbum = album;

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

// returns the index of a song found in the album's song array
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var whatSong = function() {
    var target = $(event.target).attr('class')
    console.log(target);

    if (target === 'ion-skip-forward') {
        // find & store the last song played
        var getLastSongNumber = function(index) {
            return index == 0 ? currentAlbum.songs.length : index;
        };

        // use trackIndex() to get the current song's index & then increment the value of the index
        var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        currentSongIndex++;

        // account for the next song being the first song, as when you're on the final song, you should wrap around to the first song
        if(currentSongIndex >= currentAlbum.songs.length) { currentSongIndex = 0; }

        // set the new current song to currentSongFromAlbum
        setSong(currentSongIndex + 1);

        // update the player bar to show the new song
        updatePlayerBarSong();

        // update the html of the previous song's '.song-item-number' element with a number
        var lastSongNumber = getLastSongNumber(currentSongIndex);

        var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);

        var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
        $lastSongNumberCell.html(lastSongNumber);

        // update the html of the new song's '.song-item-number' element with a pause button
        $nextSongNumberCell.html(pauseButtonTemplate);

    } else {
        // find & store the last song played
        var getLastSongNumber = function(index) {
            return index ==  (currentAlbum.songs.length - 1) ? 1 : index + 2 ;
        };

        // use trackIndex() to get the current song's index & then decrement the value of the index
        var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        currentSongIndex--;

        //account for the previous song being the last song, as when you're on the first song, you should wrap around to the last song
        if(currentSongIndex < 0) {currentSongIndex = currentAlbum.songs.length - 1;}

        // set the new current song to currentSongFromAlbum
        setSong(currentSongIndex + 1);

        // update the player bar to show the new song
        updatePlayerBarSong();

        // it's already the last step in the updatePlayerBarSong(), why include here? works fine without it...
        // $('.main-controls .play-pause').html(playerBarPauseButton);

        // update the html of the following song's '.song-item-number' element with a number
        var lastSongNumber = getLastSongNumber(currentSongIndex);

        var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);

        var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
        $lastSongNumberCell.html(lastSongNumber);

        // update the html of the new song's '.song-item-number' element with a pause button
        $previousSongNumberCell.html(pauseButtonTemplate);
    }
};

/* var nextSong = function() {

    // find & store the last song played
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    // use trackIndex() to get the current song's index & then increment the value of the index
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    // account for the next song being the first song, as when you're on the final song, you should wrap around to the first song
    if(currentSongIndex >= currentAlbum.songs.length) { currentSongIndex = 0; }

    // set the new current song to currentSongFromAlbum
    setSong(currentSongIndex + 1);

    // update the player bar to show the new song
    updatePlayerBarSong();

    // update the html of the previous song's '.song-item-number' element with a number
    var lastSongNumber = getLastSongNumber(currentSongIndex);

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);

    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    $lastSongNumberCell.html(lastSongNumber);

    // update the html of the new song's '.song-item-number' element with a pause button
    $nextSongNumberCell.html(pauseButtonTemplate);

};

var previousSong = function() {

    // find & store the last song played
    var getLastSongNumber = function(index) {
        return index ==  (currentAlbum.songs.length - 1) ? 1 : index + 2 ;
    };

    // use trackIndex() to get the current song's index & then decrement the value of the index
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    //account for the previous song being the last song, as when you're on the first song, you should wrap around to the last song
    if(currentSongIndex < 0) {currentSongIndex = currentAlbum.songs.length - 1;}

    // set the new current song to currentSongFromAlbum
    setSong(currentSongIndex + 1);

    // update the player bar to show the new song
    updatePlayerBarSong();

    // ASK KEVIN ABOUT THIS - it's already the last step in the updatePlayerBarSong(), why include here? works fine without it...
    // $('.main-controls .play-pause').html(playerBarPauseButton);

    // update the html of the following song's '.song-item-number' element with a number
    var lastSongNumber = getLastSongNumber(currentSongIndex);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);

    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    $lastSongNumberCell.html(lastSongNumber);

    // update the html of the new song's '.song-item-number' element with a pause button
    $previousSongNumberCell.html(pauseButtonTemplate);
}; */

var setSong = function(songNumber) {
    // assign value to currentlyPlayingSongNumber
    currentlyPlayingSongNumber = parseInt(songNumber);

    // assign value to currentSongFromAlbum
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';

var playerBarPauseButton = '<span class="ion-pause"></span>';

// Placeholder for current album
var currentAlbum = null;

// Placeholder for playing song
var currentlyPlayingSongNumber = null;

// Placeholder for currently selected song on the currently selected album
var currentSongFromAlbum = null;

// Variables to hold jQuery selectors for next & previous buttons
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(whatSong);
    $nextButton.click(whatSong);
});
