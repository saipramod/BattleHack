(function(ts,$,undefined){
	$(document).ready(function() {
		$("form").submit(function(e) {
	        e.preventDefault();
	        var $this = $(this);
	        $.ajax({
			    url: "create_transaction",
			    type : "post",
			    data: $this.serialize(),
			})
			.success (function(response) { 
			    if(response)
			    	$('#payment').text("Payment successfully made, Payment ID :" + response);
			    else{
			    	$('#payment').text("Payment Failed Please try again");
			    }
			})
			.error   (function(message)  { console.log("error: " + message); });

	    });
	});

})(window.ts = window.ts || {} , jQuery)