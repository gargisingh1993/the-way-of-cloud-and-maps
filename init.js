
var map, geocoder, marker,
	ey, my, mouseDown = false, text1;
var o = {
		
				init: function(){
				this.map.init();
				this.twitter.show();
				this.twitter.click();
				//this.scroll.init();
				},
				twitter: {
					get: function(){
					var collection2 = new Array;
					$('.get').find('input').each(function(i){
						var t = $(this), 
						val = t.val();
						collection2[i] = val;				
					});
					return collection2;
					},
					show: function(){
				
						//var users = o.twitter.get(), arr = new Array;
						//var text1 = document.getElementById('input2').innerHTML;
				
						// add the url below to get the tweets information
						
						count = 0;
						$.getJSON('get_results.php?q=' + $("#input2").val() + "&start=0", function(data1) {
							//count = Math.ceil((data.hits.found)/10);
							count = Math.ceil(data1.hits.found/10);
							
							for(var start = 0; start < count*10; start = start + 10) {

								$.getJSON('get_results.php?q=' + $("#input2").val() + "&start=" + start, function(data) { 	
										var collection2 = new Array;
										for(var i = 0; i < data.hits.hit.length; i++) {
											
										//alert(data.hits.hit[i].fields.tweet_id + " " + data.hits.hit[i].fields.latitude + " " + data.hits.hit[i].fields.longitude);
								
											var screen_name = data.hits.hit[i].fields.screen_name;
											var collection = new Array();
											var x = data.hits.hit[i].fields.latitude; 
											var y = data.hits.hit[i].fields.longitude;
											collection[i] = new google.maps.LatLng(x,y);
											
											marker = new google.maps.Marker({
												map: map,
												title: screen_name,
												position: collection[i]
												});	
										
											collection2.push('<div class="item">');
											//collection2.push('<p class="img"><a href="#" class="open" rel="'+screen_name+'"><img src="'+img+'" alt="" /></a></p>');
											collection2.push('<div class="entry">');
											collection2.push('<a href="#" class="open title" rel="'+screen_name+'">'+data.hits.hit[i].fields.screen_name+'</a>');
											collection2.push('<p class="open title">'+data.hits.hit[i].fields.text+'</p>');
											collection2.push('<p class="count">Followers: '+data.hits.hit[i].fields.follower_count+''+'</p>');
											collection2.push('<p class="url"><a href="'+data.hits.hit[i].fields.tweet_url+'" target="_blank">'+data.hits.hit[i].fields.tweet_url+'</a></p><br/>');
											collection2.push('</div>');
											collection2.push('</div>');
											var html = collection2.join('');
											collection2 = [];
											$('.twitter').find('.inside').prepend(html);
											google.maps.event.addListener(marker, 'click', function(){}); 
										}		
								});
							
							}
						});
					},
					click: function(){
				
					}
				},
			map: {
				size: function(){
					var w = $(window).width(),
					h = $(window).height();
					return { width: w, height: h }
					},
				data: {
					zoom: 3,
					center: new google.maps.LatLng(52, 23),
					mapTypeId: google.maps.MapTypeId.ROADMAP
					},
				init: function(){
					var size = o.map.size();
					$('#map').css({ width: size.width, height: size.height });
					map = new google.maps.Map(document.getElementById('map'), o.map.data),
					geocoder = new google.maps.Geocoder();
					google.maps.event.addListener(map, 'dragstart', function(){
						$('.posts').hide();
						}); 
					}
			},
/*scroll: {
mouse: function(e){
var y = e.pageY; 
return y;
},
check: function(y){
var all = $('.twitter').height(),
inside = $('.twitter').find('.inside').height();
if (y < (all - inside)) {
y = all - inside;
} else if (y > 0) {
y = 0;
}
return y;
},
update: function(e){
var y = o.scroll.mouse(e),
movey = y-my,
top = ey+movey;
check = o.scroll.check(top);
$('.twitter').find('.inside').css({ top: check+'px' });
},
init: function(){
$('.twitter').find('.inside').bind({
mousedown: function(e){
e.preventDefault();
mouseDown = true;
var mouse = o.scroll.mouse(e);
my = mouse;
var element = $(this).position();
ey = element.top;
o.scroll.update(e);
},
mousemove: function(e){
if (mouseDown)
o.scroll.update(e);
return false;
},
mouseup: function(){
if (mouseDown)
mouseDown = false;
return false;
},
mouseleave: function(){
if (mouseDown)
mouseDown = false;
return false;
}
});
}
}*/
		}

	$(function(){ 
	text1 = "Dinner";
	o.init(); 
	});
