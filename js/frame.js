//recieve message with artists and info

//ajax call to bolt servers sending all of the info



window.onmessage = function(e){
  //if ( e.origin !== "http://html5demos.com/" ) {
    //return;
  //}

  //search our api with e.data.artist and trackTitle
  //parse json response object and update frame
  //search our api for playlists and update frame
  //post request to our server with track and playlist
	console.log(e.data.artist+":"+e.data.trackTitle);
  console.log("should have recieved message");

  var apiKey = '1cf7a83ad1d07c57597963c41f1669a6';
  var apiSecret = 'f971773f8cb6112b475574dcb4553139';
  
  var fmUrl = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + encodeURIComponent(e.data.artist) + "&api_key=b25b959554ed76058ac220b7b2e0a026&format=json";
  //var fmUrl = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Watsky&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?";

  $.getJSON(fmUrl, function(json) {
    console.log(json);
    //$("#main").html('<img id="theArtist" src=' + json.artist.image[2]["#text"] + ' />');
    if(json.artist) {
      $('.circular').css('background-image', 'url(' + json.artist.image[2]["#text"] + ')');
      console.log(json.artist.image[1].size);
    } else {
        $('.circular').css('background-image', 'url(' + 'http://www.mccallumbagpipes.com/wp-content/uploads/2011/01/empty-profile.jpg' + ')');
    }
});

  $('.circular').html('<div class="gloss"></div>');
  $('#info #track').html(e.data.trackTitle);
  $('#info #artist').html(e.data.artist);
  $('#info #artist').after('<label id="playlist"><select><option selected> Select Playlist </option><option> Purity Ring </option><option> Beach House & Stuff </option></select></label>');
  $('#info #send').html('Add to Playlist');

};


//