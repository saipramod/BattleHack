(function(ts,$,undefined){

	$(document).ready(function() {
		console.log("fuck this shit");
		var len;
		workOnButtons = function(){
			console.log("closing the messages");
			$(".messages").fadeOut(2);

			$(".buttonclicks").click(function(){
				console.log("clicked" + this.id);
				//$("#msg"+this.id).fadeIn(30);
				 $( "#msg"+this.id).fadeToggle( "slow", "linear" );


			});
		}
		showToScreen = function(data){
			for(var i = 0; i < data.length; i++) {
				len = data.length;
				var buttonid = i;
				var msgid = "msg"+i;
 			    var obj = data[i];
 			    
 			    var opportunities = document.getElementById('gallerylist');
 			    //var row = document.createElement('div');
 			    //row.className = 'row';

				var colmd3 = document.createElement('div');
				colmd3.className = 'col-md-3';

				var thumbnail = document.createElement('div');
 			    thumbnail.className = 'thumbnail';

				var img  = document.createElement('img');
				
				var caption = document.createElement('div');
				caption.className = 'caption';
				
				var heading = document.createElement('h3');
				var name = document.createTextNode(obj['name']);
				//heading.appendChild(name);
				
				var description = document.createElement('p');
				//var message = document.createTextNode(obj['message']);
				var startdate = document.createTextNode("School : " + obj['school']);
				var enddate = document.createTextNode("Grade : " + obj['grade']);
				var status = document.createTextNode("Name is : " + obj['name']);
				var sd = document.createElement('h4');
				var ed = document.createElement('h4');
				var st = document.createElement('h4');
				//var msg = document.createElement('div');
				//msg.appendChild(message);
				//console.log("assignning id" + msgid);
				//msg.id =  msgid;
				//console.log("retrieveing assigned id" + msg.id);
				//msg.className = "messages";
				st.appendChild(status);
				sd.appendChild(startdate);
				ed.appendChild(enddate);
				
				//description.appendChild(msg);
				description.appendChild(sd);
				description.appendChild(ed);
				description.appendChild(st);

				caption.appendChild(heading);
				//caption.appendChild(description);
				thumbnail.appendChild(caption);
				console.log(caption);
				if (obj['image']){
					console.log("priting the object" + obj['image']);
					img.src = obj['image'];
					img.style.height = '200px';
					img.style.width = '150px';
				}
				hr = document.createElement('hr');
				center = document.createElement('center');
				thumbnail.appendChild(img);
				thumbnail.appendChild(hr);
				
				var aTag = document.createElement('a');
				aTag.setAttribute('href',"#");
				aTag.innerHTML = "Learn More";
				aTag.className = aTag.className + 'btn';
				aTag.className = aTag.className + ' btn-primary buttonclicks';
				aTag.id =  buttonid;
				//<a href="#" class="btn btn-success">Learn more</a>
				holder = document.createElement('div');
				holder.className = 'well wellcss';

				//holder.appendChild(aTag);
				holder.appendChild(description);
				//thumbnail.appendChild(aTag);
				//thumbnail.appendChild(description);
				thumbnail.appendChild(holder);
				

				
				
				colmd3.appendChild(thumbnail);
				//row.appendChild(colmd3);
				opportunities.appendChild(colmd3);
 			};
 			workOnButtons();
		};

		callDB = function(){
			$.ajax({
		        url: "retrieveAllFromDB",
		        //processData : false,
		        type : "get",
		        //data: "THE DATA",
		    })
		    .success (function(response) { 
		    	console.log("success", response); 
		    	showToScreen(response);
		    })
		    .error   (function(message)  { console.log("error: " + message)   ; })
		    ;
		}
		callDB();
	});
	//setInterval(function () {
        
    //},30000);

})(window.ts = window.ts || {} , jQuery)