<!DOCTYPE html>
<html>
  <head>
    <title>Cloud - way of life</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="css/default.css" rel="stylesheet" type="text/css" />
	<script src="js/jquery.js" type="text/javascript"></script>
	<script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
	<script src="js/init.js" type="text/javascript"></script>
    <style>
      html, body {
        height: 100%;
        margin: 10;
        padding: 15;
      }
      #map {
        height: 30%;
      }
    </style>
  </head>
  <body>
	<div id="textfield">
	<label for="Search" id="search"> Search</label>   
			<select id="input2" name="input2" placeholder="search" >
				<option value="Dinner">Dinner</option>
				<option value="Trump">Trump</option>
				<option value="Life">Life</option>
				<option value="Sports">Sports</option>
				<option value="Car">Car</option>
				<option value="Food">Food</option>
				<option value="Education">Education</option>
				<option value="India">India</option>
				<option value="Football">Football</option>
				<option value="Instagram">Instagram</option>
			</select>
	<button id="refresh">Submit</button>	
	</div>
	<div id="map"></div>
	<div class="twitter">
		<div class="inside"></div>
	</div>
	<div class="posts"></div>
	<div class="get">
		<input type="hidden" value="marcinmobily" />
		<input type="hidden" value="codrops" />
		<input type="hidden" value="onextrapixel" />	
		<input type="hidden" value="smashingmag" />			
		<input type="hidden" value="umutm" />
		<input type="hidden" value="1stwebdesigner" />	
		<input type="hidden" value="chriscoyier" />	
		<input type="hidden" value="marcofolio" />
	</div>
    <div id="map"></div>
	<script>
	$("#refresh").click(function(){
		var text1 = $("#input2").val();
		o.init();
	});
	</script>
  </body>
  
</html>