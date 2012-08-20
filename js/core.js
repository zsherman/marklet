function _marklet() {
	var $, css, panel, messenger, search, ctrl, _bolt, track, trackFactory;
	
	//css object
	css = {
		CSS_URL: "https://dl-web.dropbox.com/get/Public/css/style.css?w=54fdf16e",
		LINK: null,
		
		init: function() {
			if (css.CSS_URL) {
				css.LINK = $("<link>").attr({
					'rel': 'stylesheet',
					'href': css.CSS_URL
				}).appendTo("head");
				console.log("css_initialized");
			}
		},

		restore: function() {

		}
	};

	//panel object
	panel = {
		init: function() {
			var frame = '<iframe src="https://dl-web.dropbox.com/get/Public/panel.html?w=90e0fd25" id="main_frame" name="main_frame"></iframe>'
			//var panel_url = 'https://s3.amazonaws.com/bolt-test/panel.html';
			//var panel_url = 'https://dl-web.dropbox.com/get/Public/panel.html?w=90e0fd25';
			//var panel_css_url = 'https://dl-web.dropbox.com/get/Public/css/iframe_style.css?w=273a63c4';
			//var panel_stylesheet = '<link rel="stylesheet" type="text/css" href="' + panel_css_url + '" />';
			$('body').prepend(frame);
			//$('#main').contents().find("head").prepend(panel_stylesheet);
			//$.get(panel_url, function(data) {
  			//	$('#frame_wrapper').prepend(data);
  			//	alert('Load was performed.');
			//}, 'html');
			//$('#frame_wrapper').load('https://dl-web.dropbox.com/get/marklet/panel.html?w=a040806a');
			console.log('added frame');

		},
		other: function() {
			//some stuff here
		}
	};

	Track = function(artist, trackTitle, album) {
		this.artist = artist || "Artist";
		this.trackTitle = trackTitle || "Track";
		this.album = album || "Album";
	};

	trackFactory = {
		makeTrack: function() {
			var track = new Track();
			var url = document.URL;
			//switch statement starts
				if(url.indexOf("youtube.com") >= 0){
					console.log("YouTube Video");
					if($('#eow-title a').length) {
						console.log("Artist link available");
						track.artist = $("#eow-title a").text();
						track.trackTitle = $("#eow-title").text();
					} else if($("#eow-title")){
						console.log("No artist link, need to parse");
						track.artist = $("#eow-title").text();
						track.trackTitle = $("#eow-title").text();
					}
				} else if(url.indexOf("soundcloud.com") >= 0) {
					console.log("SoundCloud Track");
					//stuff here
				} else if(url.indexOf("last.fm") >= 0) {
					console.log("last.fm");
					//need regex for single album case /music/xx/album
					if(url.indexOf("last.fm/listen") >= 0 ) {
						track.artist = $('.artist a').text();
						track.trackTitle = $('.track a').text();
					} else if(url.indexOf("charts?rangetype") >= 0) {
						var tracks = $("tbody .subjectCell a");
						track.trackTitle = "";
						track.artist = $(".breadcrumb span a").text();
						tracks.each(function(index) {
							if (index <= 25) {
								track.trackTitle+=($(this).text());
							} else {
								return false;
							}
						});
					} else if(url.indexOf("last.fm/music") >= 0) {
						var tracks = $(".chart .subjectCell span");
						track.trackTitle = "";
						track.artist = $("h1:[itemprop='name']").text();
						tracks.each(function() {
							track.trackTitle+=($(this).text());
						});
					}
				} else if(url.indexOf("pandora.com") >= 0) {
					console.log("pandora");
					track.artist = $('.info div:eq(1) a').text();
					track.trackTitle = $('.info div:eq(2) a').text();
				} else if(url.indexOf("ex.fm") >= 0) {
					console.log("ex.fm");
					track.artist = $('#display_text #display_artist').text();
					track.trackTitle = $('#display_text #display_song').text();
				} else if(url.indexOf("rdio.com") >= 0) {
					console.log("Rdio");
					track.artist = $('.App_PlayerFooter .artist_title').text();
					track.trackTitle = $('.App_PlayerFooter .song_title').text();
				} else if(url.indexOf("8tracks.com") >= 0) {
					console.log("8tracks");
					track.artist = $('.now_playing .title_artist .a').text();
					track.trackTitle = $('.now_playing .title_artist .t').text();
				} else if(url.indexOf("grooveshark.com") >= 0) {
					console.log("Grooveshark");
					track.artist = $('#playerDetails_current_song .artist').text();
					track.trackTitle = $('#playerDetails_current_song .song').text();
					console.log($('#playerDetails_current_song .artist').text());
				}
			return track;
		}
	};

	//search object
	search = {
		init: function() {
			var track = trackFactory.makeTrack();
			console.dir(track);
			messenger.send(track);
			console.log("message sent");
		}
		//find current page's track
	};

	//messenger object
	messenger = {
		send: function(message) {
			setTimeout(function() {
				var win = document.getElementsByTagName('iframe')[0];
				win.contentWindow.postMessage(message, '*');
				},3000);
		}
		//send current track to iframe
	};

	ctrl = {
		init: function() {

			if (!$ && jQuery) {
				$ = jQuery;
			}
			css.init();
			panel.init();
			search.init();
			console.log("marklet initialized");
		}
	};

	_bolt = {
		setJQuery: function(jQ) {
			console.log("jquery set");
		},
		passer: function() {
			console.log("return object")
		},
		init: function() {
			ctrl.init();
			console.log("_bolt init initialized")
		}
	};

	return _bolt;


//video object

//ajax object

//other objects

//init/restore functions

//_bolt response object

} //end of _marklet

//initialize everything
(function () {
	var b, d;
	d = window.document.createElement("script");
	d.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
	d.onload = function () {
		b = _marklet();
		var message;
		b.setJQuery(jQuery); 
		b.init();
		console.log("should have jquery");
		
		//if(document.URL.indexOf("youtube.com") >= 0){
			//var artist = $("#eow-title a").text();
			//var track = $("#eow-title ").text();
			//message = artist + track;
		//}

		//setTimeout(function() {
			//var win = document.getElementsByTagName('iframe')[0];
			//win.contentWindow.postMessage(message, '*');
		//},3000);
}
 	window.document.getElementsByTagName("head")[0].appendChild(d);

})();


