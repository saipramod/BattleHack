(function(ts,$,undefined){
	$(document).ready(function(){
		$("#registrationsuccess").fadeOut(2);
		$("#paymentform").fadeOut(2);
		$("#payment").fadeOut(2);
		var formdata;
		var image;
		var storeimageobject;
		sendmail = function(email,name){
        	var message = "Hi, Thanks lot for choosing <our site name> to host the art work of "+name+". You have made a contribution to promote the art community of chicago. Go ahead and check the Gallery for you art as well as the other kids.Please contact us at a@b.com if you have any queries.";
        	var data = {email:email,message:message}; 
        	$.ajax({
		        	url: "sendmail",
		        	//processData : false,
		        	type : "post",
		        	data: data,
		    		})
		    		.success (function(response) { 
		    		/*if(response == "duplicate")
		    			$('#registrationsuccess').text("Duplicate Name, Please select another");
		    		else{
		    			sendmail($("#email").val(),$("#name").val());

		    			$('#registrationsuccess').text("Registered successfully, Go ahead and check your mail for the confirmation");
		    			}*/
		    			console.log("success" + response);
		    		})
		    		.error   (function(message)  { console.log("error: " + message); });
        }
		function resizeBase64Img(base64, width, height) {
		    var canvas = document.createElement("canvas");
		    var img = document.createElement('img');
		    img.src = base64;
		    canvas.width = width;
		    canvas.height = height;
		    var context = canvas.getContext("2d");
		    //var deferred = $.Deferred();
		    //window.open(base64);
		    console.log(base64);
		    img.onload = function() {
		        //context.scale(width, height);
		        context.drawImage(img,0,0,width,height); 
		        //deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));  
		        //window.open(canvas)
		        image = canvas.toDataURL();
		        console.log(canvas.toDataURL());
		    };
		    //return deferred.promise();    
		}

		function setImage(id, target){
		  input = document.getElementById(id);
		  console.log("printing the image source : " + input.src);
		  if (input.files && input.files[0]) {
		    var reader = new FileReader();
		    reader.onload = function (e) {
		    	//var imagesourcestring = e.target.result;
		    	//console.log(e.target.result);
		    	//console.log(imagesourcestring.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
		    	var img = document.createElement('img');
      			img.src = e.target.result;
      			console.log("image height:" + img.naturalHeight);
      			console.log("image width:" + img.naturalWidth);
      			resizeBase64Img(e.target.result, 200,100);
      			
      			img.className = "img-responsive";
				document.getElementById("imagepreview").appendChild(img);

		    	//$('#imagepreview').attr("src", imagesourcestring);
		      //target.src = 'url(' + e.target.result + ')';
		    };
		    console.log("reading the image file" + input.files[0]);
		    console.log(input.files[0]);
		    storeimageobject = input.files[0]
		    reader.readAsDataURL(input.files[0]);
		  }
		  $('#imagepreview').fadeIn(1000);
		}

		$('#photoCover').change(function() {
			$('#imagepreview').children('img').remove();
			setImage("photoCover","imagepreview");
			console.log("downsizing function invoked");

		});
		$("#imagepreview").fadeOut(2);

		
		$("#fillingform").submit(function(e) {
			e.preventDefault();
			if ($("#name").val() == "" || $("#name").val() == " ")
		        $('#registrationsuccess').text("Fields cannot be left empty");        
		    else if($("#email").val() == "" || $("#email").val() == " ")
		    	$('#registrationsuccess').text("Fields cannot be left empty");
		    else if($("#school").val() == "" || $("#school").val() == " ")
		    	$('#registrationsuccess').text("Fields cannot be left empty");        
		    else if($("#grade").val() == "" || $("#grade").val() == " ")
		    	$('#registrationsuccess').text("Fields cannot be left empty");        
		    else if(!image)        
		    	$('#registrationsuccess').text("Fields cannot be left empty");
		    else{
		    	formdata = {name:$("#name").val(),email:$("#email").val(),school:$("#school").val(),grade:$("#grade").val(),image:image};
		    	//formdata = {name:$("#name").val(),email:$("#email").val(),school:$("#school").val(),grade:$("#grade").val()};
		    	$('#registrationsuccess').text("Successfully registered, Payment Pending");
		    	$('#registrationsuccess').fadeIn(500);
		    	$("#paymentform").fadeIn(500);
		    	$("#fillingform").fadeOut(500);
		    	
		    }

		    $('#registrationsuccess').fadeIn(500);
		});

		$("#paymentform").submit(function(e) {
			e.preventDefault();
			var $this = $(this);
			if ($("#number").val() == "")
		        $('#payment').text("Fields cannot be left empty");
		    else if ($("#cvv").val() == "")
		        $('#payment').text("Fields cannot be left empty");
		    else if ($("#yyyy").val() == "")
		        $('#payment').text("Fields cannot be left empty");
		    else if ($("#mm").val() == "")
		        $('#payment').text("Fields cannot be left empty");
		    else{
		    	
	        	$.ajax({
			    	url: "create_transaction",
			    	type : "post",
			    	data: $this.serialize(),
				})
				.success (function(response) { 
			    	if(response){
			    		$('#payment').text("Payment successfully made, Payment ID :" + response);
					    	$.ajax({
				        		url: "addToDB",
				        		//processData : false,
				        		type : "post",
				        		data: formdata,
				    			})
				    		.success (function(response) { 
					    		if(response == "duplicate")
					    			$('#payment').text("Duplicate Name, Please select another");
					    		else{
					///	    		console.log("email is"+email);
					    			sendmail(formdata['email'],formdata['name']);
					    			$('#payment').text("Payment and Registration completed successfully, Go ahead and check your mail for the confirmation");
					    			setTimeout(function(){console.log('');}, 3000);
					    			$("#fillingform").fadeIn(500);
					    			$("#paymentform").fadeOut(500);
					    			$('#fillingform').trigger("reset");
		    						$('#paymentform').trigger("reset");
		    						$('#registrationsuccess').text("Payment and Registration completed successfully, Go ahead and check your mail for the confirmation");
		    						$("#name").val('');
		    						$("#email").val('');
		    						$("#school").val('');
		    						$("#grade").val('');
		    						$("#imagepreview").fadeOut(2);
		    						$("#photoCover").val('');
					    		}
				    		})
		    				.error   (function(message)  { console.log("error: " + message); });
					}
			    	else{
			    		$('#payment').text("Payment Failed Please try again");
			    	}
				})
				.error   (function(message)  { console.log("error: " + message); });
		    }

		});
	});



})(window.ts = window.ts || {} , jQuery)