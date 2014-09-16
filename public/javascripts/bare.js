$(document).ready(function(){
	var par = $('#about2');
	$(par).hide();
})

$(document).ready(function(){
	var par = $('#about3');
	$(par).hide();
})

$(document).ready(function(){
	var par = $('#about4');
	$(par).hide();
})

$(document).ready(function(){
	var par = $('#about5');
	$(par).hide();
})

$('#about1').click(function() {
	$('#about1').hide();
	$('#about2').fadeIn('fast')
});

$('#about2').click(function() {
	$('#about2').hide();
	$('#about3').fadeIn('fast')
});

$('#about3').click(function() {
	$('#about3').hide();
	$('#about4').show();
});

$('#about4').click(function() {
	$('#about4').hide();
	$('#about5').fadeIn('slow');
});



