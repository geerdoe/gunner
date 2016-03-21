$(document).ready(function() { 

	/*************** tooltips  ****************/
	$(".list-services a.tooltips").easyTooltip();
	
}); 
function showModal(videoId, title) {
	document.getElementById('overlay').style.display='block';
	document.getElementById('fade').style.display='block';
	setVideo(videoId, title);
	$(document).keyup(function(e) {
	  	if (e.keyCode == 27) { 
			hideModal();
		}   
	});
}
function setVideo(videoId, title) {

	var youtubeIframe = $(document.getElementById('ytplayer'));
	var videoIdOnly = videoId.substr(videoId.indexOf("video:")+6);
	youtubeIframe.attr('src', 'https://www.youtube.com/embed/'+videoId);
	var overlayDOMObj = document.getElementById('overlay');
	var divWidth = overlayDOMObj.clientWidth;
	var finalWidth = divWidth -10;
	youtubeIframe.attr('width',finalWidth);
	youtubeIframe.attr('height', 9*finalWidth/16);
	var videoTitleObj = $(document.getElementById('videoTitle'));
	videoTitleObj.attr('css','-5px');
	videoTitleObj.text(title);
	var screenHeight = $(window).height();
	var overlayHeight = overlayDOMObj.clientHeight;
	var topPosition = (screenHeight-overlayHeight)/2;
	var overlayObj = $(overlayDOMObj);
	overlayObj.css('top', topPosition);
	getVideo(videoId);
}

function hideModal() {
	document.getElementById('overlay').style.display='none';
	document.getElementById('fade').style.display='none';
}
function getVideo(videoId) {
	$.getJSON('https://gdata.youtube.com/feeds/api/videos/'+videoId+'?v=2&alt=json', function(data) {
		onVideoResponse(data);
    });
}

function onVideoResponse(data, action) {
	var mediaDescription = data.entry.media$group.media$description.$t;
	var videoDescriptionObj = $(document.getElementById('videoDescription'));
	videoDescriptionObj.text(mediaDescription);
}
function clearVideos() {
	var youtubeIframe = $(document.getElementById('ytplayer'));
	youtubeIframe.attr('src','');
	var videoTitleObj = $(document.getElementById('videoTitle'));
	videoTitleObj.text('');
	var videoDescriptionObj = $(document.getElementById('videoDescription'));
	videoDescriptionObj.text('');
}