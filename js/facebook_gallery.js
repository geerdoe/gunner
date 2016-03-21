var gallery;
var width;
var count=0;
var colCount = 0;
var tr_gallery;
var accessToken = 'CAACEdEose0cBAHVozbnW90bdxxVrAmxXUWsdLGzbPZBxUB080R0cQNtA3ZARZAI8N0HrrnA59LuLlE6qKB6sfZBIgXO9jOQJQkenRf1NZCplg6n82CPuoKC9DpfWGQTnrDTltEjalIYikUkZBAeFvR6r18PQpTNa0uiFju0w5gi7krdWhWYm5EyDr23uoZBhmV0kZCI4Ruu1NG0CUwLUhMAGR2EfD9uAlMMZD';

function getCovers(){
	$.getJSON('https://graph.facebook.com/v2.5/158186950904154/albums?access_token='+accessToken, function(data) {
		onFBResponse(data);
    });
}
	
function onFBResponse(data) {
	for (var i=0; i<data.data.length; i++){
		var galleryId = data.data[i].id;
		getCoverUrl(data.data[i].cover_photo, galleryId, data.data[i].name);
	}
}

function getCoverUrl(id, galleryId, name){
	$.getJSON('http://graph.facebook.com/'+id, function(data){
		//alert ('source: '+data['images'][5].source+
		//		' width: '+data['images'][5].width+
		//		' height: '+data['images'][5].height);
		var imgUrl = data['images'][5].source;
		var imgWidth = data['images'][5].width;
		var imgHeight = data['images'][5].height;
		completeTags(imgUrl, imgWidth, imgHeight, galleryId, name);
	});
}

function completeTags(url, width, height, galleryId, name) {
	container = $('#galeria_thumbs_container');
	table = $('#table_container');
	var a_gallery = $('<a class="img_link">');
	a_gallery.attr('onclick', 'showGalleryModal('+galleryId+')');
	a_gallery.attr('target','_blank');
	var imgCover = $('<img>');
	imgCover.attr('src', url);
	imgCover.css('width',width+'px');
	imgCover.css('height',height+'px');
	a_gallery.append(imgCover);
	var title = $('<h2 class="album_title">'+name+'</h2>');
	if (colCount % 3 == 0) {
		tr_gallery = $('<tr></tr>');
		tr_gallery.css('width', '950px');
		tr_gallery.css('height','350px');
		table.append(tr_gallery);
	}
	if (name != 'Timeline Photos'){
		var td_gallery = $('<td></td>');
		td_gallery.css('width', '300px');
		td_gallery.css('height', '300px');
		td_gallery.append(a_gallery);
		td_gallery.append(title);
		tr_gallery.append(td_gallery);
		colCount++;
		
		
		container.append(table);
	}
}

function showGalleryModal(id){
	gallery=[];
	width=[];
	count=0;
	$('#images_gallery').css('display', 'block');
	$.getJSON('http://graph.facebook.com/'+id+'/photos', function(data){
		for (var i=0; i<data.data.length; i++){
			gallery[i] = data.data[i].source;
			width[i] = data.data[i].source;
			var fullImg= $('#img');
			fullImg.attr('src', data.data[0].source);
			fullImg.css('width', data.data[0].width+'px');
			var galleryContainer = $('#gallery_container');
			galleryContainer.css('margin-left','-'+(data.data[0].width/2+58)+'px');
			galleryContainer.width((data.data[0].width+174)+'px');
		}
	});
}

function leftScroll(){
	count=count-1;
	if (count>=0){
		var prev=$('#siguiente_cont');
		prev.css('display','inline-block');
		var fullImg= $('#img');
		fullImg.attr('src', gallery[count]);
		fullImg.css('width', width[count]+'px');
		var galleryContainer = $('#gallery_container');
		galleryContainer.css('margin-left','-'+(width[count]/2+58)+'px');
		galleryContainer.width((width[count]+174)+'px');
	} 
}

function rightScroll(){
	count=count+1;
	if (count<gallery.length){
		var post=$('#anterior_cont');
		post.css('display', 'inline-block');
		var fullImg= $('#img');
		fullImg.attr('src', gallery[count]);
		fullImg.css('margin-left','-'+ width[count]/2+'px');
		var galleryContainer = $('#gallery_container');
		galleryContainer.css('margin-left','-'+(width[count]/2+58)+'px');
		galleryContainer.width((width[count]+174)+'px');
	}
}

function closeGalleryModal() {
	$('#images_gallery').css('display', 'none');
	var fullImg= $('#img');
	fullImg.attr('src', '');
}